// @dart = 2.7

// Copyright 2021 Workiva Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import 'dart:async';
import 'dart:html';
import 'dart:js_util';

import 'package:react/react.dart' as react;
import 'package:react_testing_library/src/util/console_log_utils.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import 'util/exception.dart';
import 'util/over_react_stubs.dart';
import 'util/prints_and_logs_recording.dart';

// Returns whether `assert`s are enabled in the current runtime.
//
// Unless the Dart SDK option to enable `assert`s in dart2js is configured,
// this can also be used to indicate whether the JS was compiled using `dartdevc`.
bool _assertsEnabled() {
  var assertsEnabled = false;
  assert(assertsEnabled = true);
  return assertsEnabled;
}

// Whether the current runtime supports `propTypes` matchers like `logsPropError`.
bool runtimeSupportsPropTypeWarnings() => _assertsEnabled();

void main() {
  group('console log recording utilities', () {
    group('startSpyingOnConsoleLogs', () {
      test('stops recording logs once the returned function is called', () {
        final logCalls = <String>[];
        final stopSpying = startSpyingOnConsoleLogs(onLog: logCalls.add);

        window.console.log('foo');
        window.console.log('bar');
        expect(logCalls, ['foo', 'bar']);

        stopSpying();

        logCalls.clear();
        window.console.log('baz');
        expect(logCalls, []);
      });
    });

    group('spyOnConsoleLogs', () {
      test('returns the value returned by the callback', () {
        expect(spyOnConsoleLogs(() => 'return value', onLog: (_) {}), 'return value');
      });

      test('stops recording logs once the callback completes', () {
        final logCalls = <String>[];
        spyOnConsoleLogs(() {
          window.console.log('foo');
          window.console.log('bar');
        }, onLog: logCalls.add);
        expect(logCalls, ['foo', 'bar']);

        logCalls.clear();
        window.console.log('baz');
        expect(logCalls, []);
      });

      test('does not swallow errors that occur in the callback', () {
        expect(() {
          spyOnConsoleLogs(() => throw ExceptionForTesting(), onLog: (_) {});
        }, throwsA(isA<ExceptionForTesting>()));
      });

      test('calls onLog in the same zone as the spyOnConsoleLogs call', () {
        final logCallZones = <Zone>[];
        final testZone = Zone.current.fork()
          ..run(() {
            spyOnConsoleLogs(() {
              window.console.log('foo');
            }, onLog: (_) {
              logCallZones.add(Zone.current);
            });
          });
        expect(logCallZones, [same(testZone)]);
      });

      test('stops recording logs if the callback throws', () {
        final logCalls = <String>[];
        expect(() {
          spyOnConsoleLogs(() {
            window.console.log('foo');
            throw ExceptionForTesting();
          }, onLog: logCalls.add);
        }, throwsA(isA<ExceptionForTesting>()));

        window.console.log('log after throw');

        expect(logCalls, ['foo']);
      });
    });

    group('printConsoleLogs', () {
      test('returns the value returned by the callback', () {
        expect(printConsoleLogs(() => 'return value'), 'return value');
      });

      test('prints logs', () {
        // This also tests functionally that the print call occurs in the right zone,
        // which need to happen for them to be forwarded in the terminal in a test environment.
        // If it wasn't in the right zone, we wouldn't be able to record it, and neither would
        // the test package.
        final printCalls = recordPrintCalls(() {
          printConsoleLogs(() {
            window.console.log('foo');
            window.console.log('bar');
          });
        });
        expect(printCalls, ['foo', 'bar']);
      });

      group('prints logs with formatter syntax', () {
        test('handles all formatter %[sdifoOj%] syntax', () {
          // This also tests functionally that the print call occurs in the right zone,
          // which need to happen for them to be forwarded in the terminal in a test environment.
          // If it wasn't in the right zone, we wouldn't be able to record it, and neither would
          // the test package.
          final object = jsify({'foo': true});
          final printCalls = recordPrintCalls(() {
            printConsoleLogs(() {
              consoleLog(['%s %d %i %f %o %O %j %%', 'Hello', 5, '-NaN', 3.14, object, object, object]);
            });
          });
          expect(printCalls, ['Hello 5 NaN 3.14 {"foo":true} {"foo":true} {"foo":true} %']);
        });
        test('with exact amount of args', () {
          // This also tests functionally that the print call occurs in the right zone,
          // which need to happen for them to be forwarded in the terminal in a test environment.
          // If it wasn't in the right zone, we wouldn't be able to record it, and neither would
          // the test package.
          final printCalls = recordPrintCalls(() {
            printConsoleLogs(() {
              consoleLog(['%s World Number %d!', 'Hello', 5]);
            });
          });
          expect(printCalls, ['Hello World Number 5!']);
        });

        test('with too many args', () {
          // This also tests functionally that the print call occurs in the right zone,
          // which need to happen for them to be forwarded in the terminal in a test environment.
          // If it wasn't in the right zone, we wouldn't be able to record it, and neither would
          // the test package.
          final printCalls = recordPrintCalls(() {
            printConsoleLogs(() {
              consoleLog([
                '%s World Number %d! %j',
                'Hello',
                5,
                jsify({'doWeComeInPeace': false}),
                'additional'
              ]);
            });
          });
          expect(printCalls, ['Hello World Number 5! {"doWeComeInPeace":false} additional']);
        });

        test('without enough args', () {
          // This also tests functionally that the print call occurs in the right zone,
          // which need to happen for them to be forwarded in the terminal in a test environment.
          // If it wasn't in the right zone, we wouldn't be able to record it, and neither would
          // the test package.
          final printCalls = recordPrintCalls(() {
            printConsoleLogs(() {
              consoleLog(['%s World Number %d! %j', 'Hello']);
            });
          });
          expect(printCalls, ['Hello World Number %d! %j']);
        });
      });

      test('prints even if the function throws partway through', () {
        final printCalls = recordPrintCalls(() {
          expect(() {
            printConsoleLogs(() {
              window.console.log('foo');
              throw ExceptionForTesting();
            });
          }, throwsA(isA<ExceptionForTesting>()));
        });
        expect(printCalls, ['foo']);
      });

      group('does not throw when printing logs in a non-print-spied zone:', () {
        // Failures for tehse tests might not show up as actual test failures, but rather uncaught
        // errors that look like:
        // "Bad state: Cannot fire new event. Controller is already firing an even"

        void sharedTest(Zone parentZone) {
          final onErrorCalls = <List<dynamic>>[];
          parentZone.fork(specification: ZoneSpecification(
            handleUncaughtError: (_, __, ___, e, st) {
              onErrorCalls.add([e, st]);
            },
          )).runGuarded(() {
            printConsoleLogs(() {
              window.console.log('foo');
              window.console.log('bar');
            });
          });
          expect(onErrorCalls, isEmpty, reason: 'no errors should have been thrown by zone');
        }

        test('a test zone', () {
          sharedTest(Zone.current);
        });

        test('a non-test zone', () {
          sharedTest(Zone.root);
        });
      });
    });

    group('captures all logs correctly', () {
      test('when mounting', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({})));
        final expectedLogs = [
          contains('Logging a standard log'),
          contains('A second warning'),
          contains('And a third'),
          contains('Just a lil warning'),
        ];

        if (runtimeSupportsPropTypeWarnings()) {
          expect(
            logs,
            unorderedEquals(
              [
                ...expectedLogs,
                contains('shouldNeverBeNull is necessary.'),
                contains('⚠️  Warning:'),
              ],
            ),
          );
        } else {
          expect(logs, unorderedEquals(expectedLogs));
        }
      });

      test('when re-rendering', () {
        final view = rtl.render(Sample({'shouldAlwaysBeFalse': true}));

        final logs = recordConsoleLogs(() => view.rerender(Sample({})));
        final expectedLogs = [
          contains('Logging a standard log'),
          contains('A second warning'),
          contains('And a third'),
        ];

        if (runtimeSupportsPropTypeWarnings()) {
          expect(logs, unorderedEquals([...expectedLogs, contains('shouldNeverBeNull is necessary.')]));
        } else {
          expect(logs, unorderedEquals(expectedLogs));
        }
      });

      test('with nested components', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample2({}))));
        expect(logs, hasLength(runtimeSupportsPropTypeWarnings() ? 12 : 8));
      });

      test('with nested components that are the same', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample({}))));
        expect(logs, hasLength(runtimeSupportsPropTypeWarnings() ? 10 : 8));
      });
    });

    if (runtimeSupportsPropTypeWarnings()) {
      group('captures errors correctly', () {
        test('when mounting', () {
          final logs = recordConsoleLogs(
            () => rtl.render(Sample({'shouldAlwaysBeFalse': true})),
            configuration: ConsoleConfig.error,
          );

          expect(
              logs,
              unorderedEquals([
                contains('shouldNeverBeNull is necessary.'),
                contains('shouldAlwaysBeFalse should never equal true.'),
              ]));
        });

        test('when re-rendering', () {
          // Will cause one error
          final view = rtl.render(Sample({'shouldAlwaysBeFalse': true}));

          // Should clear the error from mounting and not create any more
          final logs = recordConsoleLogs(
            () => view.rerender(Sample({'shouldNeverBeNull': true})),
            configuration: ConsoleConfig.error,
          );

          expect(logs, hasLength(0));
        });

        test('with nested components', () {
          final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample2({}))),
              configuration: ConsoleConfig.error);

          expect(
              logs,
              unorderedEquals([
                contains('shouldNeverBeNull is necessary.'),
                contains('shouldNeverBeNull is required.'),
              ]));
        });

        test('with nested components that are the same', () {
          final logs = recordConsoleLogs(
            () => rtl.render(Sample({}, Sample({}))),
            configuration: ConsoleConfig.error,
          );

          expect(
              logs,
              equals([
                contains('shouldNeverBeNull is necessary.'),
              ]),
              reason: 'React will only show a particular props error once');
        });
      });
    }

    group('captures logs correctly', () {
      test('when mounting', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({})), configuration: ConsoleConfig.log);

        if (runtimeSupportsPropTypeWarnings()) {
          expect(
            logs,
            unorderedEquals([
              contains('Logging a standard log'),
              contains('⚠️  Warning:'),
            ]),
            reason: 'rtl.render re-prints prop type warnings',
          );
        } else {
          expect(logs, equals([contains('Logging a standard log')]));
        }
      });

      test('when re-rendering', () {
        // Will cause one log
        final view = rtl.render(Sample({}));

        // Should clear the previous log and result in there being two
        final logs = recordConsoleLogs(
          () => view.rerender(Sample({'addExtraLogAndWarn': true})),
          configuration: ConsoleConfig.log,
        );

        expect(
            logs,
            unorderedEquals([
              contains('Logging a standard log'),
              contains('Extra Log'),
            ]));
      });

      test('with nested components', () {
        final logs = recordConsoleLogs(
          () => rtl.render(Sample({}, Sample2({}))),
          configuration: ConsoleConfig.log,
        );

        if (runtimeSupportsPropTypeWarnings()) {
          expect(
            logs,
            unorderedEquals([
              contains('Logging a standard log'),
              contains('Logging a standard log'),
              contains('⚠️  Warning:'),
              contains('⚠️  Warning:'),
            ]),
            reason: 'rtl.render re-prints prop type warnings',
          );
        } else {
          expect(
            logs,
            unorderedEquals([
              contains('Logging a standard log'),
              contains('Logging a standard log'),
            ]),
          );
        }
      });

      test('with nested components that are the same', () {
        final logs = recordConsoleLogs(
          () => rtl.render(Sample({}, Sample({}))),
          configuration: ConsoleConfig.log,
        );

        if (runtimeSupportsPropTypeWarnings()) {
          expect(
            logs,
            unorderedEquals([
              contains('Logging a standard log'),
              contains('Logging a standard log'),
              contains('⚠️  Warning:'),
            ]),
            reason: 'rtl.render re-prints warnings and only shows a particular props error once',
          );
        } else {
          expect(
            logs,
            unorderedEquals([
              contains('Logging a standard log'),
              contains('Logging a standard log'),
            ]),
          );
        }
      });
    });

    group('captures warnings correctly', () {
      test('when mounting', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({})), configuration: ConsoleConfig.warn);

        expect(
            logs,
            unorderedEquals([
              contains('A second warning'),
              contains('And a third'),
              contains('Just a lil warning'),
            ]));
      });

      test('when re-rendering', () {
        // Will three warnings
        final view = rtl.render(Sample({}));

        // Should clear the previous warnings and result in there being 3
        final logs = recordConsoleLogs(
          () => view.rerender(Sample({'addExtraLogAndWarn': true})),
          configuration: ConsoleConfig.warn,
        );

        expect(
            logs,
            unorderedEquals([
              contains('A second warning'),
              contains('And a third'),
              contains('Extra Warn'),
            ]));
      });

      test('with nested components', () {
        final logs = recordConsoleLogs(
          () => rtl.render(Sample({}, Sample2({}))),
          configuration: ConsoleConfig.warn,
        );

        expect(logs, hasLength(6));
      });

      test('with nested components that are the same', () {
        final logs = recordConsoleLogs(
          () => rtl.render(Sample({}, Sample({}))),
          configuration: ConsoleConfig.warn,
        );

        expect(logs, hasLength(6));
      });
    });

    test('recordConsoleLogs does not swallow errors that occur in the callback', () {
      expect(() {
        recordConsoleLogs(() => throw ExceptionForTesting());
      }, throwsA(isA<ExceptionForTesting>()));
    });

    if (runtimeSupportsPropTypeWarnings()) {
      test('handles errors as expected when mounting', () {
        // Don't use recordConsoleLogs since we can't get the returned logs if this throws
        final logs = <String>[];
        try {
          spyOnConsoleLogs(() => rtl.render(Sample({'shouldErrorInRender': true})),
              configuration: ConsoleConfig.error, onLog: logs.add);
        } catch (_) {}
        expect(logs, hasLength(2));
      });
    }
  });
}

class _SampleComponent extends react.Component2 {
  @override
  Map get defaultProps => {
        'shouldAlwaysBeFalse': false,
        'shouldErrorInRender': false,
        'shouldErrorInMount': false,
        'shouldErrorInUnmount': false,
        'addExtraLogAndWarn': false,
        'shouldLog': true
      };

  @override
  Map<String, react.PropValidator<void>> get propTypes => {
        'shouldNeverBeNull': (props, info) {
          if ((props as Map)['shouldNeverBeNull'] == null) {
            return ArgumentError('${info.propName} is necessary.');
          }

          if (props['shouldLog'] == false && props['shouldAlwaysBeFalse'] == false) {
            return ArgumentError('logging is required.');
          }

          if (props['shouldNeverBeNull'] == false) {
            return ArgumentError('${info.propName} should not be false.');
          }

          return null;
        },
        'shouldAlwaysBeFalse': (props, info) {
          if ((props as Map)['shouldAlwaysBeFalse'] as bool) {
            return ArgumentError('${info.propName} should never equal true.');
          }

          return null;
        },
      };

  @override
  void componentDidMount() {
    window.console.warn('Just a lil warning');
    if (props['shouldErrorInMount'] as bool) throw ExceptionForTesting();
    props['onComponentDidMount']?.call();
  }

  @override
  dynamic render() {
    window.console.warn('A second warning');
    if (props['shouldErrorInRender'] as bool) {
      throw ExceptionForTesting();
    } else {
      if (props['addExtraLogAndWarn'] as bool) {
        window.console.log('Extra Log');
        window.console.warn('Extra Warn');
      }

      if (props['shouldLog'] as bool) window.console.log('Logging a standard log');
      window.console.warn('And a third');
      return react.div({}, [
        react.button({'onClick': _handleOnClick, defaultTestIdKey: 'ort_sample_component_button', 'key': 'button'}),
        props['children']
      ]);
    }
  }

  void _handleOnClick(_) {
    window.console.log('Clicking');
    window.console.warn('I have been clicked');
  }

  @override
  void componentWillUnmount() {
    super.componentWillUnmount();

    if (props['shouldErrorInUnmount'] as bool) throw ExceptionForTesting();
  }
}

// ignore: type_annotate_public_apis
final Sample = react.registerComponent2(() => _SampleComponent());

class _Sample2Component extends react.Component2 {
  @override
  Map<String, react.PropValidator<void>> get propTypes => {
        'shouldNeverBeNull': (props, info) {
          if ((props as Map)['shouldNeverBeNull'] == null) {
            return ArgumentError('shouldNeverBeNull is required.');
          }

          return null;
        },
      };

  @override
  void componentDidMount() {
    window.console.warn('Just a lil warning');
  }

  @override
  dynamic render() {
    window.console.warn('A second warning');

    window.console.log('Logging a standard log');
    window.console.warn('And a third');
    return react.div({}, props['children']);
  }
}

// ignore: type_annotate_public_apis
final Sample2 = react.registerComponent2(() => _Sample2Component());

void consoleLog(List<dynamic> args) => callMethod(getProperty(window, 'console'), 'log', args);

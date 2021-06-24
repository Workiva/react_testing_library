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

import 'dart:html';

import 'package:react/react.dart' as react;
import 'package:react/react_client/react_interop.dart';
import 'package:react_testing_library/src/util/console_log_utils.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import 'util/over_react_stubs.dart';

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
bool _runtimeSupportsPropTypeWarnings() => _assertsEnabled();

void main() {
  group('recordConsoleLogs', () {
    group('captures all logs correctly', () {
      test('when mounting', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}) as ReactElement));
        final expectedLogs = [
          contains('Logging a standard log'),
          contains('A second warning'),
          contains('And a third'),
          contains('Just a lil warning'),
        ];

        if (_runtimeSupportsPropTypeWarnings()) {
          expect(logs, unorderedEquals([...expectedLogs, contains('shouldNeverBeNull is necessary.')]));
        } else {
          expect(logs, unorderedEquals(expectedLogs));
        }
      });

      test('when re-rendering', () {
        final jacket = rtl.render(Sample({'shouldAlwaysBeFalse': true}) as ReactElement);

        final logs = recordConsoleLogs(() => jacket.rerender(Sample({}) as ReactElement));
        final expectedLogs = [
          contains('Logging a standard log'),
          contains('A second warning'),
          contains('And a third'),
        ];

        if (_runtimeSupportsPropTypeWarnings()) {
          expect(logs, unorderedEquals([...expectedLogs, contains('shouldNeverBeNull is necessary.')]));
        } else {
          expect(logs, unorderedEquals(expectedLogs));
        }
      });

      test('with nested components', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample2({})) as ReactElement));
        expect(logs, hasLength(_runtimeSupportsPropTypeWarnings() ? 10 : 8));
      });

      test('with nested components that are the same', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample({})) as ReactElement));
        expect(logs, hasLength(_runtimeSupportsPropTypeWarnings() ? 9 : 8));
      });
    });

    if (_runtimeSupportsPropTypeWarnings()) {
      group('captures errors correctly', () {
        test('when mounting', () {
          final logs = recordConsoleLogs(() => rtl.render(Sample({'shouldAlwaysBeFalse': true}) as ReactElement),
              configuration: ConsoleConfig.error);

          expect(logs, hasLength(2));
          expect(logs.firstWhere((log) => log.contains('shouldAlwaysBeFalse')), contains('should never equal true'));
        });

        test('when re-rendering', () {
          // Will cause one error
          final jacket = rtl.render(Sample({'shouldAlwaysBeFalse': true}) as ReactElement);

          // Should clear the error from mounting and not create any more
          final logs = recordConsoleLogs(() => jacket.rerender(Sample({'shouldNeverBeNull': true}) as ReactElement),
              configuration: ConsoleConfig.error);

          expect(logs, hasLength(0));
        });

        test('with nested components', () {
          final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample2({})) as ReactElement),
              configuration: ConsoleConfig.error);

          expect(logs, hasLength(2));
        });

        test('with nested components that are the same', () {
          final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample({})) as ReactElement),
              configuration: ConsoleConfig.error);

          expect(logs, hasLength(1), reason: 'React will only show a particular props error once');
        });
      });
    }

    group('captures logs correctly', () {
      test('when mounting', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}) as ReactElement), configuration: ConsoleConfig.log);

        expect(logs, hasLength(1));
      });

      test('when re-rendering', () {
        // Will cause one log
        final jacket = rtl.render(Sample({}) as ReactElement);

        // Should clear the previous log and result in there being two
        final logs = recordConsoleLogs(() => jacket.rerender(Sample({'addExtraLogAndWarn': true}) as ReactElement),
            configuration: ConsoleConfig.log);

        expect(logs, hasLength(2));
      });

      test('with nested components', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample2({})) as ReactElement),
            configuration: ConsoleConfig.log);

        expect(logs, hasLength(2));
      });

      test('with nested components that are the same', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample({})) as ReactElement),
            configuration: ConsoleConfig.log);

        expect(logs, hasLength(2));
      });
    });

    group('captures warnings correctly', () {
      test('when mounting', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}) as ReactElement), configuration: ConsoleConfig.warn);

        expect(logs, hasLength(3));
      });

      test('when re-rendering', () {
        // Will three warnings
        final jacket = rtl.render(Sample({}) as ReactElement);

        // Should clear the previous warnings and result in there being 3
        final logs = recordConsoleLogs(() => jacket.rerender(Sample({'addExtraLogAndWarn': true}) as ReactElement),
            configuration: ConsoleConfig.warn);

        expect(logs, hasLength(3));
      });

      test('with nested components', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample2({})) as ReactElement),
            configuration: ConsoleConfig.warn);

        expect(logs, hasLength(6));
      });

      test('with nested components that are the same', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({}, Sample({})) as ReactElement),
            configuration: ConsoleConfig.warn);

        expect(logs, hasLength(6));
      });
    });

    if (_runtimeSupportsPropTypeWarnings()) {
      test('handles errors as expected when mounting', () {
        final logs = recordConsoleLogs(() => rtl.render(Sample({'shouldErrorInRender': true}) as ReactElement),
            configuration: ConsoleConfig.error);

        expect(logs, hasLength(2));
      });

      group('handles propType warnings as expected with shouldResetWarningCache', () {
        test('left as true', () {
          final logs =
              recordConsoleLogs(() => rtl.render(Sample({}) as ReactElement), configuration: ConsoleConfig.error);

          expect(logs, hasLength(1));
        });

        test('set to false', () {
          var logs =
              recordConsoleLogs(() => rtl.render(Sample({}) as ReactElement), configuration: ConsoleConfig.error);

          expect(logs, hasLength(1));

          logs = recordConsoleLogs(() => rtl.render(Sample({}) as ReactElement),
              configuration: ConsoleConfig.error, shouldResetPropTypesWarningCache: false);
          expect(logs, hasLength(0),
              reason: 'Because the last test triggered the same propType warning, '
                  'without resetting the cache the warning will not be logged.');

          PropTypes.resetWarningCache();

          logs = recordConsoleLogs(() => rtl.render(Sample({}) as ReactElement),
              configuration: ConsoleConfig.error, shouldResetPropTypesWarningCache: false);
          expect(logs, hasLength(1));
        });
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

          if ((props as Map)['shouldLog'] == false && (props as Map)['shouldAlwaysBeFalse'] == false) {
            return ArgumentError('logging is required.');
          }

          if ((props as Map)['shouldNeverBeNull'] == false) {
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
    if (props['shouldErrorInMount'] as bool) throw Error();
    props['onComponentDidMount']?.call();
  }

  @override
  dynamic render() {
    window.console.warn('A second warning');
    if (props['shouldErrorInRender'] as bool) {
      throw Error();
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

    if (props['shouldErrorInUnmount'] as bool) throw Error();
  }
}

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

final Sample2 = react.registerComponent2(() => _Sample2Component());

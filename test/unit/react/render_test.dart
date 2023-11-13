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
import 'package:react/react_dom.dart' as react_dom;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import '../console_log_utils_test.dart';
import '../dom/queries/shared/scoped_queries_tests.dart';
import '../util/exception.dart';
import '../util/prints_and_logs_recording.dart';
import '../util/rendering.dart';

void main() {
  group('render', () {
    final calls = <String>[];

    group('returns a RenderResult', () {
      test('', () {
        final elementToRender = react.div({'id': 'root'}, 'oh hai');
        final view = rtl.render(elementToRender);
        expect(view.container, isA<Element>());
        expect(view.baseElement, isA<Element>());
        expect(view.rerender, isA<Function>());
        expect(view.unmount, isA<Function>());
        expect(view.asFragment, isA<Function>());
        expect(view.debug, isA<Function>());
        expect(view.renderedElement, same(elementToRender));
      });

      group('that contains queries scoped to', () {
        hasQueriesScopedTo('RenderResult.baseElement', (
          scopeName, {
          testAsyncQuery = false,
          renderMultipleElsMatchingQuery,
        }) {
          final elsForQuerying =
              elementsForQuerying(scopeName, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery);
          final els =
              testAsyncQuery! ? DelayedRenderOf({'childrenToRenderAfterDelay': elsForQuerying}) : elsForQuerying;
          return ScopedQueriesTestWrapper(rtl.render(els));
        });
      });

      test('that contains a debug method', () {
        final view = rtl.render(react.div({}, [
          react.label({'htmlFor': 'number-input', 'key': 1}),
          react.input({
            'id': 'number-input',
            'type': 'number',
            'defaultValue': '3',
            'key': 2,
          })
        ]));

        final printCalls = recordPrintCalls(view.debug);
        expect(printCalls, [
          contains(
            '    <div>\n'
            '      <label\n'
            '        for="number-input"\n'
            '      />\n'
            '      <input\n'
            '        id="number-input"\n'
            '        type="number"\n'
            '        value="3"\n'
            '      />\n'
            '    </div>',
          ),
        ]);
      });
    });

    group('renders the provided element in a default container', () {
      test('', () {
        final view = rtl.render(react.div({'id': 'root'}, 'oh hai'));
        expect(document.body!.contains(view.container), isTrue);
        expect(view.container.childNodes, hasLength(1));
        expect(view.container.childNodes.single.text, 'oh hai');
      });

      test('wrapped in a wrapper when specified', () {
        rtl.render(react.div({'id': 'root'}, 'oh hai'), wrapper: react.aside);
        final wrapperElement = querySelector('aside')!;
        expect(wrapperElement, isNotNull);
        expect(wrapperElement.querySelector('#root'), isNotNull);
      });

      test('and then updates the DOM when rerender is called', () {
        final view = rtl.render(react.div({'id': 'root'}, 'oh hai'));
        final elementForRerender = react.div({'id': 'root'}, 'different');
        view.rerender(elementForRerender);
        expect(view.container.childNodes, hasLength(1));
        expect(view.container.childNodes.single.text, 'different');
        expect(view.renderedElement, same(elementForRerender));
      });

      group('and then unmounts / removes it by default, also calling the provided autoTearDownCallback', () {
        test('', () {
          addTearDown(() {
            expect(document.body!.children, isEmpty);
            expect(calls, ['autoTearDownCallback']);
            calls.clear();
          });

          rtl.render(react.div({'id': 'root'}, 'oh hai'), onDidTearDown: () {
            calls.add('autoTearDownCallback');
          });
        });

        group('unless autoTearDown is false', () {
          late rtl.RenderResult view;

          tearDownAll(() {
            view.unmount();
            view.container.remove();
          });

          test('', () {
            view = rtl.render(react.div({'id': 'root'}, 'oh hai'), autoTearDown: false);
          });

          test('', () {
            expect(document.body!.children.contains(view.container), isTrue);
          });
        });
      });
    });

    group('renders the provided element in the provided container', () {
      Node? customContainer;

      test('', () {
        customContainer = document.body!.append(DivElement()..id = 'custom-container');
        final renderedResult =
            rtl.render(react.div({'id': 'root'}, 'oh hai'), container: customContainer);
        expect(renderedResult.container, same(customContainer));
        expect(document.body!.contains(renderedResult.container), isTrue);
        expect(renderedResult.container.childNodes, hasLength(1));
        expect(renderedResult.container.childNodes.single.text, 'oh hai');
      });

      group('and then unmounts / removes it by default', () {
        test('', () {
          expect(document.body!.children, isEmpty);
        });

        group('unless autoTearDown is false', () {
          late rtl.RenderResult view;

          tearDown(() {
            expect(document.body!.children.contains(view.container), isTrue);
            view.unmount();
            view.container.remove();
            customContainer = null;
          });

          test('', () {
            customContainer = document.body!.append(DivElement()..id = 'custom-container');
            view = rtl.render(react.div({'id': 'root'}, 'oh hai'),
                container: customContainer, autoTearDown: false);
          });
        });
      });
    });

    group('prints react warnings', () {
      test('for custom component', () {
        final printCalls = recordPrintCalls(
          () => rtl.render(testComponent({'name': '123456789012345678901'})),
        );
        if (runtimeSupportsPropTypeWarnings()) {
          expect(
            printCalls,
            unorderedEquals([
              contains('⚠️  Warning: Failed prop type: Invalid argument(s): (123456789012345678901) is too long.'),
              contains('⚠️  Warning: Each child in a list should have a unique "key" prop.'),
            ]),
          );
        } else {
          expect(
            printCalls,
            unorderedEquals([
              contains('⚠️  Warning: Each child in a list should have a unique "key" prop.'),
            ]),
          );
        }
      });

      test('scopes queries to the body by default', () {
        final view = rtl.render(PortalComponent({}));

        expect(view.getByRole('tooltip'), isInTheDocument);

        // ignore: invalid_use_of_protected_member
        expect(view.getContainerForScope(), document.body);
      });

      test('for dom elements', () {
        final printCalls = recordPrintCalls(
          () => rtl.render(react.input({'value': 'abc'})),
        );
        expect(
          printCalls,
          equals([
            contains('⚠️  Warning: You provided a `value` prop to a form field without an `onChange` handler.'),
          ]),
        );
      });
    });

    test('when a component throws during mount, prints all relevant logs and also throws the error', () {
      final printCalls = <String>[];

      expect(() {
        spyOnPrintCalls(() {
          rtl.render(TestFailComponent({}));
        }, onPrint: printCalls.add);
      }, throwsA(isA<ExceptionForTesting>()));

      expect(printCalls, [
        contains('⚠️  Warning: The above error occurred in one of your React components:'),
      ]);
    });
  });
}

class _PortalComponent extends react.Component2 {
  @override
  dynamic componentDidMount() {
    final toolTip = react.div({'role': 'tooltip'}, ['I Am a Tooltip']);
    final portal = ReactDom.createPortal(toolTip, document.body!);
    react_dom.render(portal, document.body);
  }

  @override
  dynamic render() {
    return react.div({}, ['abc', react.div({})]);
  }
}

// ignore: type_annotate_public_apis
final PortalComponent = react.registerComponent2(() => _PortalComponent());

class _TestComponent extends react.Component2 {
  @override
  Map<String, react.PropValidator<void>> get propTypes => {
        'name': (props, info) {
          final propValue = (props as Map)[info.propName] as String;
          if (propValue.length > 20) {
            return ArgumentError('($propValue) is too long. $propValue has a max length of 20 characters.');
          }
          return null;
        },
      };

  @override
  dynamic render() {
    return react.div({}, ['abc', react.div({})]);
  }
}

// ignore: type_annotate_public_apis
final testComponent = react.registerComponent2(() => _TestComponent());

// ignore: type_annotate_public_apis
final TestFailComponent = react.registerFunctionComponent((props) {
  throw ExceptionForTesting('Exception thrown during render');
});

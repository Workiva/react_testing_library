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
import 'package:react/react_client/react_interop.dart' show ReactElement, Ref;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/util/error_message_utils.dart';
import 'package:test/test.dart';

import '../../util/init.dart';
import '../../util/matchers.dart';

// NOTE: All other tests for the ByRole queries are covered by the `testTextMatchTypes()` shared tests.
main() {
  group('', () {
    initConfigForInternalTesting();

    rtl.RenderResult renderResult;
    Ref<Element> emptyElementRef;
    tearDown(() {
      renderResult = null;
    });

    group('when more than one element has the same role,', () {
      setUp(() {
        emptyElementRef = react.createRef<Element>();
        renderResult = rtl.render(react.article(
          {},
          react.h1({}, 'Heading'),
          react.h2({}, 'Sub Heading'),
          react.div({
            'role': 'heading',
            'aria-level': 3,
          }, 'Sub Heading'),
          renderButton(),
          react.section(
            {'aria-hidden': true},
            renderDialog(),
          ),
          renderButton(pressed: true),
          renderButton(expanded: true),
          renderTab(),
          renderTab(selected: true),
          renderCheckbox(),
          renderCheckbox(checked: true),
          renderCheckboxWithSwitchAsFallback(),
          react.div({'ref': emptyElementRef}),
        ) as ReactElement);

        expect(emptyElementRef.current, isNotNull);
        expect(renderResult.queryAllByRole('button'), hasLength(greaterThan(1)));
        expect(renderResult.queryAllByRole('tab'), hasLength(greaterThan(1)));
        expect(renderResult.queryAllByRole('heading'), hasLength(greaterThan(1)));
        expect(renderResult.queryAllByRole('checkbox'), hasLength(greaterThan(1)));
      });

      // ----- hidden ----- //
      group(
          'the hidden argument can be specified to target element(s) that '
          'are usually excluded from the accessibility tree:', () {
        group('queryByRole', () {
          test('[match]', () {
            expect(renderResult.queryByRole('dialog', hidden: true), isA<Element>());
          });

          test('[no match]', () {
            expect(renderResult.queryByRole('dialog', hidden: false), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = renderResult.queryAllByRole('dialog', hidden: true);
            expect(result, hasLength(1));
            expect(result.single, isA<Element>());
          });

          test('[no matches]', () {
            expect(renderResult.queryAllByRole('dialog', hidden: false), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(renderResult.getByRole('dialog', hidden: true), isA<Element>());
          });

          test('[no match]', () {
            expect(
                () => renderResult.getByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = renderResult.getAllByRole('dialog', hidden: true);
            expect(result, hasLength(1));
            expect(result.single, isA<Element>());
          });

          test('[no matches]', () {
            expect(
                () => renderResult.getAllByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await renderResult.findByRole('dialog', hidden: true), isA<Element>());
          });

          test('[no match]', () async {
            expect(
                () async => await renderResult.findByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByRole('dialog', hidden: true);
            expect(result, hasLength(1));
            expect(result.single, isA<Element>());
          });

          test('[no matches]', () async {
            expect(
                () async => await renderResult.findAllByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });
      });

      // ----- selected ----- //
      group(
          'the selected argument can be specified to target '
          'only selectable element(s) that are selected:', () {
        group('queryByRole', () {
          test('[match]', () {
            expect(renderResult.queryByRole('tab', selected: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(renderResult.queryByRole('option', selected: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = renderResult.queryAllByRole('tab', selected: true);
            expect(result, hasLength(1));
            expect(result.single, isA<Element>());
          });

          test('[no matches]', () {
            expect(renderResult.queryAllByRole('option', selected: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(renderResult.getByRole('tab', selected: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => renderResult.getByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = renderResult.getAllByRole('tab', selected: true);
            expect(result, hasLength(1));
            expect(result.single, isA<Element>());
          });

          test('[no matches]', () {
            expect(
                () => renderResult.getAllByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await renderResult.findByRole('tab', selected: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () async => await renderResult.findByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByRole('tab', selected: true);
            expect(result, hasLength(1));
            expect(result.single, isA<Element>());
          });

          test('[no matches]', () async {
            expect(
                () async => await renderResult.findAllByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });
      });

      // ----- checked ----- //
      group(
          'the checked argument can be specified to target '
          'only checkbox element(s) that are checked:', () {
        group('queryByRole', () {
          test('[match]', () {
            expect(renderResult.queryByRole('checkbox', checked: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(rtl.within(emptyElementRef.current).queryByRole('checkbox', checked: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = renderResult.queryAllByRole('checkbox', checked: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(rtl.within(emptyElementRef.current).queryAllByRole('checkbox', checked: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(renderResult.getByRole('checkbox', checked: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => rtl.within(emptyElementRef.current).getByRole('checkbox', checked: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = renderResult.getAllByRole('checkbox', checked: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(
                () => rtl.within(emptyElementRef.current).getAllByRole('checkbox', checked: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await renderResult.findByRole('checkbox', checked: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () async => await rtl.within(emptyElementRef.current).findByRole('checkbox', checked: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByRole('checkbox', checked: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () async {
            expect(
                () async => await rtl.within(emptyElementRef.current).findAllByRole('checkbox', checked: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });
      });

      // ----- pressed ----- //
      group(
          'the pressed argument can be specified to target '
          'only button(s) that are pressed:', () {
        group('queryByRole', () {
          test('[match]', () {
            expect(renderResult.queryByRole('button', pressed: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(rtl.within(emptyElementRef.current).queryByRole('button', pressed: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = renderResult.queryAllByRole('button', pressed: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(rtl.within(emptyElementRef.current).queryAllByRole('button', pressed: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(renderResult.getByRole('button', pressed: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => rtl.within(emptyElementRef.current).getByRole('button', pressed: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "button"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = renderResult.getAllByRole('button', pressed: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(
                () => rtl.within(emptyElementRef.current).getAllByRole('button', pressed: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "button"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await renderResult.findByRole('button', pressed: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () async => await rtl.within(emptyElementRef.current).findByRole('button', pressed: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "button"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByRole('button', pressed: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () async {
            expect(
                () async => await rtl.within(emptyElementRef.current).findAllByRole('button', pressed: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "button"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });
      });

      // ----- expanded ----- //
      group(
          'the expanded argument can be specified to target '
          'only expandable element(s) that are expanded:', () {
        group('queryByRole', () {
          test('[match]', () {
            expect(renderResult.queryByRole('button', expanded: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(renderResult.queryByRole('checkbox', expanded: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = renderResult.queryAllByRole('button', expanded: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(renderResult.queryAllByRole('checkbox', expanded: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(renderResult.getByRole('button', expanded: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => renderResult.getByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = renderResult.getAllByRole('button', expanded: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(
                () => renderResult.getAllByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await renderResult.findByRole('button', expanded: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () async => await renderResult.findByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByRole('button', expanded: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () async {
            expect(
                () async => await renderResult.findAllByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });
      });

      // ----- level ----- //
      group(
          'the level argument can be specified to target '
          'only heading(s) at a specific nesting level:', () {
        group('queryByRole', () {
          test('[match]', () {
            expect(renderResult.queryByRole('heading', level: 2), isA<HeadingElement>());
            expect(renderResult.queryByRole('heading', level: 3), isA<DivElement>());
          });

          test('[no match]', () {
            expect(rtl.within(emptyElementRef.current).queryByRole('heading', level: 2), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = renderResult.queryAllByRole('heading', level: 2);
            expect(result, hasLength(1));
            expect(result.single, isA<HeadingElement>());
          });

          test('[no matches]', () {
            expect(rtl.within(emptyElementRef.current).queryAllByRole('heading', level: 2), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(renderResult.getByRole('heading', level: 2), isA<HeadingElement>());
          });

          test('[no match]', () {
            expect(
                () => rtl.within(emptyElementRef.current).getByRole('heading', level: 2),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "heading"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = renderResult.getAllByRole('heading', level: 2);
            expect(result, hasLength(1));
            expect(result.single, isA<HeadingElement>());
          });

          test('[no matches]', () {
            expect(
                () => rtl.within(emptyElementRef.current).getAllByRole('heading', level: 2),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "heading"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await renderResult.findByRole('heading', level: 2), isA<HeadingElement>());
          });

          test('[no match]', () async {
            expect(
                () async => await rtl.within(emptyElementRef.current).findByRole('heading', level: 2),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "heading"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByRole('heading', level: 2);
            expect(result, hasLength(1));
            expect(result.single, isA<HeadingElement>());
          });

          test('[no matches]', () async {
            expect(
                () async => await rtl.within(emptyElementRef.current).findAllByRole('heading', level: 2),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "heading"')),
                  hasToStringValue(
                      contains('There are no accessible roles. But there might be some inaccessible roles.')),
                  hasToStringValue(contains(rtl.prettyDOM(emptyElementRef.current))),
                )));
          });
        });
      });

      // ----- queryFallbacks ----- //
      group(
          'the queryFallbacks argument can be set to true to target '
          'elements using fallback roles:', () {
        setUp(() {
          expect(renderResult.queryByRole('switch'), isNull, reason: 'test setup sanity check');
        });

        group('queryByRole', () {
          test('[match]', () {
            expect(renderResult.queryByRole('switch', queryFallbacks: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(renderResult.queryByRole('switch'), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = renderResult.queryAllByRole('switch', queryFallbacks: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(renderResult.queryAllByRole('switch'), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(renderResult.getByRole('switch', queryFallbacks: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => renderResult.getByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = renderResult.getAllByRole('switch', queryFallbacks: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () {
            expect(
                () => renderResult.getAllByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await renderResult.findByRole('switch', queryFallbacks: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () async => await renderResult.findByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByRole('switch', queryFallbacks: true);
            expect(result, hasLength(1));
            expect(result.single, isA<ButtonElement>());
          });

          test('[no matches]', () async {
            expect(
                () async => await renderResult.findAllByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });
      });
    });
  });
}

renderButton({bool pressed = false, bool expanded = false}) {
  return react.button(
    {
      'type': 'button',
      'aria-pressed': pressed,
      'aria-expanded': expanded,
    },
    'Click me',
  );
}

renderDialog() {
  return react.div(
    {'role': 'dialog'},
    'Read me',
  );
}

renderTab({bool selected = false}) {
  return react.button(
    {
      'type': 'button',
      'role': 'tab',
      'aria-selected': selected,
    },
    'Select me',
  );
}

renderCheckbox({bool checked = false}) {
  return react.button(
    {
      'type': 'button',
      'role': 'checkbox',
      'aria-checked': checked,
    },
    'Check me out',
  );
}

renderCheckboxWithSwitchAsFallback({bool checked = false}) {
  return react.button(
    {
      'type': 'button',
      'role': 'checkbox switch',
      'aria-checked': checked,
    },
    'Check me out',
  );
}

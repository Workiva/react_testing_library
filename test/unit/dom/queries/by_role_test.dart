
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
void main() {
  group('', () {
    initConfigForInternalTesting();

    rtl.RenderResult view;
    Ref<Element> emptyElementRef;
    tearDown(() {
      view = null;
    });

    group('when more than one element has the same role,', () {
      setUp(() {
        emptyElementRef = react.createRef<Element>();
        view = rtl.render(react.article(
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
        expect(view.queryAllByRole('button'), hasLength(greaterThan(1)));
        expect(view.queryAllByRole('tab'), hasLength(greaterThan(1)));
        expect(view.queryAllByRole('heading'), hasLength(greaterThan(1)));
        expect(view.queryAllByRole('checkbox'), hasLength(greaterThan(1)));
      });

      // ----- hidden ----- //
      group(
          'the hidden argument can be specified to target element(s) that '
          'are usually excluded from the accessibility tree:', () {
        group('queryByRole', () {
          test('[match]', () {
            expect(view.queryByRole('dialog', hidden: true), isA<Element>());
          });

          test('[no match]', () {
            expect(view.queryByRole('dialog', hidden: false), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = view.queryAllByRole('dialog', hidden: true);
            expect(result, [isA<Element>()]);
          });

          test('[no matches]', () {
            expect(view.queryAllByRole('dialog', hidden: false), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(view.getByRole('dialog', hidden: true), isA<Element>());
          });

          test('[no match]', () {
            expect(
                () => view.getByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = view.getAllByRole('dialog', hidden: true);
            expect(result, [isA<Element>()]);
          });

          test('[no matches]', () {
            expect(
                () => view.getAllByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await view.findByRole('dialog', hidden: true), isA<Element>());
          });

          test('[no match]', () async {
            expect(
                () => view.findByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await view.findAllByRole('dialog', hidden: true);
            expect(result, [isA<Element>()]);
          });

          test('[no matches]', () async {
            expect(
                () => view.findAllByRole('dialog', hidden: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "dialog"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
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
            expect(view.queryByRole('tab', selected: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(view.queryByRole('option', selected: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = view.queryAllByRole('tab', selected: true);
            expect(result, [isA<Element>()]);
          });

          test('[no matches]', () {
            expect(view.queryAllByRole('option', selected: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(view.getByRole('tab', selected: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => view.getByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = view.getAllByRole('tab', selected: true);
            expect(result, [isA<Element>()]);
          });

          test('[no matches]', () {
            expect(
                () => view.getAllByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await view.findByRole('tab', selected: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () => view.findByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await view.findAllByRole('tab', selected: true);
            expect(result, [isA<Element>()]);
          });

          test('[no matches]', () async {
            expect(
                () => view.findAllByRole('option', selected: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "option"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
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
            expect(view.queryByRole('checkbox', checked: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(rtl.within(emptyElementRef.current).queryByRole('checkbox', checked: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = view.queryAllByRole('checkbox', checked: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () {
            expect(rtl.within(emptyElementRef.current).queryAllByRole('checkbox', checked: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(view.getByRole('checkbox', checked: true), isA<ButtonElement>());
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
            final result = view.getAllByRole('checkbox', checked: true);
            expect(result, [isA<ButtonElement>()]);
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
            expect(await view.findByRole('checkbox', checked: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () => rtl.within(emptyElementRef.current).findByRole('checkbox', checked: true),
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
            final result = await view.findAllByRole('checkbox', checked: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () async {
            expect(
                () => rtl.within(emptyElementRef.current).findAllByRole('checkbox', checked: true),
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
            expect(view.queryByRole('button', pressed: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(rtl.within(emptyElementRef.current).queryByRole('button', pressed: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = view.queryAllByRole('button', pressed: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () {
            expect(rtl.within(emptyElementRef.current).queryAllByRole('button', pressed: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(view.getByRole('button', pressed: true), isA<ButtonElement>());
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
            final result = view.getAllByRole('button', pressed: true);
            expect(result, [isA<ButtonElement>()]);
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
            expect(await view.findByRole('button', pressed: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () => rtl.within(emptyElementRef.current).findByRole('button', pressed: true),
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
            final result = await view.findAllByRole('button', pressed: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () async {
            expect(
                () => rtl.within(emptyElementRef.current).findAllByRole('button', pressed: true),
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
            expect(view.queryByRole('button', expanded: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(view.queryByRole('checkbox', expanded: true), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = view.queryAllByRole('button', expanded: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () {
            expect(view.queryAllByRole('checkbox', expanded: true), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(view.getByRole('button', expanded: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => view.getByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = view.getAllByRole('button', expanded: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () {
            expect(
                () => view.getAllByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await view.findByRole('button', expanded: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () => view.findByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await view.findAllByRole('button', expanded: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () async {
            expect(
                () => view.findAllByRole('checkbox', expanded: true),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "checkbox"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
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
            expect(view.queryByRole('heading', level: 2), isA<HeadingElement>());
            expect(view.queryByRole('heading', level: 3), isA<DivElement>());
          });

          test('[no match]', () {
            expect(rtl.within(emptyElementRef.current).queryByRole('heading', level: 2), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = view.queryAllByRole('heading', level: 2);
            expect(result, [isA<HeadingElement>()]);
          });

          test('[no matches]', () {
            expect(rtl.within(emptyElementRef.current).queryAllByRole('heading', level: 2), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(view.getByRole('heading', level: 2), isA<HeadingElement>());
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
            final result = view.getAllByRole('heading', level: 2);
            expect(result, [isA<HeadingElement>()]);
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
            expect(await view.findByRole('heading', level: 2), isA<HeadingElement>());
          });

          test('[no match]', () async {
            expect(
                () => rtl.within(emptyElementRef.current).findByRole('heading', level: 2),
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
            final result = await view.findAllByRole('heading', level: 2);
            expect(result, [isA<HeadingElement>()]);
          });

          test('[no matches]', () async {
            expect(
                () => rtl.within(emptyElementRef.current).findAllByRole('heading', level: 2),
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
          expect(view.queryByRole('switch'), isNull, reason: 'test setup sanity check');
        });

        group('queryByRole', () {
          test('[match]', () {
            expect(view.queryByRole('switch', queryFallbacks: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(view.queryByRole('switch'), isNull);
          });
        });

        group('queryAllByRole', () {
          test('[matches]', () {
            final result = view.queryAllByRole('switch', queryFallbacks: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () {
            expect(view.queryAllByRole('switch'), isEmpty);
          });
        });

        group('getByRole', () {
          test('[match]', () {
            expect(view.getByRole('switch', queryFallbacks: true), isA<ButtonElement>());
          });

          test('[no match]', () {
            expect(
                () => view.getByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('getAllByRole', () {
          test('[matches]', () {
            final result = view.getAllByRole('switch', queryFallbacks: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () {
            expect(
                () => view.getAllByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findByRole', () {
          test('[match]', () async {
            expect(await view.findByRole('switch', queryFallbacks: true), isA<ButtonElement>());
          });

          test('[no match]', () async {
            expect(
                () => view.findByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findAllByRole', () {
          test('[matches]', () async {
            final result = await view.findAllByRole('switch', queryFallbacks: true);
            expect(result, [isA<ButtonElement>()]);
          });

          test('[no matches]', () async {
            expect(
                () => view.findAllByRole('switch'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an accessible element with the role "switch"')),
                  hasToStringValue(contains('Here are the accessible roles:')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });
      });
    });
  });
}

ReactElement renderButton({bool pressed = false, bool expanded = false}) {
  return react.button(
    {
      'type': 'button',
      'aria-pressed': pressed,
      'aria-expanded': expanded,
    },
    'Click me',
  ) as ReactElement;
}

ReactElement renderDialog() {
  return react.div(
    {'role': 'dialog'},
    'Read me',
  ) as ReactElement;
}

ReactElement renderTab({bool selected = false}) {
  return react.button(
    {
      'type': 'button',
      'role': 'tab',
      'aria-selected': selected,
    },
    'Select me',
  ) as ReactElement;
}

ReactElement renderCheckbox({bool checked = false}) {
  return react.button(
    {
      'type': 'button',
      'role': 'checkbox',
      'aria-checked': checked,
    },
    'Check me out',
  ) as ReactElement;
}

ReactElement renderCheckboxWithSwitchAsFallback({bool checked = false}) {
  return react.button(
    {
      'type': 'button',
      'role': 'checkbox switch',
      'aria-checked': checked,
    },
    'Check me out',
  ) as ReactElement;
}

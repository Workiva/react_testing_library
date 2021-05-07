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
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

main() {
  group('User click events:', () {
    rtl.RenderResult renderedResult;
    List<InputElement> inputs;

    setUp(() {
      final elementToRender = react.div({}, [
        react.input({}),
        react.div({
          'data-test-id': 'container'
        }, [
          react.input({}),
          react.input({}),
        ]),
      ]);

      renderedResult = rtl.render(elementToRender as ReactElement);
      inputs = renderedResult.getAllByRole('textbox');
      expect(inputs, hasLength(3), reason: 'sanity check');
    });

    test('', () {
      expect(document.body, isFocused);

      UserEvent.tab();

      expect(inputs.first, isFocused);

      UserEvent.tab();

      expect(inputs[1], isFocused);

      UserEvent.tab();

      expect(inputs[2], isFocused);

      UserEvent.tab();

      // Cycle goes back to the body element.
      expect(document.body, isFocused);
    });

    test('shift', () {
      expect(document.body, isFocused);

      UserEvent.tab(shift: true);

      // Tab direction goes backwards.
      expect(inputs[2], isFocused);

      UserEvent.tab(shift: true);

      expect(inputs[1], isFocused);

      UserEvent.tab(shift: true);

      expect(inputs.first, isFocused);

      UserEvent.tab(shift: true);

      // Cycle goes back to the body element.
      expect(document.body, isFocused);
    });

    test('focusTrap', () {
      final container = renderedResult.getByTestId('container');
      expect(document.body, isFocused);

      UserEvent.tab(focusTrap: container);

      // Focused element is the first inside the container.
      expect(inputs[1], isFocused);

      UserEvent.tab(focusTrap: container);

      expect(inputs[2], isFocused);

      UserEvent.tab(focusTrap: container);

      // Cycle goes back to first element in container.
      expect(inputs[1], isFocused);
    });
  });
}

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
import 'package:test/test.dart';

main() {
  group('UserEvent.keyboard', () {
    List<String> calls;
    rtl.RenderResult renderedResult;
    InputElement input;

    setUp(() {
      calls = [];
    });

    group('', () {
      setUp(() {
        final elementToRender = react.input({
          'onKeyDown': (react.SyntheticKeyboardEvent event) {
            calls.add(
                'keyDown: ${event.key}${event.shiftKey ? ' {shift}' : ''}');
          },
          'onKeyUp': (react.SyntheticKeyboardEvent event) {
            calls.add('keyUp: ${event.key}${event.shiftKey ? ' {shift}' : ''}');
          },
        });

        renderedResult = rtl.render(elementToRender as ReactElement);
        input = renderedResult.getByRole('textbox');
        expect(input, hasValue(''));
      });

      test('', () {
        input.focus();
        rtl.UserEvent.keyboard('hello');
        expect(input, hasValue('hello'));
      });

      test('brackets as escape characters', () {
        input.focus();
        rtl.UserEvent.keyboard('{{a[[');
        expect(input, hasValue('{a['));
      });

      test('KeyboardEvent.key', () {
        input.focus();
        rtl.UserEvent.keyboard('{Shift}{f}{o}{o}');
        expect(input, hasValue('foo'));
      });

      test('KeyboardEvent.code', () {
        input.focus();
        rtl.UserEvent.keyboard('[ShiftLeft][KeyF][KeyO][KeyO]');
        expect(input, hasValue('foo'));
      });

      test('KeyboardEvent.key', () {
        input.focus();
        rtl.UserEvent.keyboard('{Shift}{f}{o}{o}');
        expect(input, hasValue('foo'));
      });

      group('KeyboardState', () {
        test('two keyboard events back to back without setting state', () {
          input.focus();
          rtl.UserEvent.keyboard('[ShiftRight>]');
          rtl.UserEvent.keyboard('F[/ShiftRight]');
          expect(input, hasValue('F'));
          expect(
              calls,
              equals([
                'keyDown: Shift {shift}',
                'keyDown: F', // Does not have shift pressed because previous state does not persist.
                'keyUp: F',
              ]));
        });

        test('two keyboard events back to back with setting state', () {
          input.focus();
          final state = rtl.UserEvent.keyboard('[ShiftRight>]');
          rtl.UserEvent.keyboard('F[/ShiftRight]', keyboardState: state);
          expect(input, hasValue('F'));
          expect(
              calls,
              equals([
                'keyDown: Shift {shift}',
                'keyDown: F {shift}', // Has shift pressed because keyboardState is set.
                'keyUp: F {shift}',
                'keyUp: Shift',
              ]));
        });
      });
    });
  });
}

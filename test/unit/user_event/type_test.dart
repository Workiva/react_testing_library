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
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart';
import 'package:test/test.dart';

main() {
  group('User type events:', () {
    int clickEventCount;
    InputElement input;
    List<String> keyUpCalls;
    List<String> calls;

    setUp(() {
      clickEventCount = 0;
      keyUpCalls = [];
      calls = [];

      rtl.render(react.input({
        'id': 'root',
        'onClick': (_) => clickEventCount++,
        'onKeyUp': (react.SyntheticKeyboardEvent e) {
          keyUpCalls.add(e.key);
          calls.add('input[value="${input.value}"] - keyUp: ${input.selectionStart} ${input.selectionEnd} ${e.key} ${e.keyCode}');
        },
        'onKeyDown': (react.SyntheticKeyboardEvent e) {
          calls.add('input[value="${input.value}"] - keyDown: ${input.selectionStart} ${input.selectionEnd} ${e.key} ${e.keyCode}');
        },
        'onKeyDownCapture': (react.SyntheticKeyboardEvent e) {
          calls.add('input[value="${input.value}"] - keyDownCapture: ${input.selectionStart} ${input.selectionEnd} ${e.key} ${e.keyCode}');
        },
        'onKeyUpCapture': (react.SyntheticKeyboardEvent e) {
          calls.add('input[value="${input.value}"] - keyUpCapture: ${input.selectionStart} ${input.selectionEnd} ${e.key} ${e.keyCode}');
        },
        'onInput': (react.SyntheticKeyboardEvent e) {
          calls.add('input[value="${input.value}"] - input: ${input.selectionStart} ${input.selectionEnd}');
        },
        'onKeyPress': (react.SyntheticKeyboardEvent e) {
          calls.add('input[value="${input.value}"] - keyPress: ${input.selectionStart} ${input.selectionEnd} ${e.key} ${e.keyCode}');
        },
        'defaultValue': 'This is a bad example',
      }) as ReactElement);

      input = rtl.screen.getByRole('textbox');
      // expect(textbox, hasValue(''), reason: 'sanity check');
    });

    group('UserEvent.type', () {
      void _verifyTypeEvent({
        bool skipClick = false,
      }) {
        // Verify click event.
        expect(clickEventCount, equals(skipClick ? 0 : 1));

        // expect(calls.length, isTrue);
        // expect((calls.first as MouseEvent).ctrlKey, isTrue);
      }

      // test('', () {
      //   rtl.UserEvent.type(input, 'oh hai');
      //   expect(input, hasValue('oh hai'));
      //   _verifyTypeEvent();
      // });
      //
      // test('skipClick', () {
      //   // Manually focus the element since click will be skipped.
      //   input.focus();
      //   rtl.UserEvent.type(input, 'oh hai', skipClick: true);
      //   expect(input, hasValue('oh hai'));
      //   _verifyTypeEvent(skipClick: true);
      // });
      //
      // group('skipAutoClose:', () {
      //   test('false (default)', () {
      //     rtl.UserEvent.type(input, 'oh {ctrl}hai');
      //     expect(
      //       input,
      //       hasValue('oh '),
      //       reason:
      //       'ctrl modifier key stops input from receiving the remaining characters',
      //     );
      //     expect(
      //       keyUpCalls.last,
      //       equals('Control'),
      //       reason:
      //       'ctrl modifier key will be closed at the end of the type event',
      //     );
      //
      //     _verifyTypeEvent();
      //   });
      //
      //   test('true', () {
      //     rtl.UserEvent.type(input, 'oh {ctrl}hai', skipAutoClose: true);
      //     expect(
      //       input,
      //       hasValue('oh '),
      //       reason:
      //       'ctrl modifier key stops input from receiving the remaining characters',
      //     );
      //     expect(
      //       keyUpCalls.last,
      //       equals('i'),
      //       reason:
      //       'ctrl modifier key will be closed at the end of the type event',
      //     );
      //
      //     _verifyTypeEvent();
      //   });
      // });

      group('initialSelectionStart and initialSelectionEnd', () {
        // test('when they are the same number', () {
        //   rtl.UserEvent.type(input, 'this is a bad example');
        //   // Sanity check.
        //   expect(input, hasValue('this is a bad example'));
        //   print('${input.selectionStart} ${input.selectionEnd}');
        //   // todo why is it typing backwards!
        //   input.setSelectionRange(0, 0);
        //   print(input.selectionDirection);
        //   print('${input.selectionStart} ${input.selectionEnd}');
        //   rtl.UserEvent.type(input, 'good');
        //   // expect(calls, true);
        //   print('${input.selectionStart} ${input.selectionEnd}');
        //   expect(input, hasValue('goodthis is a bad example'));
        // });

        // todo get setSelectionRange to work with type
        test('when some text is selected', () {
          // Sanity check.
          expect(input, hasValue('This is a bad example'));
          input.focus();
          print('${input.selectionStart} ${input.selectionEnd}');
          input.setSelectionRange(10, 13);
          print(input.selectionDirection);
          print('${input.selectionStart} ${input.selectionEnd}');
          rtl.UserEvent.type(input, 'good');

          // rtl.fireEventByName('keyUp', input, {'key': 'g', 'code': '103', 'keyCode': '103', 'altKey': false,
          //   'ctrlKey': false,
          //   'metaKey': false,
          //   'shiftKey': false,});
          print(calls.join('\n'));
          print('${input.selectionStart} ${input.selectionEnd}');
          expect(input, hasValue('This is a good example'));
        });
      });
    });

    // TODO: fix [rtl.UserEvent.typeWithDelay] because longer strings take way longer than 1 millisecond per letter
    // group('UserEvent.typeWithDelay', () {
    //   test('', () async {
    //     await rtl.UserEvent.typeWithDelay(textbox, 'hi', 1);
    //     await rtl.waitFor(() => expect(textbox, hasValue('hi')));
    //   });
    // });
  });
}

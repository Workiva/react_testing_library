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

import 'dart:developer';
import 'dart:html';

import 'package:react/hooks.dart';
import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart';
import 'package:test/test.dart';

main() {
  group('User type events:', () {
    group('UserEvent.type', () {
      int clickEventCount;
      InputElement input;
      List<String> keyUpCalls;
      List<String> calls;

      void _verifyTypeEvent({
        bool skipClick = false,
      }) {
        // Verify click event.
        expect(clickEventCount, equals(skipClick ? 0 : 1));
      }

      group('', () {
        setUp(() {
          clickEventCount = 0;
          keyUpCalls = [];
          calls = [];

          rtl.render(react.input({
            'id': 'root',
            'onClick': (_) => clickEventCount++,
            'onKeyUp': (react.SyntheticKeyboardEvent e) =>
                keyUpCalls.add(e.key),
          }) as ReactElement);

          input = rtl.screen.getByRole('textbox');
          expect(input, hasValue(''), reason: 'sanity check');
        });

        test('', () {
          rtl.UserEvent.type(input, 'oh hai');
          expect(input, hasValue('oh hai'));
          _verifyTypeEvent();
        });

        test('skipClick', () {
          // Manually focus the element since click will be skipped.
          input.focus();
          rtl.UserEvent.type(input, 'oh hai', skipClick: true);
          expect(input, hasValue('oh hai'));
          _verifyTypeEvent(skipClick: true);
        });

        group('skipAutoClose:', () {
          test('false (default)', () {
            rtl.UserEvent.type(input, 'oh {ctrl}hai');
            expect(
              input,
              hasValue('oh '),
              reason:
                  'ctrl modifier key stops input from receiving the remaining characters',
            );
            expect(
              keyUpCalls.last,
              equals('Control'),
              reason:
                  'ctrl modifier key will be closed at the end of the type event',
            );

            _verifyTypeEvent();
          });

          test('true', () {
            rtl.UserEvent.type(input, 'oh {ctrl}hai', skipAutoClose: true);
            expect(
              input,
              hasValue('oh '),
              reason:
                  'ctrl modifier key stops input from receiving the remaining characters',
            );
            expect(
              keyUpCalls.last,
              equals('i'),
              reason:
                  'ctrl modifier key will be closed at the end of the type event',
            );

            _verifyTypeEvent();
          });
        });
      });

      group('with default value in the input', () {
        setUp(() {
          clickEventCount = 0;
          keyUpCalls = [];
          calls = [];

          rtl.render(react.input({
            'id': 'root',
            'onClick': (_) => clickEventCount++,
            'onKeyUp': (react.SyntheticKeyboardEvent e) =>
                keyUpCalls.add(e.key),
            'defaultValue': 'this is a bad example',
          }) as ReactElement);

          input = rtl.screen.getByRole('textbox');
          expect(input, hasValue('this is a bad example'),
              reason: 'sanity check');
        });

        test('', () {
          rtl.UserEvent.type(input, 'good');
          expect(input, hasValue('this is a bad examplegood'));
          _verifyTypeEvent();
        });

        // TODO: uncomment these tests when <insert ticket number here> is complete.
        // test('with setSelectionRange', () {
        //   input.setSelectionRange(10, 13);
        //   rtl.UserEvent.type(input, 'good');
        //   expect(input, hasValue('this is a good example'));
        //   _verifyTypeEvent();
        // });
        //
        // test('with setSelectionRange set to zero', () {
        //   input.setSelectionRange(0, 0);
        //   rtl.UserEvent.type(
        //     input,
        //     'good',
        //     initialSelectionStart: 0,
        //     initialSelectionEnd: 0,
        //   );
        //   expect(input, hasValue('goodthis is a bad example'));
        //   _verifyTypeEvent();
        // });
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

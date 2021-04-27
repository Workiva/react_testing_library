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
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart';
import 'package:test/test.dart';

main() {
  group('UserEvent.type', () {
    int clickEventCount;
    Element textbox;
    List<String> keyUpCalls;

    setUp(() {
      clickEventCount = 0;
      keyUpCalls = [];

      rtl.render(react.input({
        'id': 'root',
        'onClick': (_) => clickEventCount++,
        'onKeyUp': (react.SyntheticKeyboardEvent e) => keyUpCalls.add(e.key),
      }));

      textbox = rtl.screen.getByRole('textbox');
      expect(textbox, hasValue(''), reason: 'sanity check');
    });

    void _verifyTypeEvent({
      bool skipClick = false,
    }) {
      // Verify click event.
      expect(clickEventCount, equals(skipClick ? 0 : 1));

      // expect(calls.length, isTrue);
      // expect((calls.first as MouseEvent).ctrlKey, isTrue);
    }

    test('', () {
      rtl.UserEvent.type(textbox, 'oh hai');
      expect(textbox, hasValue('oh hai'));
      _verifyTypeEvent();
    });

    test('skipClick', () {
      // Manually focus the element since click will be skipped.
      textbox.focus();
      rtl.UserEvent.type(textbox, 'oh hai', skipClick: true);
      expect(textbox, hasValue('oh hai'));
      _verifyTypeEvent(skipClick: true);
    });

    group('skipAutoClose:', () {
      test('false (default)', () {
        rtl.UserEvent.type(textbox, 'oh {ctrl}hai');
        expect(
          textbox,
          hasValue('oh '),
          reason:
              'ctrl modifier key stops input from recieving the remaining characters',
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
        rtl.UserEvent.type(textbox, 'oh {ctrl}hai', skipAutoClose: true);
        expect(
          textbox,
          hasValue('oh '),
          reason:
              'ctrl modifier key stops input from recieving the remaining characters',
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

    // group('initialSelectionStart and initialSelectionEnd', () {
    //   test('when they are the same number', () {});
    //
    //   test('when some text is selected', () {
    //     rtl.UserEvent.type(textbox, 'this is a bad example');
    //     // Sanity check.
    //     expect(textbox, hasValue('this is a bad example'));
    //
    //     rtl.UserEvent.type(textbox, 'good', initialSelectionStart: 10, initialSelectionEnd: 13);
    //     expect(textbox, hasValue('this is a good example'));
    //   });
    // });

    // TODO: fix [rtl.UserEvent.typeWithDelay] because longer strings take way longer than 1 millisecond per letter
    // group('typeWithDelay', () {
    //   test('', () async {
    //     await rtl.UserEvent.typeWithDelay(textbox, 'hi', 1);
    //     await rtl.waitFor(() => expect(textbox, hasValue('hi')));
    //   });
    // });
  });
}

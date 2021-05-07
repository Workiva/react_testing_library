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

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

main() {
  group('UserEvent.type', () {
    group('in InputElement', () {
      _typeTestHelper();
    });

    group('in TextAreaElement', () {
      _typeTestHelper(isTextArea: true);
    });
  });

  group('UserEvent.typeWithDelay', () {
    group('in InputElement', () {
      _typeTestHelper(hasDelay: true);
    });

    group('in TextAreaElement', () {
      _typeTestHelper(hasDelay: true, isTextArea: true);
    });
  });
}

void _typeTestHelper({bool hasDelay = false, bool isTextArea = false}) {
  int clickEventCount;
  Element element;
  List<String> keyUpCalls;
  rtl.RenderResult renderedResult;

  void _verifyTypeEvent({
    bool skipClick = false,
  }) {
    // Verify click event.
    expect(clickEventCount, equals(skipClick ? 0 : 1));
  }

  Future<void> _verifyTypeWithDelay(
    String text,
    int delay, {
    bool skipClick = false,
    bool skipAutoClose = false,
    int initialSelectionStart,
    int initialSelectionEnd,
    int charsTyped,
  }) async {
    charsTyped ??= text.length;
    final timer = Stopwatch();
    timer.start();
    await UserEvent.typeWithDelay(
      element,
      text,
      Duration(milliseconds: delay),
      skipClick: skipClick,
      skipAutoClose: skipAutoClose,
      initialSelectionStart: initialSelectionStart,
      initialSelectionEnd: initialSelectionEnd,
    );
    timer.stop();
    expect(
      timer.elapsedMilliseconds,
      greaterThan((charsTyped - 1) * delay),
      reason: 'there should be a ${delay} ms delay between each letter typed',
    );
    expect(
      timer.elapsedMilliseconds,
      lessThan((charsTyped - 1) * (delay + 10)),
      reason: 'it should take less time than a delay of ${delay + 10} ms',
    );
  }

  group('', () {
    setUp(() {
      clickEventCount = 0;
      keyUpCalls = [];

      renderedResult = rtl.render((isTextArea ? react.textarea : react.input)({
        'id': 'root',
        'onClick': (_) => clickEventCount++,
        'onKeyUp': (react.SyntheticKeyboardEvent e) => keyUpCalls.add(e.key),
      }) as ReactElement);

      element = renderedResult.getByRole('textbox');
      expect(element, hasValue(''), reason: 'sanity check');
    });

    if (hasDelay) {
      test('with a short delay', () async {
        await _verifyTypeWithDelay('hello world!', 10);
        expect(element, hasValue('hello world!'));
        _verifyTypeEvent();
      });

      test('with a longer delay', () async {
        await _verifyTypeWithDelay('hello world!', 500);
        expect(element, hasValue('hello world!'));
        _verifyTypeEvent();
      });
    } else {
      test('', () {
        UserEvent.type(element, 'oh hai');
        expect(element, hasValue('oh hai'));
        _verifyTypeEvent();
      });
    }

    test('skipClick', () async {
      // Manually focus the element since click will be skipped.
      element.focus();
      hasDelay
          ? await _verifyTypeWithDelay('hello world!', 50, skipClick: true)
          : UserEvent.type(element, 'hello world!', skipClick: true);
      expect(element, hasValue('hello world!'));
      _verifyTypeEvent(skipClick: true);
    });

    group('skipAutoClose:', () {
      test('false (default)', () async {
        if (hasDelay) {
          // Specify the number of characters that will be typed since it's
          // different than the length of the text.
          await _verifyTypeWithDelay('oh {ctrl}hai', 50, charsTyped: 7);
        } else {
          UserEvent.type(element, 'oh {ctrl}hai');
        }
        expect(
          element,
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

      test('true', () async {
        if (hasDelay) {
          // Specify the number of characters that will be typed since it's
          // different than the length of the text.
          await _verifyTypeWithDelay(
            'oh {ctrl}hai',
            50,
            charsTyped: 7,
            skipAutoClose: true,
          );
        } else {
          UserEvent.type(element, 'oh {ctrl}hai', skipAutoClose: true);
        }
        expect(
          element,
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
    // ignore: unused_element
    void _setSelectionRangeOnElement(int start, int end) {
      if (element is InputElement) {
        (element as InputElement).setSelectionRange(start, end);
      } else if (element is TextAreaElement) {
        (element as TextAreaElement).setSelectionRange(start, end);
      }
    }

    setUp(() {
      clickEventCount = 0;
      keyUpCalls = [];

      renderedResult = rtl.render((isTextArea ? react.textarea : react.input)({
        'id': 'root',
        'onClick': (_) => clickEventCount++,
        'onKeyUp': (react.SyntheticKeyboardEvent e) => keyUpCalls.add(e.key),
        'defaultValue': 'this is a bad example',
      }) as ReactElement);

      element = renderedResult.getByRole('textbox');
      expect(element, hasValue('this is a bad example'),
          reason: 'sanity check');
    });

    // Typing in a non-empty <textarea> does not currently work as expected due to a bug in the user-event library.
    // TODO: Remove this check when https://github.com/testing-library/user-event/issues/677 is fixed.
    if(!isTextArea) {
      test('', () async {
        hasDelay
            ? await _verifyTypeWithDelay('good', 50)
            : UserEvent.type(element, 'good');
        expect(element, hasValue('this is a bad examplegood'));
        _verifyTypeEvent();
      });
    }

    // Typing with a selection range does not currently work as expected due to a bug in the user-event library.
    // TODO: Uncomment these tests when https://github.com/testing-library/user-event/issues/677 is fixed.
    // test('with setSelectionRange', () async {
    //   _setSelectionRangeOnElement(10, 13);
    //   hasDelay
    //       ? await _verifyTypeWithDelay('good', 50)
    //       : UserEvent.type(element, 'good');
    //   expect(element, hasValue('this is a good example'));
    //   _verifyTypeEvent();
    // });
    //
    // test('with setSelectionRange set to zero', () async {
    //   _setSelectionRangeOnElement(0, 0);
    //   if (hasDelay) {
    //     await _verifyTypeWithDelay(
    //       'good',
    //       50,
    //       initialSelectionStart: 0,
    //       initialSelectionEnd: 0,
    //     );
    //   } else {
    //     UserEvent.type(
    //       element,
    //       'good',
    //       initialSelectionStart: 0,
    //       initialSelectionEnd: 0,
    //     );
    //   }
    //   expect(element, hasValue('goodthis is a bad example'));
    //   _verifyTypeEvent();
    // });
  });
}

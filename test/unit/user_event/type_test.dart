// @dart=2.7
// ^ Do not remove until migrated to null safety. More info at https://wiki.atl.workiva.net/pages/viewpage.action?pageId=189370832
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

void main() {
  group('UserEvent.type', () {
    group('in InputElement', _typeTestHelper);

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
  },
      // Retry delay tests because focus could have been taken away from the
      // element being typed on as a result of tests being run concurrently.
      retry: 10);

  group('UserEvent.keyboard', _keyboardTestHelper);

  group('UserEvent.keyboardWithDelay', () {
    _keyboardTestHelper(hasDelay: true);
  },
      // Retry delay tests because focus could have been taken away from the
      // element being typed on as a result of tests being run concurrently.
      retry: 10);
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
    // ignore: cascade_invocations
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
      greaterThanOrEqualTo((charsTyped - 1) * delay),
      reason: 'there should be a $delay ms delay between each letter typed',
    );
  }

  group('', () {
    setUp(() {
      clickEventCount = 0;
      keyUpCalls = [];

      renderedResult = rtl.render((isTextArea ? react.textarea : react.input)({
        'id': 'root',
        'onClick': (_) => clickEventCount++,
        'onKeyUp': (e) => keyUpCalls.add((e as react.SyntheticKeyboardEvent).key),
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
          reason: 'ctrl modifier key stops input from receiving the remaining characters',
        );
        expect(
          keyUpCalls.last,
          equals('Control'),
          reason: 'ctrl modifier key will be closed at the end of the type event',
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
          reason: 'ctrl modifier key stops input from receiving the remaining characters',
        );
        expect(
          keyUpCalls.last,
          equals('i'),
          reason: 'ctrl modifier key will be closed at the end of the type event',
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
        'onKeyUp': (e) => keyUpCalls.add((e as react.SyntheticKeyboardEvent).key),
        'defaultValue': 'this is a bad example',
      }) as ReactElement);

      element = renderedResult.getByRole('textbox');
      expect(element, hasValue('this is a bad example'), reason: 'sanity check');
    });

    test('', () async {
      hasDelay ? await _verifyTypeWithDelay('good', 50) : UserEvent.type(element, 'good');
      expect(element, hasValue('this is a bad examplegood'));
      _verifyTypeEvent();
    });

    test('with setSelectionRange', () async {
      _setSelectionRangeOnElement(10, 13);
      hasDelay ? await _verifyTypeWithDelay('good', 50) : UserEvent.type(element, 'good');
      expect(element, hasValue('this is a good example'));
      _verifyTypeEvent();
    });

    test('with setSelectionRange set to zero', () async {
      _setSelectionRangeOnElement(0, 0);
      if (hasDelay) {
        await _verifyTypeWithDelay(
          'good',
          50,
          initialSelectionStart: 0,
          initialSelectionEnd: 0,
        );
      } else {
        UserEvent.type(
          element,
          'good',
          initialSelectionStart: 0,
          initialSelectionEnd: 0,
        );
      }
      expect(element, hasValue('goodthis is a bad example'));
      _verifyTypeEvent();
    });
  });
}

void _keyboardTestHelper({bool hasDelay = false}) {
  List<String> calls;
  rtl.RenderResult renderedResult;
  InputElement input;

  setUp(() {
    calls = [];
  });

  Future<KeyboardState> _verifyKeyboardWithDelay(
    String text,
    int delay, {
    KeyboardState keyboardState,
    List<Map> keyboardMap,
    int charsTyped,
  }) async {
    charsTyped ??= text.length;
    final timer = Stopwatch();
    // ignore: cascade_invocations
    timer.start();
    final returnValue = await UserEvent.keyboardWithDelay(
      text,
      Duration(milliseconds: delay),
      keyboardState: keyboardState,
      keyboardMap: keyboardMap,
    );
    timer.stop();
    expect(
      timer.elapsedMilliseconds,
      greaterThanOrEqualTo((charsTyped - 1) * delay),
      reason: 'there should be a $delay ms delay between each char typed',
    );
    return returnValue;
  }

  setUp(() {
    final elementToRender = react.input({
      'onKeyDown': (e) {
        final event = e as react.SyntheticKeyboardEvent;
        calls.add('keyDown: ${event.key}${event.shiftKey ? ' {shift}' : ''}');
      },
      'onKeyUp': (e) {
        final event = e as react.SyntheticKeyboardEvent;
        calls.add('keyUp: ${event.key}${event.shiftKey ? ' {shift}' : ''}');
      },
    });

    renderedResult = rtl.render(elementToRender as ReactElement);
    input = renderedResult.getByRole('textbox');
    expect(input, hasValue(''));
  });

  if (hasDelay) {
    test('with a short delay', () async {
      input.focus();
      await _verifyKeyboardWithDelay('hello world!', 10);
      expect(input, hasValue('hello world!'));
    });

    test('with a longer delay', () async {
      input.focus();
      await _verifyKeyboardWithDelay('hello world!', 500);
      expect(input, hasValue('hello world!'));
    });
  } else {
    test('', () {
      input.focus();
      UserEvent.keyboard('oh hai');
      expect(input, hasValue('oh hai'));
    });
  }

  test('brackets as escape characters', () async {
    const text = '{{a[[';
    input.focus();
    hasDelay ? await _verifyKeyboardWithDelay(text, 50, charsTyped: 3) : UserEvent.keyboard(text);
    expect(input, hasValue('{a['));
  });

  test('KeyboardEvent.key', () async {
    const text = '{Shift}{f}{o}{o}';
    input.focus();
    hasDelay ? await _verifyKeyboardWithDelay(text, 50, charsTyped: 4) : UserEvent.keyboard(text);
    expect(input, hasValue('foo'));
  });

  test('KeyboardEvent.code', () async {
    const text = '[ShiftLeft][KeyF][KeyO][KeyO]';
    input.focus();
    hasDelay ? await _verifyKeyboardWithDelay(text, 50, charsTyped: 4) : UserEvent.keyboard(text);
    expect(input, hasValue('foo'));
  });

  test('KeyboardEvent.key', () async {
    const text = '{Shift}{f}{o}{o}';
    input.focus();
    hasDelay ? await _verifyKeyboardWithDelay(text, 50, charsTyped: 4) : UserEvent.keyboard(text);
    expect(input, hasValue('foo'));
  });

  group('KeyboardState', () {
    const text1 = '[ShiftRight>]';
    const text2 = 'F[/ShiftRight]';

    test('two keyboard events back to back without setting state', () async {
      input.focus();
      hasDelay ? await _verifyKeyboardWithDelay(text1, 50, charsTyped: 1) : UserEvent.keyboard(text1);
      hasDelay ? await _verifyKeyboardWithDelay(text2, 50, charsTyped: 2) : UserEvent.keyboard(text2);
      expect(input, hasValue('F'));
      expect(
          calls,
          equals([
            'keyDown: Shift {shift}',
            'keyDown: F', // Does not have shift pressed because previous state does not persist.
            'keyUp: F',
          ]));
    });

    test('two keyboard events back to back with setting state', () async {
      input.focus();
      final state = hasDelay ? await _verifyKeyboardWithDelay(text1, 50, charsTyped: 1) : UserEvent.keyboard(text1);
      hasDelay
          ? await _verifyKeyboardWithDelay(text2, 50, keyboardState: state, charsTyped: 2)
          : UserEvent.keyboard(text2, keyboardState: state);
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

  test('keyboardMap', () async {
    const text = '[KeyA]';
    final keyboardMap = [
      {'code': 'KeyA', 'key': 'z'},
    ];
    input.focus();
    hasDelay
        ? await _verifyKeyboardWithDelay(text, 50, keyboardMap: keyboardMap, charsTyped: 1)
        : UserEvent.keyboard(text, keyboardMap: keyboardMap);
    expect(input, hasValue('z'));
  });
}

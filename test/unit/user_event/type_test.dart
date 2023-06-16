// @dart = 2.18

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

import '../util/event_handler_error.dart';
import '../util/exception.dart';
import '../util/over_react_stubs.dart';

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
      // Run delay tests by themselves because focus could be taken away from the
      // element being typed on as a result of tests being run concurrently.
      tags: 'run-alone');

  group('UserEvent.keyboard', _keyboardTestHelper);

  group('UserEvent.keyboardWithDelay', () {
    _keyboardTestHelper(hasDelay: true);
  },
      // Run delay tests by themselves because focus could be taken away from the
      // element being typed on as a result of tests being run concurrently.
      tags: 'run-alone');
}

void _typeTestHelper({bool hasDelay = false, bool isTextArea = false}) {
  late int clickEventCount;
  late Element element;
  late List<String> keyUpCalls;
  late rtl.RenderResult view;

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
    int? initialSelectionStart,
    int? initialSelectionEnd,
    int? charsTyped,
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

      view = rtl.render((isTextArea ? react.textarea : react.input)({
        'id': 'root',
        'onClick': (_) => clickEventCount++,
        'onKeyUp': (e) => keyUpCalls.add((e as react.SyntheticKeyboardEvent).key),
      }) as ReactElement);

      element = view.getByRole('textbox');
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

  group('', () {
    testEventHandlerErrors(
      ['onInput'],
      (el) => hasDelay ? UserEvent.typeWithDelay(el, 'K', Duration(hours: 500)) : UserEvent.type(el, 'K'),
      isTextArea ? react.textarea : react.input,
    );

    test('throws event handler errors that occur on delayed keystrokes', () {
      const stringToTest = 'Hello There';
      final view = rtl.render((isTextArea ? react.textarea : react.input)({
        defaultTestIdKey: 'event-handle-error-tester',
        'onKeyUp': (e) => throw ExceptionForTesting('ow'),
      }) as ReactElement);

      expect(
        () async {
          await UserEvent.typeWithDelay(
              view.getByTestId('event-handle-error-tester'), stringToTest, Duration(milliseconds: 250));
        },
        throwsA(predicate((dynamic e) {
          return e is Exception && e.toString().contains('Multiple errors (${stringToTest.length})');
        })),
      );
    });
  }, tags: 'run-alone');

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

      view = rtl.render((isTextArea ? react.textarea : react.input)({
        'id': 'root',
        'onClick': (_) => clickEventCount++,
        'onKeyUp': (e) => keyUpCalls.add((e as react.SyntheticKeyboardEvent).key),
        'defaultValue': 'this is a bad example',
      }) as ReactElement);

      element = view.getByRole('textbox');
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
  late List<String> calls;
  rtl.RenderResult view;
  late InputElement input;

  setUp(() {
    calls = [];
  });

  Future<KeyboardState> _verifyKeyboardWithDelay(
    String text,
    int delay, {
    KeyboardState? keyboardState,
    List<Map>? keyboardMap,
    int? charsTyped,
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

    view = rtl.render(elementToRender as ReactElement);
    input = view.getByRole('textbox');
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

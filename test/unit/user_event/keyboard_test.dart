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

void main() {
  group('UserEvent.keyboard', _keyboardTestHelper);

  group('UserEvent.keyboardWithDelay', () {
    _keyboardTestHelper(hasDelay: true);
  });
}

void _keyboardTestHelper({bool hasDelay = false}) {
  List<String> calls;
  rtl.RenderResult renderedResult;
  InputElement input;

  setUp(() {
    calls = [];
  });

  Future<dynamic> _verifyKeyboardWithDelay(
      String text,
      int delay, {
        dynamic keyboardState,
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
        hasDelay ? await _verifyKeyboardWithDelay(text2, 50, keyboardState: state, charsTyped: 2) : UserEvent.keyboard(text2, keyboardState: state);
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
    hasDelay ? await _verifyKeyboardWithDelay(text, 50, keyboardMap: keyboardMap, charsTyped: 1) : UserEvent.keyboard(text, keyboardMap: keyboardMap);
    expect(input, hasValue('z'));
  });
}

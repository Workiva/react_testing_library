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

import '../util/enums.dart';

// todo add tests for textarea

main() {
  group('User type events:', () {
    int clickEventCount;
    InputElement input;
    List<String> keyUpCalls;
    rtl.RenderResult renderedResult;

    void _verifyTypeEvent({
      bool skipClick = false,
    }) {
      // Verify click event.
      expect(clickEventCount, equals(skipClick ? 0 : 1));
    }

    group('UserEvent.type', () {
      group('', () {
        setUp(() {
          clickEventCount = 0;
          keyUpCalls = [];

          renderedResult = rtl.render(react.input({
            'id': 'root',
            'onClick': (_) => clickEventCount++,
            'onKeyUp': (react.SyntheticKeyboardEvent e) =>
                keyUpCalls.add(e.key),
          }) as ReactElement);

          input = renderedResult.getByRole('textbox');
          expect(input, hasValue(''), reason: 'sanity check');
        });

        test('', () {
          UserEvent.type(input, 'oh hai');
          expect(input, hasValue('oh hai'));
          _verifyTypeEvent();
        });

        test('skipClick', () {
          // Manually focus the element since click will be skipped.
          input.focus();
          UserEvent.type(input, 'oh hai', skipClick: true);
          expect(input, hasValue('oh hai'));
          _verifyTypeEvent(skipClick: true);
        });

        group('skipAutoClose:', () {
          test('false (default)', () {
            UserEvent.type(input, 'oh {ctrl}hai');
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
            UserEvent.type(input, 'oh {ctrl}hai', skipAutoClose: true);
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

          renderedResult = rtl.render(react.input({
            'id': 'root',
            'onClick': (_) => clickEventCount++,
            'onKeyUp': (react.SyntheticKeyboardEvent e) =>
                keyUpCalls.add(e.key),
            'defaultValue': 'this is a bad example',
          }) as ReactElement);

          input = renderedResult.getByRole('textbox');
          expect(input, hasValue('this is a bad example'),
              reason: 'sanity check');
        });

        test('', () {
          UserEvent.type(input, 'good');
          expect(input, hasValue('this is a bad examplegood'));
          _verifyTypeEvent();
        });

        // TODO: uncomment these tests when https://jira.atl.workiva.net/browse/CPLAT-14155 is fixed.
        test('with setSelectionRange', () {
          input.setSelectionRange(10, 13);
          UserEvent.type(input, 'good');
          expect(input, hasValue('this is a good example'));
          _verifyTypeEvent();
        });

        test('with setSelectionRange set to zero', () {
          input.setSelectionRange(0, 0);
          UserEvent.type(
            input,
            'good',
            initialSelectionStart: 0,
            initialSelectionEnd: 0,
          );
          expect(input, hasValue('goodthis is a bad example'));
          _verifyTypeEvent();
        });
      });
    });

    group('UserEvent.typeWithDelay', () {
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
          input,
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
          reason:
              'there should be a ${delay} ms delay between each letter typed',
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

          renderedResult = rtl.render(react.input({
            'id': 'root',
            'onClick': (_) => clickEventCount++,
            'onKeyUp': (react.SyntheticKeyboardEvent e) =>
                keyUpCalls.add(e.key),
          }) as ReactElement);

          input = renderedResult.getByRole('textbox');
          expect(input, hasValue(''), reason: 'sanity check');
        });

        test('with a short delay', () async {
          await _verifyTypeWithDelay('hello world!', 10);
          expect(input, hasValue('hello world!'));
          _verifyTypeEvent();
        });

        test('with a longer delay', () async {
          await _verifyTypeWithDelay('hello world!', 500);
          expect(input, hasValue('hello world!'));
          _verifyTypeEvent();
        });

        test('skipClick', () async {
          // Manually focus the element since click will be skipped.
          input.focus();
          await _verifyTypeWithDelay('hello world!', 50, skipClick: true);
          expect(input, hasValue('hello world!'));
          _verifyTypeEvent(skipClick: true);
        });

        group('skipAutoClose:', () {
          test('false (default)', () async {
            // Specify the number of characters that will be typed since it's
            // different than the length of the text.
            await _verifyTypeWithDelay('oh {ctrl}hai', 50, charsTyped: 7);
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

          test('true', () async {
            // Specify the number of characters that will be typed since it's
            // different than the length of the text.
            await _verifyTypeWithDelay(
              'oh {ctrl}hai',
              50,
              charsTyped: 7,
              skipAutoClose: true,
            );
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

          renderedResult = rtl.render(react.input({
            'id': 'root',
            'onClick': (_) => clickEventCount++,
            'onKeyUp': (react.SyntheticKeyboardEvent e) =>
                keyUpCalls.add(e.key),
            'defaultValue': 'this is a bad example',
          }) as ReactElement);

          input = renderedResult.getByRole('textbox');
          expect(input, hasValue('this is a bad example'),
              reason: 'sanity check');
        });

        test('', () async {
          await _verifyTypeWithDelay('good', 50);
          expect(input, hasValue('this is a bad examplegood'));
          _verifyTypeEvent();
        });

        // TODO: uncomment these tests when https://jira.atl.workiva.net/browse/CPLAT-14155 is fixed.
        test('with setSelectionRange', () async {
          input.setSelectionRange(10, 13);
          await _verifyTypeWithDelay('good', 50);
          expect(input, hasValue('this is a good example'));
          _verifyTypeEvent();
        });

        test('with setSelectionRange set to zero', () async {
          input.setSelectionRange(0, 0);
          await _verifyTypeWithDelay(
            'good',
            50,
            initialSelectionStart: 0,
            initialSelectionEnd: 0,
          );
          expect(input, hasValue('goodthis is a bad example'));
          _verifyTypeEvent();
        });
      });
    });
  });
}

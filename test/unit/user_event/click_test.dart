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
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../util/event_handler_error.dart';

void main() {
  group('User click events:', () {
    List<Event> calls;
    int hoverEventCount;
    rtl.RenderResult view;

    setUp(() {
      calls = [];
      hoverEventCount = 0;

      final elementToRender = react.button({
        'id': 'root',
        'onClick': (event) {
          calls.add((event as react.SyntheticMouseEvent).nativeEvent as MouseEvent);
        },
        // Count mouseover events to find out how many hover events occur.
        'onMouseOver': (_) => hoverEventCount++,
      }, 'oh hai');

      view = rtl.render(elementToRender as ReactElement);
    });

    group('UserEvent.click', () {
      void _verifyClickEvent({
        bool hasEventInit = false,
        bool skipHover = false,
        int clickCount = 0,
      }) {
        // Sanity check.
        expect(calls, hasLength(1));
        expect(calls.single, isA<MouseEvent>());
        final event = calls.single as MouseEvent;

        // Verify initial MouseEvent.
        expect(event.shiftKey, hasEventInit);

        // Verify hover event.
        expect(hoverEventCount, equals(skipHover ? 0 : 1));

        // Verify click count was incremented.
        expect(event.detail, equals(clickCount + 1));
      }

      test('', () {
        UserEvent.click(view.getByRole('button'));
        _verifyClickEvent();
      });

      test('eventInit', () {
        UserEvent.click(
          view.getByRole('button'),
          eventInit: {'shiftKey': true},
        );
        _verifyClickEvent(hasEventInit: true);
      });

      test('skipHover', () {
        UserEvent.click(
          view.getByRole('button'),
          skipHover: true,
        );
        _verifyClickEvent(skipHover: true);
      });

      test('clickCount', () {
        const clickCount = 5;
        UserEvent.click(
          view.getByRole('button'),
          clickCount: clickCount,
        );
        _verifyClickEvent(clickCount: clickCount);
      });

      test('skipPointerEventsCheck', () {
        var wasClicked = false;

        // Render into a local view because there isn't a great
        // way to test pointer events with shared test logic
        final localView = rtl.render(react.button({
          'data-test-id': 'the-local-button',
          'style': {'pointerEvents': 'none'},
          'onClick': (_) {
            wasClicked = true;
          }
        }, 'oh hai') as ReactElement);

        UserEvent.click(
          localView.getByTestId('the-local-button'),
          skipPointerEventsCheck: true,
        );

        expect(wasClicked, isTrue);
      });

      testEventHandlerErrors(
        ['onClick'],
        UserEvent.click,
        react.button,
        children: 'click then on uip',
      );
    });

    group('UserEvent.dblClick', () {
      void _verifyDblClickEvent({bool hasEventInit = false}) {
        // Sanity check.
        expect(calls, hasLength(2));
        for (final event in calls) {
          expect(event, isA<MouseEvent>());

          // Verify initial MouseEvent.
          expect((event as MouseEvent).shiftKey, hasEventInit);
        }

        // Verify click count was incremented twice.
        expect((calls.first as MouseEvent).detail, equals(1));
        expect((calls[1] as MouseEvent).detail, equals(2));

        // Verify hover event only happens once.
        expect(hoverEventCount, equals(1));
      }

      test('', () {
        UserEvent.dblClick(view.getByRole('button'));
        _verifyDblClickEvent();
      });

      test('eventInit', () {
        UserEvent.dblClick(
          view.getByRole('button'),
          eventInit: {'shiftKey': true},
        );
        _verifyDblClickEvent(hasEventInit: true);
      });

      test('skipPointerEventsCheck', () {
        var wasClicked = false;

        // Render into a local view because there isn't a great
        // way to test pointer events with shared test logic
        final localView = rtl.render(react.button({
          'data-test-id': 'the-local-button',
          'style': {'pointerEvents': 'none'},
          'onDoubleClick': (_) {
            wasClicked = true;
          }
        }, 'oh hai') as ReactElement);

        UserEvent.dblClick(
          localView.getByTestId('the-local-button'),
          skipPointerEventsCheck: true,
        );

        expect(wasClicked, isTrue);
      });

      testEventHandlerErrors(
        ['onDoubleClick'],
        UserEvent.dblClick,
        react.button,
        children: 'That was SKABGJ',
      );
    });
  });
}

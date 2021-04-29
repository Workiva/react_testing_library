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
import 'package:test/test.dart';

main() {
  group('User click events:', () {
    List<Event> calls;
    int hoverEventCount;
    rtl.RenderResult renderedResult;

    setUp(() {
      calls = [];
      hoverEventCount = 0;

      final elementToRender = react.button({
        'id': 'root',
        'onClick': (react.SyntheticMouseEvent event) {
          calls.add(event.nativeEvent);
        },
        // Count mouseover events to find out how many hover events occur.
        'onMouseOver': (_) => hoverEventCount++,
      }, 'oh hai');

      renderedResult = rtl.render(elementToRender);
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
        rtl.UserEvent.click(renderedResult.getByRole('button'));
        _verifyClickEvent();
      });

      test('eventInit', () {
        rtl.UserEvent.click(
          renderedResult.getByRole('button'),
          eventInit: {'shiftKey': true},
        );
        _verifyClickEvent(hasEventInit: true);
      });

      test('skipHover', () {
        rtl.UserEvent.click(
          renderedResult.getByRole('button'),
          skipHover: true,
        );
        _verifyClickEvent(skipHover: true);
      });

      test('clickCount', () {
        final clickCount = 5;
        rtl.UserEvent.click(
          renderedResult.getByRole('button'),
          clickCount: clickCount,
        );
        _verifyClickEvent(clickCount: clickCount);
      });
    });

    group('UserEvent.dblClick', () {
      void _verifyDblClickEvent({bool hasEventInit = false}) {
        // Sanity check.
        expect(calls, hasLength(2));
        calls.forEach((event) {
          expect(event, isA<MouseEvent>());

          // Verify initial MouseEvent.
          expect((event as MouseEvent).shiftKey, hasEventInit);
        });

        // Verify click count was incremented twice.
        expect((calls.first as MouseEvent).detail, equals(1));
        expect((calls[1] as MouseEvent).detail, equals(2));

        // Verify hover event only happens once.
        expect(hoverEventCount, equals(1));
      }

      test('', () {
        rtl.UserEvent.dblClick(renderedResult.getByRole('button'));
        _verifyDblClickEvent();
      });

      test('eventInit', () {
        rtl.UserEvent.dblClick(
          renderedResult.getByRole('button'),
          eventInit: {'shiftKey': true},
        );
        _verifyDblClickEvent(hasEventInit: true);
      });
    });
  });
}

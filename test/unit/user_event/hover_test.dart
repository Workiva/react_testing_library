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

import 'package:react/hooks.dart' show useState;
import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

void main() {
  group('UserEvent.hover and UserEvent.unhover', () {
    List<MouseEvent> calls;
    rtl.RenderResult renderedResult;

    setUp(() {
      calls = [];

      final HoverTestComponent = react.registerFunctionComponent((props) {
        final isShown = useState(false);
        return react.div({}, [
          react.button({
            'onMouseOver': (e) {
              isShown.set(true);
              calls.add((e as react.SyntheticMouseEvent).nativeEvent as MouseEvent);
            },
            'onMouseOut': (e) {
              isShown.set(false);
              calls.add((e as react.SyntheticMouseEvent).nativeEvent as MouseEvent);
            }
          }, [
            'Hover over me!'
          ]),
          if (isShown.value) react.span({}, ['Hello!']) else null,
        ]);
      });

      renderedResult = rtl.render(react.div({}, [HoverTestComponent({})]) as ReactElement);
      // Sanity check.
      expect(renderedResult.queryByText('Hello!'), isNull);
    });

    void _verifyHoverEvent({
      bool hasEventInit = false,
    }) {
      // Verify mouse events.
      expect(calls, hasLength(2));
      for (final event in calls) {
        expect(event.shiftKey, hasEventInit);
      }
    }

    test('', () {
      UserEvent.hover(renderedResult.getByRole('button'));
      expect(renderedResult.getByText('Hello!'), isInTheDocument);
      UserEvent.unhover(renderedResult.getByRole('button'));
      expect(renderedResult.queryByText('Hello!'), isNull);
      _verifyHoverEvent();
    });

    test('eventInit', () {
      UserEvent.hover(
        renderedResult.getByRole('button'),
        eventInit: {'shiftKey': true},
      );
      expect(renderedResult.getByText('Hello!'), isInTheDocument);
      UserEvent.unhover(
        renderedResult.getByRole('button'),
        eventInit: {'shiftKey': true},
      );
      expect(renderedResult.queryByText('Hello!'), isNull);
      _verifyHoverEvent(hasEventInit: true);
    });
  });
}

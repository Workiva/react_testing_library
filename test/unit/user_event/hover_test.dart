
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
import 'package:react/react_client.dart' show ReactDartFunctionComponentFactoryProxy, ReactElement;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../util/event_handler_error.dart';

void main() {
  group('UserEvent.hover and UserEvent.unhover', () {
    List<MouseEvent> calls;
    rtl.RenderResult view;

    setUp(() {
      calls = [];
      view = rtl.render(react.div({}, [
        HoverTestComponent({'calls': calls})
      ]) as ReactElement);
      // Sanity check.
      expect(view.queryByText('Hello!'), isNull);
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
      UserEvent.hover(view.getByRole('button'));
      expect(view.getByText('Hello!'), isInTheDocument);

      UserEvent.unhover(view.getByRole('button'));
      expect(view.queryByText('Hello!'), isNull);
      _verifyHoverEvent();
    });

    test('eventInit', () {
      UserEvent.hover(
        view.getByRole('button'),
        eventInit: {'shiftKey': true},
      );
      expect(view.getByText('Hello!'), isInTheDocument);

      UserEvent.unhover(
        view.getByRole('button'),
        eventInit: {'shiftKey': true},
      );
      expect(view.queryByText('Hello!'), isNull);
      _verifyHoverEvent(hasEventInit: true);
    });

    test('skipPointerEventsCheck', () {
      view.rerender(react.div({
        'style': {'pointerEvents': 'none'}
      }, [
        HoverTestComponent({'calls': calls})
      ]) as ReactElement);

      UserEvent.hover(view.getByRole('button'), skipPointerEventsCheck: true);
      expect(view.getByText('Hello!'), isInTheDocument);

      UserEvent.unhover(view.getByRole('button'), skipPointerEventsCheck: true);
      expect(view.queryByText('Hello!'), isNull);
    });

    testEventHandlerErrors(
      ['onMouseOver', 'onMouseOut'],
      UserEvent.hover,
      react.button,
      children: 'well hello there',
    );
  });
}

ReactDartFunctionComponentFactoryProxy HoverTestComponent = react.registerFunctionComponent((props) {
  final isShown = useState(false);
  return react.div({}, [
    react.button({
      'onMouseOver': (e) {
        isShown.set(true);
        props['calls'].add((e as react.SyntheticMouseEvent).nativeEvent as MouseEvent/*!*/);
      },
      'onMouseOut': (e) {
        isShown.set(false);
        props['calls'].add((e as react.SyntheticMouseEvent).nativeEvent as MouseEvent/*!*/);
      }
    }, [
      'Hover over me!'
    ]),
    if (isShown.value) react.span({}, ['Hello!']) else null,
  ]);
});

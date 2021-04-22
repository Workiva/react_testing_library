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

import '../util/matchers.dart';

main() {
  group('', () {
    List<Event> calls;
    rtl.RenderResult renderedResult;

    setUp(() {
      calls = [];
      final elementToRender = react.button({
        'id': 'root',
        'onClick': (react.SyntheticMouseEvent event) {
          calls.add(event.nativeEvent);
        }
      }, 'oh hai');
      renderedResult = rtl.render(elementToRender);
    });

    test('fireEvent() fires the provided event on the provided element when called', () {
      final event = MouseEvent('click');
      rtl.fireEvent(renderedResult.getByRole('button'), event);
      expect(calls, hasLength(1));
      expect(calls.single, same(event));
    });

    test(
        'fireEventByName() fires the event specified by name '
        'with the specified eventProperties on the provided element when called', () {
      rtl.fireEventByName('click', renderedResult.getByRole('button'), {
        'shiftKey': true,
      });
      expect(calls, hasLength(1));
      expect(calls.single, isA<MouseEvent>());
      expect((calls.single as MouseEvent).shiftKey, isTrue);
    });

    test('fireEventByName() throws when an invalid eventName is provided', () {
      expect(
          () => rtl.fireEventByName('definitelyNotValid', renderedResult.getByRole('button'), {
                'shiftKey': true,
              }),
          throwsA(allOf(
            isA<ArgumentError>(),
            hasToStringValue(contains('Invalid argument (eventName): "definitelyNotValid"')),
          )));
    });
  });
}

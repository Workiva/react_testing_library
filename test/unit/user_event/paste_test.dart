
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

import '../util/event_handler_error.dart';

void main() {
  group('UserEvent.paste', () {
    late List<ClipboardEvent> calls;
    rtl.RenderResult view;
    InputElement input;

    setUp(() {
      calls = [];
    });

    void _verifyPasteEvent({bool hasEventInit = false}) {
      // Verify initial clipboard event.
      expect(calls, hasLength(1));
      expect(calls.single.cancelable, !hasEventInit);
    }

    group('', () {
      setUp(() {
        final elementToRender = react.input({
          'onPaste': (event) {
            calls.add((event as react.SyntheticClipboardEvent).nativeEvent as ClipboardEvent);
          },
        });

        view = rtl.render(elementToRender as ReactElement);
        input = view.getByRole('textbox');
        expect(input, hasValue(''));
      });

      test('', () {
        UserEvent.paste(input, 'hello');
        expect(input, hasValue('hello'));
        _verifyPasteEvent();
      });

      test('eventInit', () {
        UserEvent.paste(input, 'hello', eventInit: {'cancelable': false});
        expect(input, hasValue('hello'));
        _verifyPasteEvent(hasEventInit: true);
      });
    });

    group('with default value in the input', () {
      setUp(() {
        final elementToRender = react.input({
          'onPaste': (event) {
            calls.add((event as react.SyntheticClipboardEvent).nativeEvent as ClipboardEvent);
          },
          'defaultValue': 'this is a bad example',
        });

        view = rtl.render(elementToRender as ReactElement);
        input = view.getByRole('textbox');
        expect(input, hasValue('this is a bad example'));
      });

      test('', () {
        UserEvent.paste(input, 'good');
        expect(input, hasValue('this is a bad examplegood'));
        _verifyPasteEvent();
      });

      test('with setSelectionRange', () {
        input.setSelectionRange(10, 13);
        UserEvent.paste(input, 'good');
        expect(input, hasValue('this is a good example'));
        _verifyPasteEvent();
      });

      test('with setSelectionRange set to zero', () {
        input.setSelectionRange(0, 0);
        UserEvent.paste(
          input,
          'good',
          initialSelectionStart: 0,
          initialSelectionEnd: 0,
        );
        expect(input, hasValue('goodthis is a bad example'));
        _verifyPasteEvent();
      });
    });

    testEventHandlerErrors(
      ['onPaste'],
      (el) => UserEvent.paste(el, 'something!'),
      react.input,
    );
  });
}

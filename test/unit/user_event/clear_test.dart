// @dart = 2.12

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
  group('UserEvent.clear', () {
    test('on an InputElement', () {
      final view = rtl.render(react.input({
        'defaultValue': 'Hello, World!',
      }) as ReactElement);
      final input = view.getByRole('textbox') as InputElement;
      UserEvent.clear(input);
      expect(input, hasValue(''));
    });

    test('on an TextAreaElement', () {
      final view = rtl.render(react.textarea({
        'defaultValue': 'Hello, World!',
      }) as ReactElement);
      final textarea = view.getByRole('textbox') as TextAreaElement;
      expect(textarea, hasValue('Hello, World!'), reason: 'sanity check');
      UserEvent.clear(textarea);
      expect(textarea, hasValue(''));
    });

    testEventHandlerErrors(
      ['onChange'],
      UserEvent.clear,
      react.input,
      additionalProps: {'defaultValue': 'Aaron told Sydney, Joe, Brian, and Greg that Keal is awesome. They agreed.'},
    );
  });
}

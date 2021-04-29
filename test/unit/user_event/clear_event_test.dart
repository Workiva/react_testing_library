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
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  group('UserEvent.clear', () {
    test('on an InputElement', () async {
      final renderedResult = rtl.render(react.input(
          {'defaultValue': 'Hello, World!',}));
      final input = renderedResult.getByRole('textbox') as InputElement;
      rtl.UserEvent.clear(input);
      expect(input, hasValue(''));
    });

    test('on an TextAreaElement', () {
      final renderedResult = rtl.render(react.textarea(
          {'defaultValue': 'Hello, World!',}));
      final textarea = renderedResult.getByRole('textbox') as TextAreaElement;
      expect(textarea, hasValue('Hello, World!'), reason: 'sanity check');
      rtl.UserEvent.clear(textarea);
      expect(textarea, hasValue(''));
    });
  });
}

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
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

void main() {
  // TODO: add tests for arrowdown, arrowup, and esc
  // The arrowLeft, arrowRight, enter, end, and selectAll special chars do not currently work as expected due to a bug in the user-event library.
  // TODO: Uncomment those tests when https://github.com/testing-library/user-event/issues/677 is fixed.
  group('SpecialChars', () {
    InputElement input;
    TextAreaElement textArea;

    setUp(() {
      rtl.render(react.div({}, [
        react.input({
          'defaultValue': 'oh hai',
        }),
        react.textarea({
          'defaultValue': 'hello\n\nthere!',
        }),
      ]) as ReactElement);

      input = rtl.screen.getAllByRole('textbox').first as InputElement;
      textArea = rtl.screen.getAllByRole('textbox')[1] as TextAreaElement;
      expect(input, hasValue('oh hai'), reason: 'sanity check');
      expect(textArea, hasValue('hello\n\nthere!'), reason: 'sanity check');
    });

    // test('SpecialChars.arrowLeft', () {
    //   UserEvent.type(input, '${SpecialChars.arrowLeft}${SpecialChars.arrowLeft}!!');
    //   expect(input, hasValue('oh h!!ai'));
    // });

    // test('SpecialChars.arrowRight', () {
    //   UserEvent.type(input, '${SpecialChars.arrowLeft}${SpecialChars.arrowLeft}${SpecialChars.arrowRight}!!');
    //   expect(input, hasValue('oh ha!!i'));
    // });

    // test('SpecialChars.enter', () {
    //   UserEvent.type(textArea, '${SpecialChars.enter}!!');
    //   expect(textArea, hasValue('hello\n\nthere!\n!!'));
    // });

    test('SpecialChars.delete', () {
      input.setSelectionRange(1, 1);
      UserEvent.type(input, '${SpecialChars.delete}');
      expect(input, hasValue('o hai'));
    });

    test('SpecialChars.backspace', () {
      UserEvent.type(input, '${SpecialChars.backspace}!!');
      expect(input, hasValue('oh ha!!'));
    });

    test('SpecialChars.home', () {
      UserEvent.type(input, '${SpecialChars.home}!!');
      expect(input, hasValue('!!oh hai'));
    });

    // test('SpecialChars.end', () {
    //   UserEvent.type(input, '${SpecialChars.home}#${SpecialChars.end}!!');
    //   expect(input, hasValue('#oh hai!!'));
    // });

    // test('SpecialChars.selectAll', () {
    //   UserEvent.type(input, '${SpecialChars.selectAll}!!');
    //   expect(input, hasValue('!!'));
    // });

    test('SpecialChars.space', () {
      UserEvent.type(input, '${SpecialChars.space}!!');
      expect(input, hasValue('oh hai !!'));
    });

    test('SpecialChars.whitespace', () {
      UserEvent.type(input, '${SpecialChars.whitespace}!!');
      expect(input, hasValue('oh hai !!'));
    });
  });
}

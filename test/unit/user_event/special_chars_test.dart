
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
  group('SpecialChars', () {
    late InputElement input;
    late TextAreaElement textArea;
    rtl.RenderResult view;
    late List<String> keyDownCalls;

    setUp(() {
      keyDownCalls = [];
      view = rtl.render(react.div({}, [
        react.input({
          'defaultValue': 'oh hai',
          'onKeyDown': (e) => keyDownCalls.add((e as react.SyntheticKeyboardEvent).key),
        }),
        react.textarea({
          'defaultValue': 'hello\n\nthere!',
          'onKeyDown': (e) => keyDownCalls.add((e as react.SyntheticKeyboardEvent).key),
        }),
      ]) as ReactElement);

      input = view.getAllByRole('textbox').first as InputElement;
      textArea = view.getAllByRole('textbox')[1] as TextAreaElement;
      expect(input, hasValue('oh hai'), reason: 'sanity check');
      expect(textArea, hasValue('hello\n\nthere!'), reason: 'sanity check');
    });

    test('SpecialChars.arrowLeft', () {
      UserEvent.type(input, '${SpecialChars.arrowLeft}${SpecialChars.arrowLeft}!!');
      expect(keyDownCalls, contains('ArrowLeft'));
      expect(input, hasValue('oh h!!ai'));
    });

    test('SpecialChars.arrowRight', () {
      UserEvent.type(input, '${SpecialChars.arrowLeft}${SpecialChars.arrowLeft}${SpecialChars.arrowRight}!!');
      expect(keyDownCalls, contains('ArrowRight'));
      expect(input, hasValue('oh ha!!i'));
    });

    test('SpecialChars.arrowUp', () {
      UserEvent.type(input, SpecialChars.arrowUp);
      expect(keyDownCalls, contains('ArrowUp'));
    });

    test('SpecialChars.arrowDown', () {
      UserEvent.type(input, SpecialChars.arrowDown);
      expect(keyDownCalls, contains('ArrowDown'));
    });

    test('SpecialChars.enter', () {
      UserEvent.type(textArea, '${SpecialChars.enter}!!');
      expect(keyDownCalls, contains('Enter'));
      expect(textArea, hasValue('hello\n\nthere!\n!!'));
    });

    test('SpecialChars.escape', () {
      UserEvent.type(textArea, '${SpecialChars.escape}!!');
      expect(keyDownCalls, contains('Escape'));
    });

    test('SpecialChars.delete', () {
      input.setSelectionRange(1, 1);
      UserEvent.type(input, '${SpecialChars.delete}');
      expect(keyDownCalls, contains('Delete'));
      expect(input, hasValue('o hai'));
    });

    test('SpecialChars.backspace', () {
      UserEvent.type(input, '${SpecialChars.backspace}!!');
      expect(keyDownCalls, contains('Backspace'));
      expect(input, hasValue('oh ha!!'));
    });

    test('SpecialChars.home', () {
      UserEvent.type(input, '${SpecialChars.home}!!');
      expect(keyDownCalls, contains('Home'));
      expect(input, hasValue('!!oh hai'));
    });

    test('SpecialChars.end', () {
      UserEvent.type(input, '${SpecialChars.home}#${SpecialChars.end}!!');
      expect(keyDownCalls, contains('End'));
      expect(input, hasValue('#oh hai!!'));
    });

    test('SpecialChars.selectAll', () {
      UserEvent.type(input, '${SpecialChars.selectAll}!!');
      expect(input, hasValue('!!'));
    });

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

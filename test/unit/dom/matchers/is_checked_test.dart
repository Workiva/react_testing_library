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

import 'package:react/react.dart' as react;
import 'package:react_testing_library/react_testing_library.dart' show isChecked, render;
import 'package:react_testing_library/src/util/over_react_stubs.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

main() {
  group('isChecked matcher', () {
    group('passes when provided a valid Element that can be checked - is checked:', () {
      test('CheckboxInputElement', () {
        final renderResult = render(react.input({
          'type': 'checkbox',
          'checked': true,
        }));
        shouldPass(renderResult.getByRole('checkbox'), isChecked);
      });

      test('An element with role="checkbox"', () {
        final renderResult = render(react.div({
          'role': 'checkbox',
          'aria-checked': 'true',
        }));
        shouldPass(renderResult.getByRole('checkbox'), isChecked);
      });

      test('RadioInputElement', () {
        final renderResult = render(react.input({
          'type': 'radio',
          'name': 'something',
          'checked': true,
        }));
        shouldPass(renderResult.getByRole('radio'), isChecked);
      });

      test('An element with role="radio"', () {
        final renderResult = render(react.div({
          'role': 'radio',
          'aria-checked': 'true',
        }));
        shouldPass(renderResult.getByRole('radio'), isChecked);
      });

      test('An element with role="switch"', () {
        final renderResult = render(react.div({
          'role': 'switch',
          'aria-checked': 'true',
        }));
        shouldPass(renderResult.getByRole('switch'), isChecked);
      });
    });

    group('provides a useful failure message when', () {
      test('the matched item is not an element', () {
        shouldFail(null, isChecked, contains('Which: is not a valid Element.'));
      });

      group('the matched item is not a type of element that can be checked', () {
        test('', () {
          final renderResult = render(react.div({defaultTestIdKey: 'div'}));
          final divNode = renderResult.getByTestId('div');
          shouldFail(divNode, isChecked, contains('Which: is not a type of HTML element that can be checked.'));
        });
      });

      test('the matched item is not checked', () {
        final renderResult = render(react.input({
          'type': 'checkbox',
          'checked': false,
        }));
        shouldFail(renderResult.getByRole('checkbox'), isChecked, contains('Which: is not checked.'));
      });
    });
  });
}

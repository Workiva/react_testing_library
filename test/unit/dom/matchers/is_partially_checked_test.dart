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

import 'package:react_testing_library/matchers.dart' show isPartiallyChecked;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

void main() {
  group('isPartiallyChecked matcher', () {
    group('passes when provided a valid Element that can be partially checked - is partially checked:', () {
      test('CheckboxInputElement', () {
        final cboxEl = CheckboxInputElement()..indeterminate = true;
        shouldPass(cboxEl, isPartiallyChecked);
      });

      test('An element with role="checkbox"', () {
        final cboxEl = DivElement()
          ..setAttribute('role', 'checkbox')
          ..setAttribute('aria-checked', 'mixed');
        shouldPass(cboxEl, isPartiallyChecked);
      });
    });

    group('provides a useful failure message when', () {
      test('the matched item is not an element', () {
        shouldFail(null, isPartiallyChecked, contains('Which: $notAnElementMismatchDescription'));
      });

      group('the matched item is not a type of element that can be partially checked', () {
        test('', () {
          shouldFail(
              DivElement(), isPartiallyChecked, contains('Which: is not a type of HTML Element that can be checked.'));
        });
      });

      test('the matched item is not partially checked', () {
        shouldFail(CheckboxInputElement(), isPartiallyChecked, contains('Which: is not partially checked.'));
      });
    });
  });
}

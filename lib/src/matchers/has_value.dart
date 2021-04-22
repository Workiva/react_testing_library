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

import 'package:matcher/matcher.dart';
import 'package:react_testing_library/src/matchers/has_form_values.dart' show hasFormValues;
import 'package:react_testing_library/src/matchers/is_checked.dart' show isChecked;
import 'package:react_testing_library/src/matchers/util/get_value_of.dart';

/// Allows you to check whether the given form element has the specified [value].
///
/// It accepts `<input>`, `<select>` and `<textarea>` elements with the exception
/// of `<input type="checkbox">` and `<input type="radio">`, which can be meaningfully
/// matched only using [isChecked] or [hasFormValues].
///
/// For all other form elements, the value is matched using the same algorithm as [hasFormValues] does.
///
/// Similar to [jest-dom's `toHaveValue` matcher](https://github.com/testing-library/jest-dom#tohavevalue).
///
/// ### Examples
///
/// ```html
/// &lt;input type="text" value="text" data-test-id="input-text" />
/// &lt;input type="number" value="5" data-test-id="input-number" />
/// &lt;input type="text" data-test-id="input-empty" />
/// &lt;select multiple data-test-id="select-number">
///   &lt;option value="first">First Value&lt;/option>
///   &lt;option value="second" selected>Second Value&lt;/option>
///   &lt;option value="third" selected>Third Value&lt;/option>
/// &lt;/select>
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     const textInput = rtl.screen.getByTestId('input-text');
///     const numberInput = rtl.screen.getByTestId('input-number');
///     const emptyInput = rtl.screen.getByTestId('input-empty');
///     const selectInput = rtl.screen.getByTestId('select-number');
///
///     expect(textInput, hasValue('text'));
///     expect(numberInput, hasValue(5));
///     expect(emptyInput, isNot(hasValue()));
///     expect(selectInput, isNot(hasValue(['second', 'third'])));
///   });
/// }
/// ```
///
/// {@category Matchers}
Matcher hasValue([dynamic value]) => _HasValue(value);

/// Allows you to check whether the given form element has the specified displayed value
/// _(the one the end user will see)_.
///
/// Identical to [hasValue] in all cases except for `<select>`s when you want to get the
/// text content of an `<option>` instead of its `value` attribute.
Matcher hasDisplayValue([dynamic value]) =>
    _HasValue(value, getOptionValue: (option) => option.text, valueDescription: 'display value');

class _HasValue extends CustomMatcher {
  final dynamic expectedValue;
  final dynamic Function(OptionElement option) getOptionValue;

  _HasValue(this.expectedValue, {this.getOptionValue, String valueDescription = 'value'})
      : super('An element with ${expectedValue == null ? 'no $valueDescription' : 'a $valueDescription of'}', 'element',
            expectedValue);

  @override
  bool matches(item, Map matchState) {
    final itemValue = featureValueOf(item);
    if (expectedValue == null) return itemValue == null || itemValue.isEmpty;

    return super.matches(item, matchState);
  }

  @override
  dynamic featureValueOf(covariant Element element) {
    if (element is InputElement) {
      final type = element.getAttribute('type');
      if (type == 'checkbox' || type == 'radio') {
        throw ArgumentError('The _HasValue() matcher does not support checkbox / radio inputs. '
            'Use either the isChecked or hasFormValues matcher instead.');
      }
    }

    return getValueOf(element, getOptionValue: getOptionValue);
  }
}

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
import 'package:react_testing_library/src/matchers/jest_dom/has_form_values.dart' show hasFormValues;
import 'package:react_testing_library/src/matchers/jest_dom/is_checked.dart' show isChecked;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:react_testing_library/src/matchers/jest_dom/util/get_value_of.dart';

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
/// &lt;form>
///   &lt;input type="text" name="username" value="jane.doe" />
///   &lt;input type="number" name="age" value="35" />
///   &lt;input type="text" name="occupation" />
///   &lt;select multiple name="options">
///     &lt;option value="first">First Value&lt;/option>
///     &lt;option value="second" selected>Second Value&lt;/option>
///     &lt;option value="third" selected>Third Value&lt;/option>
///   &lt;/select>
/// &lt;/form>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show hasValue;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final result = rtl.render(react.form({},
///       react.input({'type': 'text', name: 'username', 'value': 'jane.doe'}),
///       react.input({'type': 'number', 'name': 'age', value: '35'}),
///       react.input({'type': 'text', 'name': 'occupation'}),
///       react.select({'multiple': true},
///         react.option({'value': 'first'}, 'First Value'),
///         react.option({'value': 'second' 'selected': true}, 'Second Value'),
///         react.option({'value': 'third', 'selected': true}, 'Third Value'),
///       ),
///     ));
///
///     // Use react_testing_library queries to store references to the node(s)
///     const textInput = result.getByRole('textbox', name: 'username');
///     const numberInput = result.getByRole('spinbutton', name: 'age');
///     const emptyInput = result.getByRole('textbox', name: 'occupation');
///     const selectInput = result.getByRole('listbox', name: 'options');
///
///     // Use the `hasValue` matcher as the second argument of `expect()`
///     expect(textInput, hasValue('jane.doe'));
///     expect(numberInput, hasValue(35));
///     expect(emptyInput, isNot(hasValue()));
///     expect(selectInput, hasValue(['second', 'third']));
///     expect(selectInput, isNot(hasValue(['first'])));
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
Matcher hasValue([dynamic value]) => _HasValue(value);

/// Allows you to check whether the given form element has the specified displayed value
/// _(the one the end user will see)_.
///
/// Identical to [hasValue] in all cases except for `<select>`s when you want to get the
/// text content of an `<option>` instead of its `value` attribute.
///
/// {@category Matchers}
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
    if (expectedValue == null) return itemValue == null || itemValue.isEmpty == true;

    return super.matches(item, matchState);
  }

  @override
  dynamic featureValueOf(item) {
    // If it's not a Element, the mismatch description will say so.
    if (item is! Element) return null;

    final element = item as Element;

    if (element is InputElement) {
      final type = element.getAttribute('type');
      if (type == 'checkbox' || type == 'radio') {
        return null;
      }
    }

    return getValueOf(element, getOptionValue: getOptionValue);
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    } else if (itemIsCheckboxOrRadioInput(item)) {
      return mismatchDescription
        ..add('is a checkbox/radio input, which cannot be used with a '
            'hasValue / hasDisplayValue matcher. Use either the isChecked or hasFormValues matcher instead.');
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose);
  }

  bool itemIsCheckboxOrRadioInput(item) {
    if (item is InputElement) {
      final type = item.getAttribute('type');
      return type == 'checkbox' || type == 'radio';
    } else if (item is Element) {
      final role = item.getAttribute('role');
      return role == 'checkbox' || role == 'radio';
    }

    return false;
  }
}

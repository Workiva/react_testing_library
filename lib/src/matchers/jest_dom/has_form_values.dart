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
import 'dart:js';

import 'package:collection/collection.dart' show IterableExtension;
import 'package:matcher/matcher.dart';
import 'package:react_testing_library/dom/debugging.dart';
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:react_testing_library/src/matchers/jest_dom/util/get_value_of.dart';
import 'package:react_testing_library/src/util/js_utils.dart';

/// Allows you to check if a [FormElement] or [FieldSetElement] contains form controls for each given name
/// in the provided [valuesMap] with the corresponding value.
///
/// This matcher abstracts away the particularities with which a form control value is obtained depending
/// on the type of form control. For instance, `<input>` elements have a value attribute, but `<select>`
/// elements do not. [Here's a list of all cases covered](https://github.com/testing-library/jest-dom#tohaveformvalues)
///
/// Similar to [jest-dom's `toHaveFormValues` matcher](https://github.com/testing-library/jest-dom#tohaveformvalues).
///
/// ## Examples
///
/// ```html
/// <form data-test-id="login-form">
///   <input type="text" name="username" value="jane.doe" />
///   <input type="number" name="age" value="35" />
///   <input type="password" name="password" value="12345678" />
///   <input type="checkbox" name="rememberMe" checked />
///   <button type="submit">Sign in</button>
/// </form>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show hasFormValues;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final view = rtl.render(react.form({'role': 'form'},
///       react.input({'type': 'text', 'name': 'username', 'value': 'jane.doe'}),
///       react.input({'type': 'number', 'name': 'age', 'value': '35'}),
///       react.input({'type': 'password', 'name': 'password', 'value': '12345678'}),
///       react.input({'type': 'checkbox', 'name': 'rememberMe', 'checked': true}),
///       react.button({'type': 'submit'}, 'Sign in'),
///     ));
///
///     // Use react_testing_library queries to store references to the node(s)
///     final form = view.getByRole('form');
///
///     // Use the `hasFormValues` matcher as the second argument of `expect()`
///     expect(form, hasFormValues({
///       'username': 'jane.doe',
///       'rememberMe': true,
///     }));
///
///     // You can also use matchers for the value
///     expect(form, hasFormValues({
///       'username': startsWith('jane'),
///       'age': greaterThan(18),
///     }));
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
Matcher hasFormValues(Map<String, dynamic> valuesMap) => _HasFormValues(valuesMap);

class _HasFormValues extends CustomMatcher {
  final Map<String, dynamic> valuesMap;

  _HasFormValues(this.valuesMap)
      : super('A form or fieldset with elements matching', 'elements',
            valuesMap.map((key, value) => MapEntry(key, wrapMatcher(value))));

  Iterable<Element> getItemFormElementsToTest(Element formElement) =>
      getFormElements(formElement).where((el) => valuesMap.containsKey(el.getAttribute('name')));

  @override
  dynamic featureValueOf(dynamic item) {
    // If it's not a FormElement, the mismatch description will say so.
    if (item is! Element) return null;

    final element = item;

    final actualNamesAndValues = <String, dynamic>{};
    valuesMap.forEach((elementNameToTest, value) {
      getItemFormElementsToTest(element).forEach((childElement) {
        final childElementName = childElement.getAttribute('name');
        if (childElementName != elementNameToTest) return;
        if (actualNamesAndValues.containsKey(childElementName)) {
          // In the case of a test for radio inputs, its possible for more than one element to have the same name.
          // However, when testing radios, we check all of them when we find the first one to get the featureValue,
          // so we don't need to loop through them again.
          return;
        }

        if (childElement is InputElement) {
          final type = childElement.getAttribute('type');
          switch (type) {
            case 'checkbox':
              final allCheckboxesWithName =
                  element.querySelectorAll('input[type="checkbox"][name="$childElementName"]');
              if (allCheckboxesWithName.length == 1) {
                actualNamesAndValues[elementNameToTest] = childElement.checked;
              } else {
                final selectedCheckboxElements =
                    allCheckboxesWithName.where((cboxEl) => (cboxEl as CheckboxInputElement).checked!);
                actualNamesAndValues[elementNameToTest] =
                    selectedCheckboxElements.map((el) => el.getAttribute('value')).toList();
              }
              break;
            case 'radio':
              final allRadiosWithName = element.querySelectorAll('input[type="radio"][name="$childElementName"]');
              final selectedRadioElement = allRadiosWithName.singleWhereOrNull(
                (radioEl) => (radioEl as RadioButtonInputElement).checked!,
              ) as RadioButtonInputElement?;
              actualNamesAndValues[elementNameToTest] = selectedRadioElement?.value;
              break;
            default:
              actualNamesAndValues[elementNameToTest] = getValueOf(childElement);
              break;
          }
        } else {
          actualNamesAndValues[elementNameToTest] = getValueOf(childElement);
        }
      });
    });

    return actualNamesAndValues;
  }

  @override
  Description describeMismatch(dynamic item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    var extraDescription = '';

    if (getItemFormElementsToTest(item).isEmpty) {
      extraDescription = '\n\nNo elements were found with names matching ${valuesMap.keys}.';
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose).add(extraDescription).add(
        // ignore: prefer_interpolation_to_compose_strings
        '\n\nThe DOM at time of failure is shown below:\n------------------------------------------\n' +
            prettyDOM(item));
  }
}

/// Returns the JS [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)
JsObject _getJsFormOrFieldSet(Element form) => JsObject.fromBrowserObject(form);

/// Returns a [List] of all of the form control [Element]s contained in a given [form].
///
/// Does not include `<input type="image">` controls.
///
/// Wraps the [HTMLFormElement.elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) property.
List<Element> getFormElements(Element form) {
  assert(form is FormElement || form is FieldSetElement);
  return convertToArray<Element>(_getJsFormOrFieldSet(form)['elements'] as JsObject?);
}

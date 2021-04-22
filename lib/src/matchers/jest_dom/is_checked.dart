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

/// Allows you to check whether the given element is `checked`.
///
/// It accepts an `input` of type `checkbox` or `radio` and elements with a `role` of `checkbox`, `radio` or `switch`
/// with a valid `aria-checked` attribute of "true" or "false".
///
/// Similar to [jest-dom's `toBeChecked` matcher](https://github.com/testing-library/jest-dom#tobechecked).
///
/// ### Examples
///
/// ```html
/// &lt;input type="checkbox" checked data-test-id="input-checkbox-checked" />
/// &lt;input type="checkbox" data-test-id="input-checkbox-unchecked" />
/// &lt;div role="checkbox" aria-checked="true" data-test-id="aria-checkbox-checked" />
/// &lt;div
///   role="checkbox"
///   aria-checked="false"
///   data-test-id="aria-checkbox-unchecked"
/// />
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     const inputCheckboxChecked = rtl.screen.getByTestId('input-checkbox-checked');
///     const inputCheckboxUnchecked = rtl.screen.getByTestId('input-checkbox-unchecked');
///     const ariaCheckboxChecked = rtl.screen.getByTestId('aria-checkbox-checked');
///     const ariaCheckboxUnchecked = rtl.screen.getByTestId('aria-checkbox-unchecked');
///     expect(inputCheckboxChecked, isChecked);
///     expect(inputCheckboxUnchecked, isNot(isChecked));
///     expect(ariaCheckboxChecked, isChecked);
///     expect(ariaCheckboxUnchecked, isNot(isChecked));
///
///     const inputRadioChecked = rtl.screen.getByTestId('input-radio-checked');
///     const inputRadioUnchecked = rtl.screen.getByTestId('input-radio-unchecked');
///     const ariaRadioChecked = rtl.screen.getByTestId('aria-radio-checked');
///     const ariaRadioUnchecked = rtl.screen.getByTestId('aria-radio-unchecked');
///     expect(inputRadioChecked, isChecked);
///     expect(inputRadioUnchecked, isNot(isChecked));
///     expect(ariaRadioChecked, isChecked);
///     expect(ariaRadioUnchecked, isNot(isChecked));
///
///     const ariaSwitchChecked = rtl.screen.getByTestId('aria-switch-checked');
///     const ariaSwitchUnchecked = rtl.screen.getByTestId('aria-switch-unchecked');
///     expect(ariaSwitchChecked, isChecked);
///     expect(ariaSwitchUnchecked, isNot(isChecked));
///   });
/// }
/// ```
///
/// {@category Matchers}
const Matcher isChecked = _IsChecked();

class _IsChecked extends Matcher {
  static const _validTypes = ['checkbox', 'radio'];
  static const _validRoles = [..._validTypes, 'switch'];

  const _IsChecked();

  @override
  Description describe(Description description) {
    return description..add('An element that is checked');
  }

  bool isElementThatCanBeChecked(item, Map matchState) =>
      item != null && matchState['isElement'] && matchState['canBeChecked'];

  bool isElementChecked(Element item, Map matchState) {
    if (item is InputElement) {
      final type = item.getAttribute('type');
      if (_validTypes.contains(type)) {
        return item.checked;
      }
    }

    final role = item.getAttribute('role');
    if (_validRoles.contains(role)) {
      final ariaCheckedValue = item.getAttribute('aria-checked');
      return ariaCheckedValue == 'true';
    }

    return false;
  }

  void setMatchState(item, Map matchState) {
    matchState['isElement'] = item is Element;
    matchState['canBeChecked'] = (item is InputElement && _validTypes.contains(item.getAttribute('type'))) ||
        (item is Element && _validRoles.contains(item.getAttribute('role')));
  }

  String get defaultMismatchDescription => 'is not checked.';

  @override
  bool matches(item, Map matchState) {
    setMatchState(item, matchState);

    if (!isElementThatCanBeChecked(item, matchState)) return false;

    return isElementChecked(item, matchState);
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (matchState['isElement'] != true) {
      return mismatchDescription..add('is not a valid Element.');
    }

    if (matchState['canBeChecked'] != true) {
      mismatchDescription.add('is not a type of HTML element that can be checked.');
    } else {
      mismatchDescription.add(defaultMismatchDescription);
    }

    return mismatchDescription;
  }
}

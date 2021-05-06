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
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';

/// Allows you to check whether the given element is partially `checked` _a.k.a `indeterminate`_.
///
/// It accepts an `input` of type `checkbox` or `radio` and elements with a `role` of `checkbox`, `radio` or `switch`
/// with a valid `aria-checked` attribute value.
///
/// Similar to [jest-dom's `toBePartiallyChecked` matcher](https://github.com/testing-library/jest-dom#tobepartiallychecked).
///
/// ### Examples
///
/// ```html
/// &lt;input type="checkbox" aria-checked="mixed" data-test-id="aria-checkbox-mixed" />
/// &lt;input type="checkbox" checked data-test-id="input-checkbox-checked" />
/// &lt;input type="checkbox" data-test-id="input-checkbox-unchecked" />
/// &lt;div role="checkbox" aria-checked="true" data-test-id="aria-checkbox-checked" />
/// &lt;div
///   role="checkbox"
///   aria-checked="false"
///   data-test-id="aria-checkbox-unchecked"
/// />
/// &lt;input type="checkbox" data-test-id="input-checkbox-indeterminate" indeterminate />
/// ```
///
/// ```dart
/// import 'package:react_testing_library/matchers.dart' show isPartiallyChecked;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     const ariaCheckboxMixed = rtl.screen.getByTestId('aria-checkbox-mixed')
///     const inputCheckboxChecked = rtl.screen.getByTestId('input-checkbox-checked')
///     const inputCheckboxUnchecked = rtl.screen.getByTestId('input-checkbox-unchecked')
///     const ariaCheckboxChecked = rtl.screen.getByTestId('aria-checkbox-checked')
///     const ariaCheckboxUnchecked = rtl.screen.getByTestId('aria-checkbox-unchecked')
///     const inputCheckboxIndeterminate = rtl.screen.getByTestId('input-checkbox-indeterminate')
///
///     expect(ariaCheckboxMixed, isPartiallyChecked);
///     expect(inputCheckboxChecked, isNot(isPartiallyChecked));
///     expect(inputCheckboxUnchecked, isNot(isPartiallyChecked));
///     expect(ariaCheckboxChecked, isNot(isPartiallyChecked));
///     expect(ariaCheckboxUnchecked, isNot(isPartiallyChecked));
///
///     inputCheckboxIndeterminate.indeterminate = true
///     expect(inputCheckboxIndeterminate, isPartiallyChecked);
///   });
/// }
/// ```
///
/// {@category Matchers}
const Matcher isPartiallyChecked = _IsPartiallyChecked();

class _IsPartiallyChecked extends Matcher {
  const _IsPartiallyChecked();

  @override
  Description describe(Description description) {
    return description..add('An element that is partially checked');
  }

  bool isElementThatCanBePartiallyChecked(item, Map matchState) =>
      item != null && matchState['isElement'] as bool && matchState['canBePartiallyChecked'] as bool;

  bool isElementPartiallyChecked(item, Map matchState) {
    if (item is! Element) return false;

    if (item is InputElement) {
      final type = item.getAttribute('type');
      if (type == 'checkbox') {
        return item.indeterminate;
      }
    }

    final role = (item as Element).getAttribute('role');
    if (role == 'checkbox') {
      final ariaPartiallyCheckedValue = (item as Element).getAttribute('aria-checked');
      return ariaPartiallyCheckedValue == 'mixed';
    }

    return false;
  }

  void setMatchState(item, Map matchState) {
    matchState['isElement'] = item is Element;
    matchState['canBePartiallyChecked'] = (item is InputElement && item.getAttribute('type') == 'checkbox') ||
        (item is Element && item.getAttribute('role') == 'checkbox');
  }

  String get defaultMismatchDescription => 'is not partially checked.';

  @override
  bool matches(item, Map matchState) {
    setMatchState(item, matchState);

    if (!isElementThatCanBePartiallyChecked(item, matchState)) return false;

    return isElementPartiallyChecked(item, matchState);
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (matchState['isElement'] != true) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    } else if (matchState['canBePartiallyChecked'] != true) {
      return mismatchDescription..add('is not a type of HTML Element that can be checked.');
    }

    return mismatchDescription..add(defaultMismatchDescription);
  }
}
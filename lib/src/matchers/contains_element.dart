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

/// Allows you to assert whether an element contains another element as a descendant or not.
///
/// Similar to [jest-dom's `toContainElement` matcher](https://github.com/testing-library/jest-dom#tocontainelement).
///
/// ### Examples
///
/// ```html
/// &lt;span data-test-id="ancestor">&lt;span data-test-id="descendant">&lt;/span>&lt;/span>
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     final ancestor = rtl.screen.getByTestId('ancestor');
///     final descendant = rtl.screen.getByTestId('descendant');
///
///     expect(ancestor, containsElement(descendant));
///     expect(descendant, isNot(containsElement(ancestor)));
///   });
/// }
/// ```
Matcher containsElement(Element descendant) => _ContainsElement(descendant);

class _ContainsElement extends Matcher {
  final Element descendant;

  _ContainsElement(this.descendant) {
    if (descendant == null) {
      throw ArgumentError('descendant must be a non-null Element');
    }
  }

  @override
  Description describe(Description description) {
    return description..add('an element that contains $descendant');
  }

  @override
  bool matches(ancestor, Map matchState) {
    matchState['ancestorIsElement'] = ancestor is Element;

    return matchState['ancestorIsElement'] && (ancestor as Element).contains(descendant);
  }

  @override
  Description describeMismatch(ancestor, Description mismatchDescription, Map matchState, bool verbose) {
    if (!matchState['ancestorIsElement']) {
      return mismatchDescription..add('is not a valid Element.');
    }

    return mismatchDescription..add('does not contain $descendant.');
  }
}

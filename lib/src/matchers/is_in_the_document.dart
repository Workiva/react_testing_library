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

import 'contains_element.dart' show containsElement;

/// Allows you to assert whether an element is present in the [document] or not.
///
/// Similar to [jest-dom's `toBeInTheDocument` matcher](https://github.com/testing-library/jest-dom#tobeinthedocument).
///
/// ### Examples
///
/// ```html
/// &lt;span data-test-id="html-element">&lt;span>Html Element&lt;/span>&lt;/span>
/// &lt;svg data-test-id="svg-element">&lt;/svg>
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     expect(rtl.screen.getByTestId('html-element'), isInTheDocument);
///     expect(rtl.screen.getByTestId('svg-element'), isInTheDocument);
///     expect(rtl.screen.queryByTestId('does-not-exist'), isNot(isInTheDocument));
///   });
/// }
/// ```
///
/// > **Note:** This matcher does not find detached elements.
/// >
/// > The element must be added to the document to be found by [isInTheDocument].
/// > If you desire to search in a detached element please use: [containsElement]
const Matcher isInTheDocument = _IsInTheDocument();

class _IsInTheDocument extends Matcher {
  const _IsInTheDocument();

  @override
  Description describe(Description description) {
    return description..add('an element in the document');
  }

  @override
  bool matches(item, Map matchState) {
    return item != null && document.documentElement.contains(item);
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add('is not a valid Element.');
    }

    return mismatchDescription..add('is not an element in the document.');
  }
}

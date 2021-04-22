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

/// Allows you to assert whether an element has content or not.
///
/// Similar to [jest-dom's `toBeEmptyDOMElement` matcher](https://github.com/testing-library/jest-dom#tobeemptydomelement).
///
/// ### Examples
///
/// ```html
/// &lt;span data-test-id="not-empty">&lt;span data-test-id="empty">&lt;/span>&lt;/span>
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     expect(rtl.screen.getByTestId('empty'), isEmptyDomElement);
///     expect(rtl.screen.getByTestId('not-empty'), isNot(isEmptyDomElement));
///   });
/// }
/// ```
///
/// {@category Matchers}
const Matcher isEmptyDomElement = _IsEmptyDomElement();

class _IsEmptyDomElement extends Matcher {
  const _IsEmptyDomElement();

  @override
  Description describe(Description description) {
    return description..add('is an empty DOM Element');
  }

  @override
  bool matches(item, Map matchState) {
    matchState['isElement'] = item is Element;
    if (item == null || !matchState['isElement']) return false;

    return (item as Element).innerHtml.isEmpty;
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (!matchState['isElement']) {
      return mismatchDescription..add('is not a valid Element.');
    }

    mismatchDescription.add('is not an empty DOM Element.');

    return mismatchDescription;
  }
}

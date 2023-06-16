
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

import 'contains_element.dart' show containsElement;

/// Allows you to assert whether an element is present in the [document] or not.
///
/// Similar to [jest-dom's `toBeInTheDocument` matcher](https://github.com/testing-library/jest-dom#tobeinthedocument).
///
/// > **Note:** This matcher does not find detached elements.
/// >
/// > The element must be added to the document to be found by [isInTheDocument].
/// > If you desire to search in a detached element please use: [containsElement]
///
/// ## Examples
///
/// ```html
/// <div>
///   <span data-test-id="html-element"><span>Html Element</span></span>
///   <svg data-test-id="svg-element"></svg>
/// </div>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show isInTheDocument;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final view = rtl.render(react.div({},
///       react.span({'data-test-id': 'html-element'},
///         react.span({}, 'Html Element'),
///       ),
///       react.svg({'data-test-id': 'svg-element'}),
///     ));
///
///     // Use the `isInTheDocument` matcher as the second argument of `expect()`
///     expect(view.getByTestId('html-element'), isInTheDocument);
///     expect(view.getByTestId('svg-element'), isInTheDocument);
///     expect(view.queryByTestId('does-not-exist'), isNot(isInTheDocument));
///   });
/// }
/// ```
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
const Matcher isInTheDocument = _IsInTheDocument();

class _IsInTheDocument extends Matcher {
  const _IsInTheDocument();

  @override
  Description describe(Description description) {
    return description..add('an element in the document');
  }

  @override
  bool matches(dynamic item, Map matchState) {
    if (item is! Element) return false;
    // ignore: unnecessary_null_comparison
    return item != null && item.ownerDocument == item.getRootNode({'composed': true});
  }

  @override
  Description describeMismatch(dynamic item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    return mismatchDescription..add('is not an Element in the document.');
  }
}

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
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show containsElement;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final result = rtl.render(
///       react.span({'data-test-id': 'ancestor'},
///         react.span({'data-test-id': 'descendant'}),
///       ),
///     );
///
///     // Use react_testing_library queries to store references to the node(s)
///     final ancestor = result.getByTestId('ancestor');
///     final descendant = result.getByTestId('descendant');
///
///     // Use the `containsElement` matcher as the second argument of `expect()`
///     expect(ancestor, containsElement(descendant));
///     expect(descendant, isNot(containsElement(ancestor)));
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
Matcher containsElement(Element descendant) => _ContainsElement(descendant);

class _ContainsElement extends Matcher {
  final Element descendant;

  _ContainsElement(this.descendant) {
    ArgumentError.checkNotNull(descendant, 'descendant');
  }

  @override
  Description describe(Description description) {
    return description..add('an element that contains $descendant');
  }

  @override
  bool matches(ancestor, Map matchState) {
    matchState['ancestorIsElement'] = ancestor is Element;

    return matchState['ancestorIsElement'] as bool && (ancestor as Element).contains(descendant);
  }

  @override
  Description describeMismatch(ancestor, Description mismatchDescription, Map matchState, bool verbose) {
    if (!(matchState['ancestorIsElement'] as bool)) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    return mismatchDescription..add('does not contain $descendant.');
  }
}

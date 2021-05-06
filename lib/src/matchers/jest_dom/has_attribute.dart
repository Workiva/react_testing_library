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

/// Allows you to check whether an element has an [attribute] that matches the provided [valueOrMatcher] or not.
///
/// You can also optionally use a `Matcher` as the [valueOrMatcher] to do partial string matching
/// (e.g. using `contains()`, `startsWith()`, `endsWith()`, etc).
///
/// Similar to [jest-dom's `toHaveAttribute` matcher](https://github.com/testing-library/jest-dom#tohaveattribute).
///
/// ### Examples
///
/// ```html
/// &lt;button type="submit" aria-label="Submit the form">ok&lt;/button>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show hasAttribute;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final result = rtl.render(
///       react.button({'type': 'submit', 'aria-label': 'Submit the form'}, 'ok'),
///     );
///
///     // Use react_testing_library queries to store references to the node(s)
///     final button = result.getByRole('button', name: 'ok');
///
///     // Use the `hasAttribute` matcher as the second argument of `expect()`
///     expect(button, hasAttribute('type', 'submit'));
///     expect(button, isNot(hasAttribute('type', 'button'))));
///     expect(button, hasAttribute('aria-label', contains('Submit')));
///     expect(button, hasAttribute('type', isNot(contains('but'))));
///     expect(button, hasAttribute('aria-label')); // Shorthand for `hasAttribute('aria-label', isNotNull)`
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
Matcher hasAttribute(String attribute, [dynamic valueOrMatcher]) => _ElementAttributeMatcher(attribute, valueOrMatcher);

class _ElementAttributeMatcher extends CustomMatcher {
  final String _attributeName;

  _ElementAttributeMatcher(String attribute, dynamic valueOrMatcher)
      : _attributeName = attribute,
        super(
          'Element with "$attribute" attribute value of',
          '"$attribute" attribute',
          valueOrMatcher == null ? isNotNull : valueOrMatcher,
        );

  @override
  featureValueOf(item) {
    try {
      return (item as Element).getAttribute(_attributeName);
    } catch (_) {
      // If its not an element, the mismatch description will say so.
    }

    return null;
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    } else if ((item as Element).getAttribute(_attributeName) == null) {
      return mismatchDescription..add('does not have an "$_attributeName" attribute.');
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose);
  }
}
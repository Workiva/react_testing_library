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
import 'package:react_testing_library/src/matchers/jest_dom/util/element_text_content_matcher_mixin.dart';

/// Allows you to check whether an element has the [expected] text content or not.
///
/// When a `String` argument is passed through, it will perform a whole case-sensitive match to the element content.
///
/// The whitespace of the element content is normalized unless you set [normalizeWhitespace] to false.
///
/// To perform a partial or case-insensitive match, you can use any of the string matchers like `contains`, or
/// construct a `RegExp` with `caseSensitive` set to false.
///
/// Similar to [jest-dom's `toHaveTextContent` matcher](https://github.com/testing-library/jest-dom#tohavetextcontent).
///
/// ### Examples
///
/// ```html
/// <button>Text Content</button>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show hasTextContent;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final result = rtl.render(react.button({}, 'Text Content'));
///
///     // Use react_testing_library queries to store references to the node(s)
///     final button = result.getByRole('button');
///
///     // Use the `hasTextContent` matcher as the second argument of `expect()`
///     expect(button, hasTextContent('Text Content'));
///     expect(button, hasTextContent(RegExp(r'Content$'))); // to match partially
///     expect(button, hasContent(RegExp('content', caseSensitive: false))); // to use case-insensitive match
///     expect(button, isNot(hasContent('foo')));
///     expect(button, hasContent()); // Will match a non-empty description
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
// ignore: avoid_positional_boolean_parameters
Matcher hasTextContent([dynamic expected, bool normalizeWhitespace = true]) =>
    _HasTextContent(expected, normalizeWhitespace: normalizeWhitespace);

class _HasTextContent extends CustomMatcher with ElementTextContentMatcherMixin {
  final dynamic expectedTextContent;
  final bool normalizeWhitespace;

  _HasTextContent(dynamic expectedTextContent, {this.normalizeWhitespace = true})
      : expectedTextContent = ElementTextContentMatcherMixin.normalizeExpectedTextContent(expectedTextContent),
        super(
          'An HTML Element with text content value of',
          'text content',
          ElementTextContentMatcherMixin.normalizeExpectedTextContent(expectedTextContent),
        );

  @override
  dynamic featureValueOf(dynamic item) =>
      ElementTextContentMatcherMixin.getNormalizedTextContentOf(item, normalizeWhitespace: normalizeWhitespace);

  @override
  Description describeMismatch(dynamic item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose);
  }
}

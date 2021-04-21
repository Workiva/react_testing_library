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
import 'package:react_testing_library/src/matchers/util/element_text_content_matcher_mixin.dart';

/// Allows you to check whether an element whether the given element has a text content or not.
///
/// When a `String` argument is passed through, it will perform a whole case-sensitive match to the element content.
///
/// The whitespace of the element content is normalized unless you set [normalizeWhitespace] to false.
///
/// To perform a partial or case-insensitive match, you can use any of the string matchers like `contains`, or
/// construct a `RegExp` with `caseSensitive` set to true.
///
/// Similar to [jest-dom's `toHaveTextContent` matcher](https://github.com/testing-library/jest-dom#tohavetextcontent).
///
/// ### Examples
///
/// ```html
/// &lt;span data-test-id="text-content">Text Content&lt;/span>
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     final element = rtl.screen.getByTestId('text-content');
///
///     expect(element, hasTextContent('Text Content'));
///     expect(element, hasTextContent(RegExp(r'Content$'))); // to match the whole content
///     expect(element, hasContent(RegExp('content', caseSensitive: false))); // to use case-insensitive match
///     expect(element, isNot(hasContent('foo')));
///     expect(element, hasContent()); // Will match a non-empty description
///   });
/// }
/// ```
///
/// {@category Matchers}
Matcher hasTextContent([dynamic expectedTextContent, bool normalizeWhitespace = true]) =>
    _HasTextContent(expectedTextContent, normalizeWhitespace: normalizeWhitespace);

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
  featureValueOf(item) => getNormalizedTextContentOf(item, normalizeWhitespace: normalizeWhitespace);

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose);
  }
}

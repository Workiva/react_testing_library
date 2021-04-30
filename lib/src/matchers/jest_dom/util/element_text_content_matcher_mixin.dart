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

/// A mixin with utilities for matchers that match [Element] text content.
mixin ElementTextContentMatcherMixin on CustomMatcher {
  String getNormalizedTextContentOf(dynamic item, {bool normalizeWhitespace = true}) {
    if (item is! Element) return null;
    if (!normalizeWhitespace) return (item as Element).text;

    // NOTE: I'm not sure why the jest-dom implementations of the `toHaveTextContent` matcher
    // only replaces `&nbsp;` when `normalizeWhitespace` is false, but IMO - it should normalize
    // all forms of spaces if the user says they want the whitespace "normalized".
    //
    // See: <https://github.com/testing-library/jest-dom/blob/master/src/to-have-text-content.js#L10-L12>
    return (item as Element).text.replaceAll(RegExp(r'\s+'), ' ').replaceAll(RegExp('\u00a0+'), ' ');
  }

  /// Returns a normalized [String] or [Matcher] based on the provided [userExpectedTextContent]
  /// that should be used as the expected text content.
  ///
  /// This aids in API usage shorthand like what is shown below to assert that an element
  /// has text content of some kind.
  ///
  /// ```dart
  /// expect(someElement, hasTextContent());
  /// ```
  ///
  /// It also wraps `RegExp`s with the [matches] matcher.
  static /*String|Matcher*/ dynamic normalizeExpectedTextContent(dynamic userExpectedTextContent) {
    _validateExpectedTextContent(userExpectedTextContent);
    if (userExpectedTextContent == null) return allOf(isA<String>(), isNotEmpty);
    if (userExpectedTextContent is RegExp) return matches(userExpectedTextContent);
    return userExpectedTextContent;
  }

  static void _validateExpectedTextContent(dynamic expectedTextContent) {
    if (expectedTextContent == null ||
        expectedTextContent is Matcher ||
        expectedTextContent is RegExp ||
        expectedTextContent is String) return;
    throw ArgumentError.value(expectedTextContent,
        'HTML Element text content matchers only accept a Matcher, RegExp, or a String as the expected value.');
  }
}

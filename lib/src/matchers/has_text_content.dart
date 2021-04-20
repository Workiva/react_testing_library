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

import 'package:matcher/matcher.dart' as m;

/// Allows you to check whether an element whether the given element has a text content or not.
///
/// When a `String` argument is passed through, it will perform a partial case-sensitive match to the element content.
///
/// To perform a case-insensitive match, you can construct a `RegExp` with `caseSensitive` set to true.
///
/// If you want to match the whole content, you can use a `RegExp` to do it.
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
///     expect(element, hasTextContent('Content'));
///     expect(element, hasTextContent(RegExp(r'^Text Content$'))); // to match the whole content
///     expect(element, hasContent(RegExp('content', caseSensitive: false))); // to use case-insensitive match
///     expect(element, isNot(hasContent('content')));
///   });
/// }
/// ```
///
/// {@category Matchers}
m.Matcher hasTextContent(
  Pattern stringOrRegExp, {
  bool normalizeWhitespace = true,
}) =>
    _HasTextContent(stringOrRegExp, normalizeWhitespace: normalizeWhitespace);

class _HasTextContent extends m.Matcher {
  final dynamic matcher;
  final bool normalizeWhitespace;

  _HasTextContent(this.matcher, {this.normalizeWhitespace = true}) {
    if (matcher is! String && matcher is! RegExp) {
      throw ArgumentError('must be a String or a RegExp');
    }
  }

  @override
  m.Description describe(m.Description description) {
    final matcherTypeDescription =
        matcher is RegExp ? "has a match within '/${(matcher as RegExp).pattern}/'" : "contains '$matcher'";
    return description.add('An element with text content that $matcherTypeDescription');
  }

  @override
  m.Description describeMismatch(
      covariant Element item, m.Description mismatchDescription, Map matchState, bool verbose) {
    return mismatchDescription.add("has text content '${featureValueOf(item)}'");
  }

  @override
  bool matches(covariant Element item, Map matchState) {
    final itemTextContentValue = featureValueOf(item);

    return matcher is RegExp
        ? m.matches(matcher).matches(itemTextContentValue, matchState)
        : m.contains(matcher).matches(itemTextContentValue, matchState);
  }

  String featureValueOf(covariant Element item) {
    String featureValue;
    if (normalizeWhitespace) {
      featureValue = item.text.replaceAll(RegExp(r'\s+'), ' ');
    } else {
      // NOTE: I'm not sure why the jest-dom implementation only replaces &nbsp; when `normalizeWhitespace` is false,
      // but for now we should just leave it as-is to mimic that behavior.
      //
      // See: <https://github.com/testing-library/jest-dom/blob/master/src/to-have-text-content.js#L10-L12>
      featureValue = item.text.replaceAll(RegExp(r'\u00a0'), ' '); // Replace &nbsp; with normal spaces
    }

    return featureValue;
  }
}

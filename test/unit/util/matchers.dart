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

import 'package:react_testing_library/src/dom/matches/types.dart' show TextMatch;
import 'package:react_testing_library/src/util/error_message_utils.dart';
import 'package:test/test.dart';

import 'string_trimming.dart';

class _HasToStringValue extends CustomMatcher {
  _HasToStringValue(matcher) : super('Object with toString() value', 'toString()', matcher);

  @override
  featureValueOf(Object item) => item.toString();
}

/// Returns a matcher that matches an object whose `toString` value matches [value].
Matcher hasToStringValue(value) => _HasToStringValue(value);

Matcher toThrowErrorMatchingInlineSnapshot(
  Matcher stringSnapshotMatcher,
  Matcher stringPrettyDomMatcher, [
  Matcher arbitraryMatcher1,
  Matcher arbitraryMatcher2,
  Matcher arbitraryMatcher3,
]) {
  final errorNameMatcher = hasToStringValue(contains('TestingLibraryElementError'));
  final snapshotMatcher = hasToStringValue(stringSnapshotMatcher);
  final prettyDomMatcher =
      stringPrettyDomMatcher != null ? hasToStringValue(stringPrettyDomMatcher) : hasToStringValue(endsWith('</div>'));

  return throwsA(allOf(isA<TestingLibraryElementError>(), errorNameMatcher, snapshotMatcher, prettyDomMatcher,
      arbitraryMatcher1, arbitraryMatcher2, arbitraryMatcher3));
}

/// The value to use in the `templatePattern` argument of [buildContainsPatternUsing].
///
/// This will be replaced by the `expectedValueThatWasNotFound` argument when [buildContainsPatternUsing]
/// is called to form the final string value that is expected to be found.
const valueNotFoundPlaceholder = 'replaced_with_value_not_found_by_query';

/// Like `contains`, but will replace the value of [valueNotFoundPlaceholder] found within [templatePattern]
/// and replace it with the [expectedValueThatWasNotFound].
///
/// Useful if you need to test a bunch of different variations that match the [templatePattern], but have
/// numerous possible values for [expectedValueThatWasNotFound].
///
/// ### Example
///
/// ```dart
/// buildContainsPatternUsing('alt text: $valueNotFoundPlaceholder', altTextValueNotFound));
/// // is equivalent to
/// contains('alt text: $altTextValueNotFound'));
/// ```
Matcher buildContainsPatternUsing(String templatePattern, String expectedValueThatWasNotFound) {
  if (!templatePattern.contains(valueNotFoundPlaceholder)) {
    throw ArgumentError(
        'The buildContainsPatternUsing matcher should only be used if the first argument contains `valueNotFoundPlaceholder`');
  }

  if (expectedValueThatWasNotFound == TextMatch.functionValueErrorMessage &&
      templatePattern.contains('"$valueNotFoundPlaceholder"')) {
    return contains(templatePattern.replaceAll('"$valueNotFoundPlaceholder"', expectedValueThatWasNotFound));
  } else {
    return contains(templatePattern.replaceAll(valueNotFoundPlaceholder, expectedValueThatWasNotFound));
  }
}

Matcher containsMultilineString(String expected) => _ContainsMultilineString(expected);

class _ContainsMultilineString extends Matcher {
  final String _expected;

  _ContainsMultilineString(String expected) : _expected = expected.trimEachLine();

  @override
  bool matches(item, Map matchState) {
    var expected = _expected;
    if (item is String) {
      return item.trimEachLine().contains(expected);
    }

    return false;
  }

  @override
  Description describe(Description description) =>
      description.add('contains a multi-line string (ignoring whitespace) ').addDescriptionOf(_expected);

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is String) {
      return super.describeMismatch(item, mismatchDescription, matchState, verbose);
    } else {
      return mismatchDescription.add('is not a string');
    }
  }
}

/// Utility for asserting that [matcher] will fail on [value].
///
/// Copyright (c) 2012, the Dart project authors.
void shouldFail(value, Matcher matcher, expected, {bool useDoubleQuotes = false}) {
  var failed = false;
  try {
    expect(value, matcher);
  } on TestFailure catch (err) {
    failed = true;

    var _errorString = err.message;

    if (expected is String) {
      expect(_errorString, equalsIgnoringWhitespace(expected));
    } else {
      var escapedErrorString = _errorString.replaceAll(RegExp(r'[\s\n]+'), ' ');
      if (useDoubleQuotes) {
        escapedErrorString = escapedErrorString.replaceAll("\'", '"');
      }
      expect(escapedErrorString, expected);
    }
  }

  expect(failed, isTrue, reason: 'Expected to fail.');
}

/// Utility for asserting that [matcher] will pass on [value].
///
/// Copyright (c) 2012, the Dart project authors.
void shouldPass(value, Matcher matcher, {String reason}) {
  expect(value, matcher, reason: reason);
}

/// Utility for asserting that [matcher] will fail on [value].
///
/// Copyright (c) 2012, the Dart project authors.
void shouldFail(value, Matcher matcher, expected, {bool useDoubleQuotes = false}) {
  var failed = false;
  try {
    expect(value, matcher);
  } on TestFailure catch (err) {
    failed = true;

    var _errorString = err.message;

    if (expected is String) {
      expect(_errorString, equalsIgnoringWhitespace(expected));
    } else {
      var escapedErrorString = _errorString.replaceAll(RegExp(r'[\s\n]+'), ' ');
      if (useDoubleQuotes) {
        escapedErrorString = escapedErrorString.replaceAll("\'", '"');
      }
      expect(escapedErrorString, expected);
    }
  }

  expect(failed, isTrue, reason: 'Expected to fail.');
}

/// Utility for asserting that [matcher] will pass on [value].
///
/// Copyright (c) 2012, the Dart project authors.
void shouldPass(value, Matcher matcher, {String reason}) {
  expect(value, matcher, reason: reason);
}

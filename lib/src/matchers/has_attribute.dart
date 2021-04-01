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

/// Allows you to check whether an element has an [attribute] that matches the provided [value] or not.
///
/// You can also optionally use a `Matcher` as the [value] to do partial string matching
/// (e.g. using `contains()`, `startsWith`, `endsWith`, etc).
///
/// Similar to [jest-dom's `toHaveAttribute` matcher](https://github.com/testing-library/jest-dom#tohaveattribute).
///
/// ### Examples
///
/// ```html
/// &lt;button data-test-id="ok-button" type="submit" disabled>ok&lt;/button>
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     final button = rtl.screen.getByTestId('ok-button');
///
///     expect(button, hasAttribute('disabled'));
///     expect(button, hasAttribute('type', 'submit'));
///     expect(button, isNot(hasAttribute('type', 'button'))));
///
///     expect(button, hasAttribute('type', contains('sub')));
///     expect(button, hasAttribute('type', isNot(contains('but'))));
///   });
/// }
/// ```
Matcher hasAttribute(String attribute, dynamic value) => _ElementAttributeMatcher(attribute, wrapMatcher(value));

class _ElementAttributeMatcher extends CustomMatcher {
  _ElementAttributeMatcher(String attribute, dynamic matcher)
      : _attributeName = attribute,
        super('Element with "$attribute" attribute that equals', 'attributes', matcher);

  String _attributeName;

  @override
  featureValueOf(covariant Element element) => element.getAttribute(_attributeName);
}

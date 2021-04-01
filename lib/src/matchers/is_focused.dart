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

/// Allows you to assert whether an element has focus or not.
///
/// Similar to [jest-dom's `toHaveFocus` matcher](https://github.com/testing-library/jest-dom#tohavefocus).
///
/// ### Examples
///
/// ```html
/// &lt;div>&lt;input type="text" data-test-id="element-to-focus" />&lt;/div>
/// ```
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     final input = rtl.screen.getByTestId('element-to-focus');
///
///     input.focus();
///     expect(input, isFocused);
///
///     input.blur();
///     expect(input, isNot(isFocused));
///   });
/// }
/// ```
const Matcher isFocused = _IsFocused();

class _IsFocused extends Matcher {
  const _IsFocused();

  @override
  Description describe(Description description) {
    return description..add('is focused');
  }

  @override
  bool matches(item, Map matchState) {
    matchState['activeElement'] = document.activeElement;

    return item != null && item == document.activeElement;
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add('is not a valid Element.');
    }

    if (!document.documentElement.contains(item)) {
      return mismatchDescription
        ..add('is not attached to the document, and thus cannot be focused.')
        ..add(' If testing with React, you should use the `render` utility function '
            'provided by react_testing_library to ensure the tree is attached to the document when rendered.');
    }

    mismatchDescription.add('is not focused; ');

    final activeElement = matchState['activeElement'];
    if (activeElement is! Element || activeElement == document.body) {
      mismatchDescription.add('there is no element currently focused');
    } else {
      mismatchDescription
        ..add('the currently focused element is ')
        ..addDescriptionOf(activeElement);
    }

    return mismatchDescription;
  }
}

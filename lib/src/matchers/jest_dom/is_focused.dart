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

/// Allows you to assert whether an element has focus or not.
///
/// Similar to [jest-dom's `toHaveFocus` matcher](https://github.com/testing-library/jest-dom#tohavefocus).
///
/// ## Examples
///
/// ```html
/// <input type="text" name="username" value="jane.doe" />
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
///     final view = rtl.render(react.input({'type': 'text', 'name': 'username'}));
///
///     // Use react_testing_library queries to store references to the node(s)
///     final input = view.getByRole('textbox');
///
///     // Use the `isFocused` matcher as the second argument of `expect()`
///     input.focus();
///     expect(input, isFocused);
///
///     input.blur();
///     expect(input, isNot(isFocused));
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
const Matcher isFocused = _IsFocused();

class _IsFocused extends Matcher {
  const _IsFocused();

  @override
  Description describe(Description description) {
    return description..add('is focused');
  }

  @override
  bool matches(dynamic item, Map matchState) {
    matchState['activeElement'] = document.activeElement;

    return item != null && item == document.activeElement;
  }

  @override
  Description describeMismatch(dynamic item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    if (!document.documentElement.contains(item as Element)) {
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

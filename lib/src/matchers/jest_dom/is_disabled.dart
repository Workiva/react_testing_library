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

/// Allows you to assert whether an element is disabled from the user's perspective.
///
/// It matches if the element is an element that supports the `disabled` attribute, and the `disabled` attribute
/// is specified, or the element is a descendant of a [FormElement] with a `disabled` attribute.
///
/// Similar to [jest-dom's `toBeDisabled` matcher](https://github.com/testing-library/jest-dom#tobedisabled).
///
/// ### Examples
///
/// ```html
/// &lt;div>
///   &lt;button type="submit" disabled>submit&lt;/button>
///   &lt;fieldset disabled>&lt;input type="text" name="username" value="jane.doe" />&lt;/fieldset>
///   &lt;a href="..." disabled>link&lt;/a>
/// &lt;/div>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show isDisabled;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final result = rtl.render(react.div({},
///       react.button({'type': 'submit', 'disabled': true}, 'submit'),
///       react.fieldset({'disabled': true},
///         react.input({'type': 'text', 'value': 'jane.doe'}),
///       ),
///       react.a({'href': '...', 'disabled': true}, 'link'),
///     ));
///
///     // Use the `isDisabled` matcher as the second argument of `expect()`
///     expect(result.getByRole('button'), isDisabled);
///     expect(result.getByRole('textbox'), isDisabled);
///     expect(result.getByText('link'), isNot(isDisabled)); // Anchor elements cannot be disabled
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
const Matcher isDisabled = _IsDisabled();

/// Allows you to check whether an element is not disabled from the user's perspective.
///
/// Use this matcher to avoid double negation via [isDisabled] in your tests.
///
/// {@category Matchers}
const Matcher isEnabled = _IsEnabled();

class _IsDisabled extends Matcher {
  const _IsDisabled();

  @override
  Description describe(Description description) {
    return description..add('An element that is disabled from the user\'s perspective');
  }

  bool isElementThatCanBeDisabled(item, Map matchState) =>
      item != null && matchState['isElement'] && matchState['canBeDisabled'];

  bool isElementDisabled(item, Map matchState) {
    final formAncestor = (item as Element).closest('form');
    if (formAncestor != null && (formAncestor as FormElement).hasAttribute('disabled')) return true;
    return item.disabled;
  }

  void setMatchState(item, Map matchState) {
    matchState['isElement'] = item is Element;
    matchState['canBeDisabled'] = item is ButtonElement ||
        item is InputElement ||
        item is SelectElement ||
        item is TextAreaElement ||
        item is OptGroupElement ||
        item is OptionElement ||
        item is FieldSetElement ||
        item is FormElement;
  }

  String get defaultMismatchDescription => 'is not disabled.';

  @override
  bool matches(item, Map matchState) {
    setMatchState(item, matchState);

    if (!isElementThatCanBeDisabled(item, matchState)) return false;

    return isElementDisabled(item, matchState);
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (matchState['isElement'] != true) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    if (matchState['canBeDisabled'] != true) {
      mismatchDescription.add('is not a type of HTML Element that can be disabled.');
    } else {
      mismatchDescription.add(defaultMismatchDescription);
    }

    return mismatchDescription;
  }
}

class _IsEnabled extends _IsDisabled {
  const _IsEnabled();

  @override
  Description describe(Description description) {
    return description..add('An element that is not disabled from the user\'s perspective');
  }

  @override
  bool matches(item, Map matchState) {
    setMatchState(item, matchState);
    if (!isElementThatCanBeDisabled(item, matchState)) return false;
    return !isElementDisabled(item, matchState);
  }

  @override
  String get defaultMismatchDescription => 'is disabled.';
}

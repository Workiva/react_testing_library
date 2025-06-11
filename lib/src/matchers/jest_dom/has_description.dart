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

/// Allows you to check whether the given element has a description or not.
///
/// An element gets its description via the `aria-describedby` attribute.
/// Set this to the `id` of one or more other elements. These elements may be nested inside, be outside,
/// or a sibling of the passed in element.
///
/// The whitespace of the element content is normalized unless you set [normalizeWhitespace] to false.
///
/// Elements with multiple space-separated ids as the value of its `aria-describedby` attribute
/// will join the referenced elements’ text content separated by a space.
///
/// When a `String` argument is passed through, it will perform a whole case-sensitive match to the description text.
///
/// To perform a partial or case-insensitive match, you can use any of the string matchers like `contains`, or
/// construct a `RegExp` with `caseSensitive` set to true.
///
/// Similar to [jest-dom's `toHaveDescription` matcher](https://github.com/testing-library/jest-dom#tohavedescription).
///
/// ## Examples
///
/// ```html
/// <button aria-label="Close" aria-describedby="description-close">
///   &times;
/// </button>
/// <div id="description-close">
///   Closing will discard any changes
/// </div>
///
/// <button>Delete</button>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show hasDescription;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final view = rtl.render(react.div({},
///       react.button({
///         'aria-label': 'Close',
///         'aria-describedby': 'description-close',
///       }, 'X'),
///       react.div({'id': 'description-close'}, 'Closing will discard any changes'),
///       react.button({}, 'Delete'),
///     ));
///
///     // Use react_testing_library queries to store references to the node(s)
///     final closeButton = view.getByRole('button', name: 'Close');
///     final deleteButton = view.getByRole('button', name: 'Delete');
///
///     // Use the `hasDescription` matcher as the second argument of `expect()`
///     expect(closeButton, hasDescription('Closing will discard any changes'));
///     expect(closeButton, hasDescription(contains('will discard')));
///     expect(closeButton, hasDescription(RegExp(r'^closing', caseSensitive: false))); // to use case-insensitive match
///     expect(closeButton, isNot(hasDescription('Other description')));
///     expect(closeButton, hasDescription()); // Will match a non-empty description
///     expect(deleteButton, isNot(hasDescription())); // Will match a missing or empty-string description
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
// ignore: avoid_positional_boolean_parameters
Matcher hasDescription([dynamic expectedDescription, bool normalizeWhitespace = true]) =>
    _HasDescription(expectedDescription, normalizeWhitespace: normalizeWhitespace);

class _HasDescription extends CustomMatcher with ElementTextContentMatcherMixin {
  final dynamic expectedDescription;
  final bool normalizeWhitespace;

  _HasDescription(dynamic expectedDescription, {this.normalizeWhitespace = true})
      : expectedDescription = ElementTextContentMatcherMixin.normalizeExpectedTextContent(expectedDescription),
        super(
          'An HTML Element that is described by HTML Element(s) that have description value of',
          'description',
          ElementTextContentMatcherMixin.normalizeExpectedTextContent(expectedDescription),
        );

  @override
  dynamic featureValueOf(dynamic item) {
    final elementsWithDescriptions = _elementsThatDescribe(item);

    if (elementsWithDescriptions.isEmpty) return null;
    return elementsWithDescriptions
        .map((el) =>
            ElementTextContentMatcherMixin.getNormalizedTextContentOf(el, normalizeWhitespace: normalizeWhitespace))
        .join(' ');
  }

  @override
  Description describeMismatch(dynamic item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    } else if (_idsOfElementsThatDescribe(item) == null) {
      return mismatchDescription..add('does not have an aria-describedby attribute.');
    } else if (_elementsThatDescribe(item).isEmpty) {
      return mismatchDescription
        ..add('has an aria-described by attribute value '
            'of "${item.getAttribute('aria-describedby')}", which does not match the id attribute of '
            'any Element in the DOM.');
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose);
  }

  List<String>? _idsOfElementsThatDescribe(item) {
    if (item is! Element) return null;

    final describedByAttrValue = item.getAttribute('aria-describedby');
    if (describedByAttrValue == null) return null;
    return describedByAttrValue.split(' ');
  }

  List<Element> _elementsThatDescribe(item) {
    if (item is! Element) return const [];

    final elementsWithDescriptions = <Element>[];
    _idsOfElementsThatDescribe(item)?.forEach((id) {
      final elWithDesc = querySelector('#${Css.escape(id)}');
      if (elWithDesc != null) {
        elementsWithDescriptions.add(elWithDesc);
      }
    });

    return elementsWithDescriptions;
  }
}

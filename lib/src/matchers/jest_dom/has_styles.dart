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

import 'package:color/color.dart';
import 'package:matcher/matcher.dart';
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';

/// Allows you to check if a certain element has some specific CSS property value(s) applied.
///
/// It matches only if the element has _all_ the expected properties applied, not just some of them.
///
/// The matcher works with styles applied to an element via an "inline" `style` attribute value, or
/// external stylesheets that apply the style(s) via CSS selector(s).
///
/// Similar to [jest-dom's `toHaveStyle` matcher](https://github.com/testing-library/jest-dom#tohavestyle).
///
/// ## Examples
///
/// ```html
/// <button style="display: block; background-color: red">
///   Delete
/// </button>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/matchers.dart' show hasStyles;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above
///     final view = rtl.render(
///       react.button({'style': {
///         'display': 'block',
///         'backgroundColor': 'red',
///       }}, 'Delete'),
///     );
///
///     // Use react_testing_library queries to store references to the node(s)
///     final button = view.getByRole('button', name: 'Delete');
///
///     // Use the `hasStyles` matcher as the second argument of `expect()`
///     expect(button, hasStyles({'display': 'block'}));
///     expect(button, hasStyles({
///       'backgroundColor': 'red',
///       'display': 'block',
///     }));
///     expect(button, isNot(hasStyles({
///       'backgroundColor': 'blue',
///       'display': 'block',
///     })));
///   });
/// }
/// ```
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// {@category Matchers}
Matcher hasStyles(Map<String, dynamic> styles) => _HasStyles(styles);

class _HasStyles extends CustomMatcher {
  final Map<String, dynamic> _expectedStyles;

  _HasStyles(Map<String, dynamic> expectedStyles)
      : _expectedStyles = _normalizeMapValues(expectedStyles),
        super('A element with styles', 'styles', _normalizeMapValues(expectedStyles));

  @override
  dynamic featureValueOf(dynamic item) {
    // If it's not a Element, the mismatch description will say so.
    if (item is! Element) return null;

    final element = item;

    final allComputedStyles = element.getComputedStyle();
    final stylesToCompare = <String, dynamic>{};
    final invalidPropertyNames =
        _expectedStyles.keys.where((propertyName) => !allComputedStyles.supportsProperty(propertyName));
    if (invalidPropertyNames.isNotEmpty) {
      throw ArgumentError.value(invalidPropertyNames, 'style',
          'One or more property names is not supported by the browser you are testing in.');
    }
    for (final stylePropertyToCheck in _expectedStyles.keys) {
      final actualValue = allComputedStyles.getPropertyValue(stylePropertyToCheck);
      stylesToCompare[stylePropertyToCheck] = normalizeValue(stylePropertyToCheck, actualValue);
    }
    return stylesToCompare;
  }

  @override
  Description describeMismatch(dynamic item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose);
  }

  static Map<String, dynamic> _normalizeMapValues(Map<String, dynamic> styleMap) {
    return styleMap
        .map((propertyName, value) => MapEntry(_camelToDashCase(propertyName), normalizeValue(propertyName, value)));
  }

  /// Perform various normalization tasks on the provided [value].
  static dynamic normalizeValue(String propertyName, dynamic value) {
    var normalizedValue = value;

    if (propertyName == 'font-weight') {
      normalizedValue = normalizedValue.toString().replaceAll('bold', '700').replaceAll('normal', '400');
    } else {
      normalizedValue = normalizeColorValue(normalizedValue);
    }

    normalizedValue = normalizedValue.toString().replaceAllMapped(RegExp(r',(\S)'), (match) {
      return ', ${match.group(1)}';
    }).replaceAllMapped(RegExp(r'(?<=\D)0(\.\d)'), (match) {
      return match.group(1)!;
    });

    if (normalizedValue is String) {
      normalizedValue = num.tryParse(normalizedValue) ?? normalizedValue;
    }

    return normalizedValue;
  }

  /// Normalize named/hex colors so that they match as expected with the
  /// Rgb value that is always returned from getComputedStyles()
  static dynamic normalizeColorValue(dynamic possibleColorValue) {
    final valueAsColor = ColorParser().parse(possibleColorValue.toString());
    if (valueAsColor != null) {
      if (RgbColor.namedColors.containsKey(possibleColorValue)) {
        return RgbColor.namedColors[possibleColorValue]!.toCssString();
      }

      final rgbColor = valueAsColor.toRgbColor();
      return 'rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})';
    }

    return possibleColorValue;
  }
}

String _camelToDashCase(String camel) {
  return camel.replaceAllMapped(RegExp(r'[A-Z]'), (match) => '-${match[0]!.toLowerCase()}');
}

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
/// ### Examples
///
/// ```html
/// &lt;button style="display: block; background-color: red">
///   Delete
/// &lt;/button>
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
///     final result = rtl.render(
///       react.button({'style': {
///         'display': 'block',
///         'backgroundColor': 'red',
///       }}, 'Delete'),
///     );
///
///     // Use react_testing_library queries to store references to the node(s)
///     final button = result.getByRole('button', name: 'Delete');
///
///     // Use the `hasStyles` matcher as the second argument of `expect()`
///     expect(button, hasStyles('display: block'));
///     expect(button, hasStyles({'display': 'block'}));
///     expect(button, hasStyles('''
///       background-color: red;
///       display: block;
///     '''));
///     expect(button, hasStyles({
///       'backgroundColor': 'red',
///       'display': 'block',
///     }));
///     expect(button, isNot(hasStyles('''
///       background-color: blue;
///       display: block;
///     ''')));
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
Matcher hasStyles(Object styles) => _HasStyles(styles);

class _HasStyles extends CustomMatcher {
  final Object expectedStyles;
  final Map<String, dynamic> expectedStylesAsMap;

  _HasStyles(this.expectedStyles)
      : expectedStylesAsMap = _convertStylesToMap(expectedStyles),
        super('A element with styles', 'styles', _convertStylesToMap(expectedStyles));

  @override
  featureValueOf(item) {
    Element element;
    try {
      element = item as Element;
    } catch (_) {
      // If its not an element, the mismatch description will say so.
      return null;
    }

    final allComputedStyles = element.getComputedStyle();
    final stylesToCompare = <String, dynamic>{};
    final invalidPropertyNames =
        expectedStylesAsMap.keys.where((propertyName) => !allComputedStyles.supportsProperty(propertyName));
    if (invalidPropertyNames.isNotEmpty) {
      throw ArgumentError.value(invalidPropertyNames, 'style',
          'One or more property names is not supported by the browser you are testing in.');
    }
    expectedStylesAsMap.keys.forEach((stylePropertyToCheck) {
      final actualValue = allComputedStyles.getPropertyValue(stylePropertyToCheck);
      stylesToCompare[stylePropertyToCheck] = normalizeValue(stylePropertyToCheck, actualValue);
    });
    return stylesToCompare;
  }

  @override
  Description describeMismatch(item, Description mismatchDescription, Map matchState, bool verbose) {
    if (item is! Element) {
      return mismatchDescription..add(notAnElementMismatchDescription);
    }

    return super.describeMismatch(item, mismatchDescription, matchState, verbose);
  }

  static Map<String, dynamic> _convertStylesToMap(Object styles) {
    var styleMap = <String, dynamic>{};
    if (styles is String) {
      RegExp(r'\b(.+):\s*(.+)\b((\W){0,1})').allMatches(styles).forEach((match) {
        final propertyName = match.group(1);
        final closingParenWithinValue = match.group(3);
        final value = closingParenWithinValue.isNotEmpty ? '${match.group(2)}$closingParenWithinValue' : match.group(2);
        styleMap[propertyName] = value.replaceAll(';', '');
      });
    } else if (styles is Map) {
      styleMap = styles.cast<String, dynamic>();
    } else {
      throw ArgumentError.value(styles, 'styles', 'Must be a String or a Map');
    }

    return styleMap.map((propertyName, value) => MapEntry(propertyName, normalizeValue(propertyName, value)));
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
      return match.group(1);
    });

    if (normalizedValue is String) {
      normalizedValue = num.tryParse(normalizedValue as String) ?? normalizedValue;
    }

    return normalizedValue;
  }

  /// Normalize named/hex colors so that they match as expected with the
  /// Rgb value that is always returned from getComputedStyles()
  static dynamic normalizeColorValue(dynamic possibleColorValue) {
    final valueAsColor = ColorParser().parse(possibleColorValue.toString());
    if (valueAsColor != null) {
      if (RgbColor.namedColors.containsKey(possibleColorValue)) {
        return RgbColor.namedColors[possibleColorValue].toCssString();
      }

      final rgbColor = valueAsColor.toRgbColor();
      return 'rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})';
    }

    return possibleColorValue;
  }
}

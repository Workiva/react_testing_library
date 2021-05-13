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

@JS()
library react_testing_library.src.dom.matches.types;

import 'dart:html';

import 'package:js/js.dart';
import 'package:meta/meta.dart';

import 'package:react_testing_library/src/dom/matches/get_default_normalizer.dart';
import 'package:react_testing_library/src/util/error_message_utils.dart';

/// {@template TextMatchArgDescription}
/// This argument can be set to a `String`, `RegExp`, or a `Function` which returns `true` for a match and `false` for a mismatch.
///
/// See the [JS `TextMatch` docs](https://testing-library.com/docs/queries/about#textmatch) for more details
/// and examples.
/// {@endtemplate}
@sealed
abstract class TextMatch {
  /// Parses the provided [value], checking its type and returning a value compatible with the JS `TextMatch` type.
  ///
  /// See: <https://testing-library.com/docs/queries/about#textmatch>
  static dynamic toJs(dynamic value) {
    if (value is RegExp) {
      // Display the regex as the value that could not be matched to the consumer in the test failure message
      // instead of the string representation of the `dartValue` (interop'd function) set below.
      setEphemeralElementErrorMessage(_replaceDartInteropFunctionStringWith('$value'));

      // Set the value to a function to be called on the JS side, and do the actual
      // regex matching using a Dart regex within that interop'd function call.
      final regExp = value;
      bool dartValue(String content, Element _) => regExp.hasMatch(content);
      return allowInterop(dartValue);
    } else if (value is Function) {
      // Display the nicest string representation of the Dart function that we can as the value that
      // could not be matched to the consumer in the test failure message instead of the string
      // representation of the interop `value` set below.
      setEphemeralElementErrorMessage(
          _replaceDartInteropFunctionStringWith('$functionValueErrorMessage\n\n    $value\n\n'));

      // Set the value to an interop'd function.
      return allowInterop<Function>(value);
    } else if (value is! String) {
      throw ArgumentError('Argument must be a String, a RegExp or a function that returns a bool.');
    }

    return value;
  }

  /// Returns a function to be used as the value of `JsConfig.getElementError` that ensures the user does
  /// not see the portion of the `originalMessage` that obfuscates the `TextMatch` argument value they provided
  /// when a query failure occurs in a unit test.
  ///
  /// In other words, it ensures that a user never sees a failure message of the form:
  ///
  /// ```
  /// TestingLibraryElementError: Unable to find an element with the <some_attribute_name>: function(...args) {
  ///   return dart.dcall(f, args);
  /// }
  /// ```
  ///
  /// And instead, they see the [newValue] provided - which should contain a more helpful message that includes
  /// the value they provided as the `TextMatch` argument.
  static Object Function(Object originalMessage, Element container) _replaceDartInteropFunctionStringWith(
      Object newValue) {
    final dartInteropFunctionValueRegex = RegExp(r'([\"`]*)(function[\s\S]+})([\"`]*)(.*)([\s\S]+)*', multiLine: true);

    return (originalMessage, container) {
      final newMessage = originalMessage.toString().replaceAllMapped(dartInteropFunctionValueRegex, (match) {
        final optionalOpeningQuoteOrBacktick = match.group(1);
        final optionalClosingQuoteOrBacktick = match.group(3);
        final newValueLines = newValue.toString().split('\n');
        var restOfMessageBeforePrettyDomOrAccessibleRolesPrintout = match.group(4);
        if (newValueLines.length > 1) {
          // Prevent the first sentence after the multiline function signature from starting with "  . ".
          restOfMessageBeforePrettyDomOrAccessibleRolesPrintout =
              restOfMessageBeforePrettyDomOrAccessibleRolesPrintout.replaceFirst(RegExp(r'^\s*\.*\s*'), '');
        }
        var returnValue = '${newValueLines.join('\n')}$restOfMessageBeforePrettyDomOrAccessibleRolesPrintout';
        if (optionalOpeningQuoteOrBacktick.isNotEmpty || optionalClosingQuoteOrBacktick.isNotEmpty) {
          // Restore quotes around the function/regexp portion of the new value if they were previously found around
          // the `function...` dart interop portion of the original message.
          returnValue = returnValue.replaceAllMapped(
              RegExp(r'((Closure.*(?=\n)|RegExp.*\/(?=(\.|\n)*)))'), (match) => '"${match.group(1)}"');
        }
        return returnValue;
      });

      return newMessage;
    };
  }

  @visibleForTesting
  static const functionValueErrorMessage = 'that would result in the following conditional returning true:';
}

@JS()
@anonymous
class MatcherOptions {
  /// {@template MatcherOptionsExactArgDescription}
  /// ### [exact]
  ///
  /// Defaults to `true`; matches full strings, case-sensitive. When `false`, matches substrings and is
  /// not case-sensitive. It has no effect on regex or function arguments. In most cases using a regex
  /// instead of a string gives you more control over fuzzy matching and should be preferred over `exact: false`.
  /// {@endtemplate}
  external bool get exact;
  external set exact(bool value);

  /// {@template MatcherOptionsNormalizerArgDescription}
  /// ### [normalizer]
  ///
  /// An optional function which overrides normalization behavior.
  ///
  /// Before running any matching logic against text in the DOM, DOM Testing Library automatically
  /// normalizes that text. By default, normalization consists of trimming whitespace from the start
  /// and end of text, and collapsing multiple adjacent whitespace characters into a single space.
  ///
  /// If you want to prevent that normalization, or provide alternative normalization
  /// _(e.g. to remove Unicode control characters)_, you can provide a [normalizer] function.
  /// This function will be given a string and is expected to return a normalized version of that string.
  ///
  /// > **NOTE:** Specifying a value for [normalizer] replaces the built-in normalization, but you can call
  /// > [getDefaultNormalizer] to obtain a built-in normalizer, either to adjust that normalization
  /// > or to call it from your own normalizer.
  ///
  /// See the [JS `TextMatch` precision](https://testing-library.com/docs/queries/about#precision) and
  /// [JS `TextMatch` normalization](https://testing-library.com/docs/queries/about#normalization) docs
  /// for more details and examples.
  /// {@endtemplate}
  external NormalizerFn Function([NormalizerOptions]) get normalizer;
  external set normalizer(NormalizerFn Function([NormalizerOptions]) value);

  /// {@template MatcherOptionsSelectorArgDescription}
  /// ### [selector]
  ///
  /// Set `selector` to a CSS selector that will narrow the scope of the existing query to
  /// only match element(s) that match the selector.
  /// {@endtemplate}
  external String get selector;
  external set selector(String value);

  /// {@template MatcherOptionsIgnoreArgDescription}
  /// ### [ignore]
  ///
  /// The ignore option accepts a query selector.
  ///
  /// If the node.matches returns true for that selector, the node will be ignored.
  /// This defaults to 'script' because generally you don't want to select script tags,
  /// but if your content is in an inline script file, then the script tag could be returned.
  ///
  /// If you'd rather disable this behavior, set ignore to false.
  /// {@endtemplate}
  external /*String|bool*/ dynamic get ignore;
  external set ignore(/*String|bool*/ dynamic value);
}

/// Options to be passed into a custom [NormalizerFn].
@JS()
@anonymous
class NormalizerOptions {
  /// Whether leading / trailing whitespace will be trimmed.
  external bool get trim;

  /// Whether leading / trailing whitespace should be trimmed.
  external set trim(bool value);

  /// Whether multiple spaces will be collapsed into a single space.
  external bool get collapseWhitespace;

  /// Whether multiple spaces should be collapsed into a single space.
  external set collapseWhitespace(bool value);
}

/// The function signature for a custom `normalizer` argument in a query.
typedef NormalizerFn = String Function(String);

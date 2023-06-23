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
library react_testing_library.src.dom.pretty_dom;

import 'dart:html' show Node;

import 'package:js/js.dart';

/// Returns a readable representation of the DOM tree of the given [node].
///
/// This can be helpful when debugging tests:
///
/// ```dart
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// main() {
///   test('', () {
///     final view = rtl.render(someReactVDom);
///     print(rtl.prettyDOM(view.container));
///   });
/// }
/// ```
///
/// ## Options
///
/// `prettyDOM` is built atop [Jest's `prettyFormat` function](https://github.com/facebook/jest/tree/master/packages/pretty-format),
/// which has many options that are only relevant when formatting JavaScript code, not HTML. Because of this,
/// the options exposed here are a subset of the [`prettyFormat` options](https://github.com/facebook/jest/tree/master/packages/pretty-format#usage-with-options).
///
/// ### [maxLength]
/// An optional argument to limit the size of the resulting string output, for cases when it becomes too large.
///
/// {@macro prettyDomOptionsIndent}
/// {@macro prettyDomOptionsMaxDepth}
/// {@macro prettyDomOptionsMin}
///
/// > **At this time, formatting plugins and syntax highlighting are not supported.**
///
/// See the [JS `prettyDOM` docs](https://testing-library.com/docs/dom-testing-library/api-debugging/#prettydom) for more details and examples.
String prettyDOM(
  Node? node, {
  int? maxLength,
  int? indent,
  int? maxDepth,
  bool? min,
}) {
  final options = PrettyDomOptions();
  if (indent != null) options.indent = indent;
  if (maxDepth != null) options.maxDepth = maxDepth;
  if (min != null) options.min = min;

  return _jsPrettyDOM(node, maxLength, options);
}

@JS('rtl.prettyDOM')
external String _jsPrettyDOM([
  Node? dom,
  int? maxLength,
  PrettyDomOptions? options,
]);

/// A subset of <https://github.com/facebook/jest/tree/master/packages/pretty-format#usage-with-options>
/// that make sense given that [prettyDOM] is intended to format HTML output only.
@JS()
@anonymous
class PrettyDomOptions {
  /// {@template prettyDomOptionsIndent}
  /// ### [indent]
  /// The number of spaces in each level of indentation, defaulting to `2`.
  /// {@endtemplate}
  external int get indent;
  external set indent(int value);

  /// {@template prettyDomOptionsMaxDepth}
  /// ### [maxDepth]
  /// The number of nested levels to print in the DOM tree.
  /// {@endtemplate}
  external int get maxDepth;
  external set maxDepth(int value);

  /// {@template prettyDomOptionsMin}
  /// ### [min]
  /// Whether to minimize added space: no indentation nor line breaks. Defaults to `false`.
  /// {@endtemplate}
  external bool get min;
  external set min(bool value);
}

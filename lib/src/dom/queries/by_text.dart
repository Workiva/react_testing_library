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

/// https://testing-library.com/docs/queries/bytext/
///
/// {@template PreferByRoleNote}
/// __Prefer__ using [`ByRole` queries](https://workiva.github.io/react_testing_library/topics/ByRole-topic.html)
/// when possible in order to query for elements in a way that
/// [most reflects how the user would interact with them](https://testing-library.com/docs/queries/about#priority).
/// {@endtemplate}
@JS()
library react_testing_library.src.dom.queries.by_text;

import 'dart:html' show Element, Node;

import 'package:js/js.dart';

import 'package:react_testing_library/src/dom/async/types.dart';
import 'package:react_testing_library/src/dom/async/wait_for.dart';
import 'package:react_testing_library/src/dom/matches/types.dart';
import 'package:react_testing_library/src/dom/queries/interface.dart';
import 'package:react_testing_library/src/util/error_message_utils.dart' show withErrorInterop;

/// PRIVATE. Do not export from this library.
///
/// The public API is either the top level function by the same name as the methods in here,
/// or the methods by the same name exposed by `screen` / `within()`.
///
///
mixin ByTextQueries on IQueries {
  /// Returns a single element with the given [text] content, defaulting to an [exact] match.
  ///
  /// Throws if no element is found.
  /// Use [queryByText] if a RTE is not expected.
  ///
  /// {@macro PreferByRoleNote}
  ///
  /// > Related: [getAllByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// {@template ByTextExample}
  /// ## Example
  ///
  /// > The example below demonstrates the usage of the `getByText` query. However, the example
  /// is also relevant for `getAllByText`, `queryByText`, `queryAllByText`, `findByText`
  /// and `findAllByText`.
  /// >
  /// > Read more about the different [types of queries](https://testing-library.com/docs/queries/about#types-of-queries) to gain more clarity on which one suits your use-cases best.
  ///
  /// ```html
  /// <a href="/about">About ℹ️</a>
  /// ```
  ///
  /// ```dart
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show isInTheDocument;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:test/test.dart';
  ///
  /// main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above
  ///     final view = rtl.render(
  ///       react.a({'href': '/about'}, 'About ℹ️'),
  ///     );
  ///
  ///     final aboutAnchorNode = view.getByText(RegExp(r'^About'));
  ///     expect(aboutAnchorNode, isInTheDocument);
  ///   });
  /// }
  /// ```
  /// {@endtemplate}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  /// {@macro MatcherOptionsIgnoreArgDescription}
  E getByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions]) normalizer,
    String selector,
    /*String|bool*/ dynamic ignore = 'script',
  }) =>
      withErrorInterop(
        () => _jsGetByText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore),
        ) as E,
      );

  /// Returns a list of elements with the given [text] content, defaulting to an [exact] match.
  ///
  /// Throws if no elements are found.
  /// Use [queryAllByText] if a RTE is not expected.
  ///
  /// {@macro PreferByRoleNote}
  ///
  /// > Related: [getByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// {@macro ByTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  /// {@macro MatcherOptionsIgnoreArgDescription}
  List<E> getAllByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions]) normalizer,
    String selector,
    /*String|bool*/ dynamic ignore = 'script',
  }) =>
      withErrorInterop(
        () => _jsGetAllByText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore),
        ).cast<E>(), // <vomit/> https://github.com/dart-lang/sdk/issues/37676
      );

  /// Returns a single element with the given [text] content, defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found.
  /// Use [getByText] if a RTE is expected.
  ///
  /// {@macro PreferByRoleNote}
  ///
  /// > Related: [queryAllByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// {@macro ByTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  /// {@macro MatcherOptionsIgnoreArgDescription}
  E queryByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions]) normalizer,
    String selector,
    /*String|bool*/ dynamic ignore = 'script',
  }) =>
      _jsQueryByText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore),
      ) as E;

  /// Returns a list of elements with the given [text] content, defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByText] if a RTE is expected.
  ///
  /// {@macro PreferByRoleNote}
  ///
  /// > Related: [queryByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// {@macro ByTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  /// {@macro MatcherOptionsIgnoreArgDescription}
  List<E> queryAllByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions]) normalizer,
    String selector,
    /*String|bool*/ dynamic ignore = 'script',
  }) =>
      _jsQueryAllByText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore),
      ).cast<E>(); // <vomit/> https://github.com/dart-lang/sdk/issues/37676

  /// Returns a future with a single element value with the given [text] content, defaulting to an [exact] match after
  /// waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByText] or [queryByText] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// {@macro PreferByRoleNote}
  ///
  /// > Related: [findAllByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// {@macro ByTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  /// {@macro MatcherOptionsIgnoreArgDescription}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<E> findByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions]) normalizer,
    String selector,
    /*String|bool*/ dynamic ignore = 'script',
    Duration timeout,
    Duration interval,
    QueryTimeoutFn onTimeout,
    MutationObserverOptions mutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getByText` instead of an
    // interop like `_jsFindByText` to give consumers better async stack traces.
    return waitFor(
      () => getByText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        selector: selector,
        ignore: ignore,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
    );
  }

  /// Returns a list of elements with the given [text] content, defaulting to an [exact] match after
  /// waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByText] or [queryByText] in a `waitFor` function.
  ///
  /// Throws if no elements are found.
  ///
  /// {@macro PreferByRoleNote}
  ///
  /// > Related: [findByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// {@macro ByTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  /// {@macro MatcherOptionsIgnoreArgDescription}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<List<E>> findAllByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions]) normalizer,
    String selector,
    /*String|bool*/ dynamic ignore = 'script',
    Duration timeout,
    Duration interval,
    QueryTimeoutFn onTimeout,
    MutationObserverOptions mutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getAllByText` instead of an
    // interop like `_jsFindAllByText` to give consumers better async stack traces.
    return waitFor(
      () => getAllByText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        selector: selector,
        ignore: ignore,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
    );
  }
}

@JS('rtl.getByText')
external Element _jsGetByText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions options,
]);

@JS('rtl.getAllByText')
external List< /*Element*/ dynamic> _jsGetAllByText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions options,
]);

@JS('rtl.queryByText')
external Element _jsQueryByText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions options,
]);

@JS('rtl.queryAllByText')
external List< /*Element*/ dynamic> _jsQueryAllByText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions options,
]);

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

/// https://testing-library.com/docs/queries/byplaceholdertext/
@JS()
library react_testing_library.src.dom.queries.by_placeholder_text;

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
mixin ByPlaceholderTextQueries on IQueries {
  /// Returns a single element with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match.
  ///
  /// Throws if no element is found.
  /// Use [queryByPlaceholderText] if a RTE is not expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [getAllByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// {@template ByPlaceholderTextExample}
  /// ## Example
  ///
  /// > The examples below demonstrate the usage of the `getByDisplayValue` query. However, the example
  /// is also relevant for `getAllByPlaceholderText`, `queryByPlaceholderText`, `queryAllByPlaceholderText`, `findByPlaceholderText`
  /// and `findAllByPlaceholderText`.
  /// >
  /// > Read more about the different [types of queries](https://testing-library.com/docs/queries/about#types-of-queries) to gain more clarity on which one suits your use-cases best.
  ///
  /// ```html
  /// <input type="text" placeholder="Username" />
  /// ```
  ///
  /// ```dart
  /// import 'package:react/react.dart' as react;
  /// 
  /// 
  /// import 'package:test/test.dart';
  ///
  /// main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above
  ///     final view = rtl.render(
  ///       react.input({
  ///         'type': 'text',
  ///         'placeholder': 'Username',
  ///       }),
  ///     );
  ///
  ///     expect(view.getByPlaceholderText('Username'), isInTheDocument);
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
  E getByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      withErrorInterop(
        () => _jsGetByPlaceholderText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer),
        ) as E,
      );

  /// Returns a list of elements with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match.
  ///
  /// Throws if no elements are found.
  /// Use [queryAllByPlaceholderText] if a RTE is not expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [getByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// {@macro ByPlaceholderTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  List<E> getAllByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      withErrorInterop(
        () => _jsGetAllByPlaceholderText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer),
        ).cast<E>(), // <vomit/> https://github.com/dart-lang/sdk/issues/37676
      );

  /// Returns a single element with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found.
  /// Use [getByPlaceholderText] if a RTE is expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [queryAllByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// {@macro ByPlaceholderTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  E? queryByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      _jsQueryByPlaceholderText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer),
      ) as E?;

  /// Returns a list of elements with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByPlaceholderText] if a RTE is expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [queryByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// {@macro ByPlaceholderTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  List<E> queryAllByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      _jsQueryAllByPlaceholderText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer),
      ).cast<E>(); // <vomit/> https://github.com/dart-lang/sdk/issues/37676

  /// Returns a future with a single element value with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match after waiting `1000ms` (or the specified [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByPlaceholderText] or [queryByPlaceholderText] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [findAllByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// {@macro ByPlaceholderTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<E> findByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    Duration? timeout,
    Duration interval = defaultAsyncCallbackCheckInterval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getByPlaceholderText` instead of an
    // interop like `_jsFindByPlaceholderText` to give consumers better async stack traces.
    return waitFor(
      () => getByPlaceholderText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions,
    );
  }

  /// Returns a list of elements with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match after waiting `1000ms` (or the specified [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByPlaceholderText] or [queryByPlaceholderText] in a `waitFor` function.
  ///
  /// Throws if no elements are found.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [findByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// {@macro ByPlaceholderTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<List<E>> findAllByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    Duration? timeout,
    Duration interval = defaultAsyncCallbackCheckInterval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getAllByPlaceholderText` instead of an
    // interop like `_jsFindAllByPlaceholderText` to give consumers better async stack traces.
    return waitFor(
      () => getAllByPlaceholderText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions,
    );
  }
}

@JS('rtl.getByPlaceholderText')
external Element _jsGetByPlaceholderText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.getAllByPlaceholderText')
external List< /*Element*/ dynamic> _jsGetAllByPlaceholderText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.queryByPlaceholderText')
external Element? _jsQueryByPlaceholderText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.queryAllByPlaceholderText')
external List< /*Element*/ dynamic> _jsQueryAllByPlaceholderText(
  Node container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

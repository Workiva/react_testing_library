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
  /// > Related: [getAllByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsErrorMessage}
  E getByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
  }) =>
      withErrorInterop(
          () => _jsGetByPlaceholderText(
              getContainerForScope(), TextMatch.toJs(text), buildMatcherOptions(exact: exact, normalizer: normalizer)),
          errorMessage: errorMessage);

  /// Returns a list of elements with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match.
  ///
  /// Throws if no elements are found.
  /// Use [queryAllByPlaceholderText] if a RTE is not expected.
  ///
  /// > Related: [getByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsErrorMessage}
  List<E> getAllByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
  }) =>
      withErrorInterop(
          () => _jsGetAllByPlaceholderText(getContainerForScope(), TextMatch.toJs(text),
                  buildMatcherOptions(exact: exact, normalizer: normalizer))
              // <vomit/> https://dartpad.dev/6d3df9e7e03655ed33f5865596829ef5
              .cast<E>(),
          errorMessage: errorMessage);

  /// Returns a single element with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found.
  /// Use [getByPlaceholderText] if a RTE is expected.
  ///
  /// > Related: [queryAllByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  E queryByPlaceholderText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
  }) =>
      _jsQueryByPlaceholderText(
          getContainerForScope(), TextMatch.toJs(text), buildMatcherOptions(exact: exact, normalizer: normalizer));

  /// Returns a list of elements with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByPlaceholderText] if a RTE is expected.
  ///
  /// > Related: [queryByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
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
    NormalizerFn Function(NormalizerOptions) normalizer,
  }) =>
      _jsQueryAllByPlaceholderText(
              getContainerForScope(), TextMatch.toJs(text), buildMatcherOptions(exact: exact, normalizer: normalizer))
          // <vomit/> https://dartpad.dev/6d3df9e7e03655ed33f5865596829ef5
          .cast<E>();

  /// Returns a future with a single element value with the given [text] as the value of the `placeholder` attribute,
  /// defaulting to an [exact] match after waiting `1000ms` (or the specified [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByPlaceholderText] or [queryByPlaceholderText] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// > Related: [findAllByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsErrorMessage}
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
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
    Duration timeout,
    Duration interval,
    QueryTimeoutFn onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart waitFor as a wrapper instead of calling _jsFindByPlaceholderText for consistency with our
    // need to use it on the analogous `findAllByPlaceholderText` query.
    return waitFor(
      () => getByPlaceholderText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        errorMessage: errorMessage,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
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
  /// > Related: [findByPlaceholderText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byplaceholdertext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsErrorMessage}
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
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
    Duration timeout,
    Duration interval,
    QueryTimeoutFn onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart waitFor as a wrapper instead of calling _jsFindAllByPlaceholderText because of the inability
    // to call `.cast<E>` on the list before returning to consumers (https://dartpad.dev/6d3df9e7e03655ed33f5865596829ef5)
    // like we can/must on the `getAllByPlaceholderText` return value.
    return waitFor(
      () => getAllByPlaceholderText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        errorMessage: errorMessage,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
    );
  }
}

@JS('rtl.getByPlaceholderText')
external Element _jsGetByPlaceholderText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

@JS('rtl.getAllByPlaceholderText')
external List<Element> _jsGetAllByPlaceholderText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

@JS('rtl.queryByPlaceholderText')
external Element _jsQueryByPlaceholderText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

@JS('rtl.queryAllByPlaceholderText')
external List<Element> _jsQueryAllByPlaceholderText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

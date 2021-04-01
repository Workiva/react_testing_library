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
mixin ByTextQueries on IQueries {
  /// Returns a single element with the given [text] content, defaulting to an [exact] match.
  ///
  /// Throws if no element is found.
  /// Use [queryByText] if a RTE is not expected.
  ///
  /// > Related: [getAllByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  /// {@macro MatcherOptionsIgnoreArgDescription}
  /// {@macro MatcherOptionsErrorMessage}
  E getByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
    String selector,
    /*String|bool*/ ignore = 'script',
  }) =>
      withErrorInterop(
          () => _jsGetByText(getContainerForScope(), TextMatch.parse(text),
              buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore)),
          errorMessage: errorMessage);

  /// Returns a list of elements with the given [text] content, defaulting to an [exact] match.
  ///
  /// Throws if no elements are found.
  /// Use [queryAllByText] if a RTE is not expected.
  ///
  /// > Related: [getByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsErrorMessage}
  List<E> getAllByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
    String selector,
    /*String|bool*/ ignore = 'script',
  }) =>
      withErrorInterop(
          () => _jsGetAllByText(getContainerForScope(), TextMatch.parse(text),
                  buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore))
              // <vomit/> https://dartpad.dev/6d3df9e7e03655ed33f5865596829ef5
              .cast<E>(),
          errorMessage: errorMessage);

  /// Returns a single element with the given [text] content, defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found.
  /// Use [getByText] if a RTE is expected.
  ///
  /// > Related: [queryAllByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  E queryByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String selector,
    /*String|bool*/ ignore = 'script',
  }) =>
      _jsQueryByText(getContainerForScope(), TextMatch.parse(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore));

  /// Returns a list of elements with the given [text] content, defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByText] if a RTE is expected.
  ///
  /// > Related: [queryByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  List<E> queryAllByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String selector,
    /*String|bool*/ ignore = 'script',
  }) =>
      _jsQueryAllByText(getContainerForScope(), TextMatch.parse(text),
              buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector, ignore: ignore))
          // <vomit/> https://dartpad.dev/6d3df9e7e03655ed33f5865596829ef5
          .cast<E>();

  /// Returns a future with a single element value with the given [text] content, defaulting to an [exact] match after
  /// waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByText] or [queryByText] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// > Related: [findAllByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
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
  Future<E> findByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
    String selector,
    /*String|bool*/ ignore = 'script',
    Duration timeout,
    Duration interval,
    QueryTimeoutFn onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart waitFor as a wrapper instead of calling _jsFindByText for consistency with our
    // need to use it on the analogous `findAllByText` query.
    return waitFor(
      () => getByText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        selector: selector,
        ignore: ignore,
        errorMessage: errorMessage,
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
  /// > Related: [findByText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bytext/>
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
  Future<List<E>> findAllByText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function(NormalizerOptions) normalizer,
    String errorMessage,
    String selector,
    /*String|bool*/ ignore = 'script',
    Duration timeout,
    Duration interval,
    QueryTimeoutFn onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart waitFor as a wrapper instead of calling _jsFindAllByText because of the inability
    // to call `.cast<E>` on the list before returning to consumers (https://dartpad.dev/6d3df9e7e03655ed33f5865596829ef5)
    // like we can/must on the `getAllByText` return value.
    return waitFor(
      () => getAllByText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        selector: selector,
        ignore: ignore,
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

@JS('rtl.getByText')
external Element _jsGetByText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

@JS('rtl.getAllByText')
external List<Element> _jsGetAllByText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

@JS('rtl.queryByText')
external Element _jsQueryByText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

@JS('rtl.queryAllByText')
external List<Element> _jsQueryAllByText(
  Node container,
  /*TextMatch*/
  text, [
  MatcherOptions options,
]);

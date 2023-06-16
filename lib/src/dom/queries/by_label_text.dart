// @dart = 2.12

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

/// https://testing-library.com/docs/queries/bylabeltext/
@JS()
library react_testing_library.src.dom.queries.by_label_text;

import 'dart:html' show Element, LabelElement, Node;

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
mixin ByLabelTextQueries on IQueries {
  /// Returns a single element that is associated with a [LabelElement] with the given [text],
  /// defaulting to an [exact] match.
  ///
  /// Throws if no element is found.
  /// Use [queryByLabelText] if a RTE is not expected.
  ///
  /// > Related: [getAllByLabelText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bylabeltext/>
  ///
  /// {@template ByLabelTextExample}
  /// ## Example
  ///
  /// > The examples below demonstrate the usage of the `getByDisplayValue` query. However, the example
  /// is also relevant for `getAllByLabelText`, `queryByLabelText`, `queryAllByLabelText`, `findByLabelText`
  /// and `findAllByLabelText`.
  /// >
  /// > Read more about the different [types of queries](https://testing-library.com/docs/queries/about#types-of-queries) to gain more clarity on which one suits your use-cases best.
  ///
  /// The example below will find the input node for the following DOM structures:
  ///
  /// ```html
  /// // for/htmlFor relationship between label and form element id
  /// <label for="username-input">Username</label>
  /// <input id="username-input" />
  ///
  /// // The aria-labelledby attribute with form elements
  /// <label id="username-label">Username</label>
  /// <input aria-labelledby="username-label" />
  ///
  /// // Wrapper labels
  /// <label>Username <input /></label>
  ///
  /// // Wrapper labels where the label text is in another child element
  /// <label>
  ///   <span>Username</span>
  ///   <input />
  /// </label>
  ///
  /// // aria-label attributes
  /// // Take care because this is not a label that users can see on the page,
  /// // so the purpose of your input must be obvious to visual users.
  /// <input aria-label="username" />
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
  ///     // Render some of the DOM shown in the example snippet above
  ///     final view = rtl.render(react.div({},
  ///       react.label({'htmlFor': 'username-input'}, 'Username'),
  ///       react.input({
  ///         'type': 'text',
  ///         'id': 'username-input',
  ///       }),
  ///     ));
  ///
  ///     expect(view.getByLabelText('Username'), isInTheDocument);
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
  E getByLabelText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    String? selector,
  }) =>
      withErrorInterop(
        () => _jsGetByLabelText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector),
        ) as E,
      );

  /// Returns a list of elements that are associated with a [LabelElement] with the given [text],
  /// defaulting to an [exact] match.
  ///
  /// Throws if no elements are found.
  /// Use [queryAllByLabelText] if a RTE is not expected.
  ///
  /// > Related: [getByLabelText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bylabeltext/>
  ///
  /// {@macro ByLabelTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  List<E> getAllByLabelText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    String? selector,
  }) =>
      withErrorInterop(
        () => _jsGetAllByLabelText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector),
        ).cast<E>(), // <vomit/> https://github.com/dart-lang/sdk/issues/37676
      );

  /// Returns a single element that is associated with a [LabelElement] with the given [text],
  /// defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found.
  /// Use [getByLabelText] if a RTE is expected.
  ///
  /// > Related: [queryAllByLabelText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bylabeltext/>
  ///
  /// {@macro ByLabelTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  E queryByLabelText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    String? selector,
  }) =>
      _jsQueryByLabelText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector),
      ) as E;

  /// Returns a list of elements that are associated with a [LabelElement] with the given [text],
  /// defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByLabelText] if a RTE is expected.
  ///
  /// > Related: [queryByLabelText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bylabeltext/>
  ///
  /// {@macro ByLabelTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  List<E> queryAllByLabelText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    String? selector,
  }) =>
      _jsQueryAllByLabelText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer, selector: selector),
      ).cast<E>(); // <vomit/> https://github.com/dart-lang/sdk/issues/37676

  /// Returns a future with a single element that is associated with a [LabelElement] with the given [text],
  /// defaulting to an [exact] match after waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByLabelText] or [queryByLabelText] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// > Related: [findAllByLabelText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bylabeltext/>
  ///
  /// {@macro ByLabelTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<E> findByLabelText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    String? selector,
    Duration? timeout,
    Duration? interval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions? mutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getByLabelText` instead of an
    // interop like `_jsFindByLabelText` to give consumers better async stack traces.
    return waitFor(
      () => getByLabelText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        selector: selector,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
    );
  }

  /// Returns a list of elements that are associated with a [LabelElement] with the given [text],
  /// defaulting to an [exact] match after waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByLabelText] or [queryByLabelText] in a `waitFor` function.
  ///
  /// Throws if no elements are found.
  ///
  /// > Related: [findByLabelText]
  ///
  /// > See: <https://testing-library.com/docs/queries/bylabeltext/>
  ///
  /// {@macro ByLabelTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro MatcherOptionsSelectorArgDescription}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<List<E>> findAllByLabelText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    String? selector,
    Duration? timeout,
    Duration? interval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions? mutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getAllByAltText` instead of an
    // interop like `_jsFindAllByAltText` to give consumers better async stack traces.
    return waitFor(
      () => getAllByLabelText<E>(
        text,
        exact: exact,
        normalizer: normalizer,
        selector: selector,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
    );
  }
}

@JS('rtl.getByLabelText')
external Element _jsGetByLabelText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.getAllByLabelText')
external List< /*Element*/ dynamic> _jsGetAllByLabelText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.queryByLabelText')
external Element _jsQueryByLabelText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.queryAllByLabelText')
external List< /*Element*/ dynamic> _jsQueryAllByLabelText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

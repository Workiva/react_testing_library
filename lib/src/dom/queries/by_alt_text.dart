// @dart = 2.18

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

/// https://testing-library.com/docs/queries/byalttext/
///
/// {@template PreferByRoleOrByLabelTextNote}
/// __Prefer__ using [`ByRole` queries](https://workiva.github.io/react_testing_library/topics/ByRole-topic.html)
/// for [ImageElement]s and [`ByLabelText` queries](https://workiva.github.io/react_testing_library/topics/ByLabelText-topic.html)
/// for [InputElement]s and [AreaElement]s when possible in order to query for elements
/// in a way that [most reflects how the user would interact with them](https://testing-library.com/docs/queries/about#priority).
/// {@endtemplate}
@JS()
library react_testing_library.src.dom.queries.by_alt_text;

import 'dart:html' show AreaElement, Element, ImageElement, InputElement, Node;

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
mixin ByAltTextQueries on IQueries {
  /// Returns a single [ImageElement], [InputElement] or [AreaElement] with the given [text] as the value of
  /// the `alt` attribute, defaulting to an [exact] match.
  ///
  /// Throws if no element is found.
  /// Use [queryByAltText] if a RTE is not expected.
  ///
  /// {@macro PreferByRoleOrByLabelTextNote}
  ///
  /// > Related: [getAllByAltText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byalttext/>
  ///
  /// {@template ByAltTextExample}
  /// ## Example
  ///
  /// > The example below demonstrates the usage of the `getByAltText` query. However, the example
  /// is also relevant for `getAllByAltText`, `queryByAltText`, `queryAllByAltText`, `findByAltText`
  /// and `findAllByAltText`.
  /// >
  /// > Read more about the different [types of queries](https://testing-library.com/docs/queries/about#types-of-queries) to gain more clarity on which one suits your use-cases best.
  ///
  /// ```html
  /// <img alt="Incredibles 2 Poster" src="/incredibles-2.png" />
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
  ///       react.img({'alt': 'Incredibles 2 Poster', 'src': '/incredibles-2.png'}),
  ///     );
  ///
  ///     expect(view.getByAltText(RegExp(r'incredibles.*? poster')), isInTheDocument);
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
  E getByAltText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      withErrorInterop(
        () => _jsGetByAltText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer),
        ) as E,
      );

  /// Returns a list of [ImageElement]s, [InputElement]s and/or [AreaElement]s  with the given [text] as the value of
  /// the `alt` attribute, defaulting to an [exact] match.
  ///
  /// Throws if no elements are found.
  /// Use [queryAllByAltText] if a RTE is not expected.
  ///
  /// {@macro PreferByRoleOrByLabelTextNote}
  ///
  /// > Related: [getByAltText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byalttext/>
  ///
  /// {@macro ByAltTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  List<E> getAllByAltText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      withErrorInterop(
        () => _jsGetAllByAltText(
          getContainerForScope(),
          TextMatch.toJs(text),
          buildMatcherOptions(exact: exact, normalizer: normalizer),
        ).cast<E>(), // <vomit/> https://github.com/dart-lang/sdk/issues/37676
      );

  /// Returns a single [ImageElement], [InputElement] or [AreaElement] with the given [text] as the value of
  /// the `alt` attribute, defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found.
  /// Use [getByAltText] if a RTE is expected.
  ///
  /// {@macro PreferByRoleOrByLabelTextNote}
  ///
  /// > Related: [queryAllByAltText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byalttext/>
  ///
  /// {@macro ByAltTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  E queryByAltText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      _jsQueryByAltText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer),
      ) as E;

  /// Returns a list of [ImageElement]s, [InputElement]s and/or [AreaElement]s  with the given [text] as the value of
  /// the `alt` attribute, defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByAltText] if a RTE is expected.
  ///
  /// {@macro PreferByRoleOrByLabelTextNote}
  ///
  /// > Related: [queryByAltText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byalttext/>
  ///
  /// {@macro ByAltTextExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [text]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  List<E> queryAllByAltText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      _jsQueryAllByAltText(
        getContainerForScope(),
        TextMatch.toJs(text),
        buildMatcherOptions(exact: exact, normalizer: normalizer),
      ).cast<E>(); // <vomit/> https://github.com/dart-lang/sdk/issues/37676

  /// Returns a future with a single [ImageElement], [InputElement] or [AreaElement] value with the given [text]
  /// as the value of the `alt` attribute, defaulting to an [exact] match after waiting `1000ms`
  /// (or the specified [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByAltText] or [queryByAltText] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// {@macro PreferByRoleOrByLabelTextNote}
  ///
  /// > Related: [findAllByAltText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byalttext/>
  ///
  /// {@macro ByAltTextExample}
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
  Future<E> findByAltText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    Duration? timeout,
    Duration? interval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions? mutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getByAltText` instead of an
    // interop like `_jsFindByAltText` to give consumers better async stack traces.
    return waitFor(
      () => getByAltText(
        text,
        exact: exact,
        normalizer: normalizer,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
    );
  }

  /// Returns a list of [ImageElement]s, [InputElement]s and/or [AreaElement]s with the given [text]
  /// as the value of the `alt` attribute, defaulting to an [exact] match after waiting `1000ms`
  /// (or the specified [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByAltText] or [queryByAltText] in a `waitFor` function.
  ///
  /// Throws if no elements are found.
  ///
  /// {@macro PreferByRoleOrByLabelTextNote}
  ///
  /// > Related: [findByAltText]
  ///
  /// > See: <https://testing-library.com/docs/queries/byalttext/>
  ///
  /// {@macro ByAltTextExample}
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
  Future<List<E>> findAllByAltText<E extends Element>(
    /*TextMatch*/ dynamic text, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    Duration? timeout,
    Duration? interval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions? mutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getAllByAltText` instead of an
    // interop like `_jsFindAllByAltText` to give consumers better async stack traces.
    return waitFor(
      () => getAllByAltText(
        text,
        exact: exact,
        normalizer: normalizer,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval ?? defaultAsyncCallbackCheckInterval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions ?? defaultMutationObserverOptions,
    );
  }
}

@JS('rtl.getByAltText')
external Element _jsGetByAltText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.getAllByAltText')
external List< /*Element*/ dynamic> _jsGetAllByAltText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.queryByAltText')
external Element _jsQueryByAltText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

@JS('rtl.queryAllByAltText')
external List< /*Element*/ dynamic> _jsQueryAllByAltText(
  Node? container,
  /*TextMatch*/ dynamic text, [
  MatcherOptions? options,
]);

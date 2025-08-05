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

/// https://testing-library.com/docs/queries/bydisplayvalue/
///
/// {@template PreferByLabelTextNote}
/// __Prefer__ using [`ByLabelText` queries](https://workiva.github.io/react_testing_library/topics/ByLabelText-topic.html)
/// for form elements when possible in order to query for elements in a way that
/// [most reflects how the user would interact with them](https://testing-library.com/docs/queries/about#priority).
/// {@endtemplate}
@JS()
library react_testing_library.src.dom.queries.by_display_value;

import 'dart:html' show Element, InputElement, Node, SelectElement, TextAreaElement;

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
mixin ByDisplayValueQueries on IQueries {
  /// Returns a single [InputElement], [TextAreaElement] or [SelectElement] that has the matching [value] displayed,
  /// defaulting to an [exact] match.
  ///
  /// Throws if no element is found.
  /// Use [queryByDisplayValue] if a RTE is not expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [getAllByDisplayValue]
  ///
  /// > See: <https://testing-library.com/docs/queries/bydisplayvalue/>
  ///
  /// {@template ByDisplayValueExample}
  /// ## Example
  ///
  /// > The examples below demonstrate the usage of the `getByDisplayValue` query. However, the example
  /// is also relevant for `getAllByDisplayValue`, `queryByDisplayValue`, `queryAllByDisplayValue`, `findByDisplayValue`
  /// and `findAllByDisplayValue`.
  /// >
  /// > Read more about the different [types of queries](https://testing-library.com/docs/queries/about#types-of-queries) to gain more clarity on which one suits your use-cases best.
  ///
  /// ```html
  /// <input type="text" name="lastName" value="Norris" />
  /// <textarea name="message">Hello World</textarea>
  /// <select name="usStates">
  ///   <option value="">State</option>
  ///   <option value="AL">Alabama</option>
  ///   <option selected value="AK">Alaska</option>
  ///   <option value="AZ">Arizona</option>
  /// </select>
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
  ///     final view = rtl.render(react.div({},
  ///       react.input({
  ///         'type': 'text',
  ///         'name': 'lastName',
  ///         'defaultValue': 'Norris',
  ///       }),
  ///       react.textarea({
  ///         'name': 'message',
  ///         'defaultValue': 'Hello World',
  ///       }),
  ///       react.select({'name': 'usStates'},
  ///         react.option({'value': ''}, 'State'),
  ///         react.option({'value': 'AL'}, 'Alabama'),
  ///         react.option({'value': 'AK', 'selected': true}, 'Alaska'),
  ///         react.option({'value': 'AZ'}, 'Arizona'),
  ///       ),
  ///     ));
  ///
  ///     expect(view.getByDisplayValue('Norris'), isInTheDocument);
  ///
  ///     expect(view.getByDisplayValue('Hello World'), isInTheDocument);
  ///
  ///     // In the case of a `<select>`, this will search for a `<select>`
  ///     // whose selected `<option>` matches the given `TextMatch`.
  ///     expect(view.getByDisplayValue('Alaska'), isInTheDocument);
  ///   });
  /// }
  /// ```
  /// {@endtemplate}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [value]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  E getByDisplayValue<E extends Element>(
    /*TextMatch*/ dynamic value, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      withErrorInterop(
        () => _jsGetByDisplayValue(
          getContainerForScope(),
          TextMatch.toJs(value),
          buildMatcherOptions(exact: exact, normalizer: normalizer),
        ) as E,
      );

  /// Returns a list of [InputElement]s, [TextAreaElement]s or [SelectElement]s that have the matching [value] displayed,
  /// defaulting to an [exact] match.
  ///
  /// Throws if no elements are found.
  /// Use [queryAllByDisplayValue] if a RTE is not expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [getByDisplayValue]
  ///
  /// > See: <https://testing-library.com/docs/queries/bydisplayvalue/>
  ///
  /// {@macro ByDisplayValueExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [value]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  List<E> getAllByDisplayValue<E extends Element>(
    /*TextMatch*/ dynamic value, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      withErrorInterop(
        () => _jsGetAllByDisplayValue(
          getContainerForScope(),
          TextMatch.toJs(value),
          buildMatcherOptions(exact: exact, normalizer: normalizer),
        ).cast<E>(), // <vomit/> https://github.com/dart-lang/sdk/issues/37676
      );

  /// Returns a single [InputElement], [TextAreaElement] or [SelectElement] that has the matching [value] displayed,
  /// defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found.
  /// Use [getByDisplayValue] if a RTE is expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [queryAllByDisplayValue]
  ///
  /// > See: <https://testing-library.com/docs/queries/bydisplayvalue/>
  ///
  /// {@macro ByDisplayValueExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [value]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  E? queryByDisplayValue<E extends Element>(
    /*TextMatch*/ dynamic value, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      _jsQueryByDisplayValue(
        getContainerForScope(),
        TextMatch.toJs(value),
        buildMatcherOptions(exact: exact, normalizer: normalizer),
      ) as E?;

  /// Returns a list of [InputElement]s, [TextAreaElement]s or [SelectElement]s that have the matching [value] displayed,
  /// defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByDisplayValue] if a RTE is expected.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [queryByDisplayValue]
  ///
  /// > See: <https://testing-library.com/docs/queries/bydisplayvalue/>
  ///
  /// {@macro ByDisplayValueExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [value]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  List<E> queryAllByDisplayValue<E extends Element>(
    /*TextMatch*/ dynamic value, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
  }) =>
      _jsQueryAllByDisplayValue(
        getContainerForScope(),
        TextMatch.toJs(value),
        buildMatcherOptions(exact: exact, normalizer: normalizer),
      ).cast<E>(); // <vomit/> https://github.com/dart-lang/sdk/issues/37676

  /// Returns a future with a single [InputElement], [TextAreaElement] or [SelectElement] that has the matching [value] displayed,
  /// defaulting to an [exact] match after waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByDisplayValue] or [queryByDisplayValue] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [findAllByDisplayValue]
  ///
  /// > See: <https://testing-library.com/docs/queries/bydisplayvalue/>
  ///
  /// {@macro ByDisplayValueExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [value]
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
  Future<E> findByDisplayValue<E extends Element>(
    /*TextMatch*/ dynamic value, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    Duration? timeout,
    Duration interval = defaultAsyncCallbackCheckInterval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getByDisplayValue` instead of an
    // interop like `_jsFindByDisplayValue` to give consumers better async stack traces.
    return waitFor(
      () => getByDisplayValue(
        value,
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

  /// Returns a list of [InputElement], [TextAreaElement] or [SelectElement] that has the matching [value] displayed,
  /// defaulting to an [exact] match after waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByDisplayValue] or [queryByDisplayValue] in a `waitFor` function.
  ///
  /// Throws if no elements are found.
  ///
  /// {@macro PreferByLabelTextNote}
  ///
  /// > Related: [findByDisplayValue]
  ///
  /// > See: <https://testing-library.com/docs/queries/bydisplayvalue/>
  ///
  /// {@macro ByDisplayValueExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [value]
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
  Future<List<E>> findAllByDisplayValue<E extends Element>(
    /*TextMatch*/ dynamic value, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    Duration? timeout,
    Duration interval = defaultAsyncCallbackCheckInterval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getAllByDisplayValue` instead of an
    // interop like `_jsFindAllByDisplayValue` to give consumers better async stack traces.
    return waitFor(
      () => getAllByDisplayValue<E>(
        value,
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

@JS('rtl.getByDisplayValue')
external Element _jsGetByDisplayValue(
  Node container,
  /*TextMatch*/ dynamic value, [
  MatcherOptions? options,
]);

@JS('rtl.getAllByDisplayValue')
external List< /*Element*/ dynamic> _jsGetAllByDisplayValue(
  Node container,
  /*TextMatch*/ dynamic value, [
  MatcherOptions? options,
]);

@JS('rtl.queryByDisplayValue')
external Element? _jsQueryByDisplayValue(
  Node container,
  /*TextMatch*/ dynamic value, [
  MatcherOptions? options,
]);

@JS('rtl.queryAllByDisplayValue')
external List< /*Element*/ dynamic> _jsQueryAllByDisplayValue(
  Node container,
  /*TextMatch*/ dynamic value, [
  MatcherOptions? options,
]);

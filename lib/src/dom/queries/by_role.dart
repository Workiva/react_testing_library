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

/// https://testing-library.com/docs/queries/byrole/
@JS()
library react_testing_library.src.dom.queries.by_role;

import 'dart:html' show Element, Node;

import 'package:js/js.dart';
import 'package:meta/meta.dart';
import 'package:react_testing_library/src/dom/accessibility_helpers.dart';

import 'package:react_testing_library/src/dom/async/types.dart';
import 'package:react_testing_library/src/dom/async/wait_for.dart';
import 'package:react_testing_library/src/dom/matches/types.dart';
import 'package:react_testing_library/src/dom/queries/interface.dart';
import 'package:react_testing_library/src/util/error_message_utils.dart' show withErrorInterop;

/// PRIVATE. Do not export from this library.
///
/// The public API is either the top level function by the same name as the methods in here,
/// or the methods by the same name exposed by `screen` / `within()`.
mixin ByRoleQueries on IQueries {
  /// @nodoc
  @protected
  ByRoleOptions buildByRoleOptions({
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    bool hidden = false,
    /*TextMatch*/ dynamic name,
    bool? selected,
    bool? checked,
    bool? pressed,
    bool? expanded,
    bool queryFallbacks = false,
    int? level,
  }) {
    final byRoleOptions = ByRoleOptions()
      ..exact = exact
      ..hidden = hidden
      ..queryFallbacks = queryFallbacks;
    if (normalizer != null) byRoleOptions.normalizer = allowInterop(normalizer);
    if (name != null) byRoleOptions.name = TextMatch.toJs(name);
    if (selected != null) byRoleOptions.selected = selected;
    if (checked != null) byRoleOptions.checked = checked;
    if (pressed != null) byRoleOptions.pressed = pressed;
    if (expanded != null) byRoleOptions.expanded = expanded;
    if (level != null) byRoleOptions.level = level;

    return byRoleOptions;
  }

  /// Returns a single element with the given [role] value, defaulting to an [exact] match.
  ///
  /// Throws if no element is found. Use [queryByRole] if a RTE is not expected.
  ///
  /// {@macro byRoleOptionsName}
  ///
  /// > Related: [getAllByRole]
  ///
  /// > See: <https://testing-library.com/docs/queries/byrole/>
  ///
  /// {@template ByRoleExample}
  /// ## Example
  ///
  /// > The example below demonstrates the usage of the `getByRole` query. However, the example
  /// is also relevant for `getAllByRole`, `queryByRole`, `queryAllByRole`, `findByRole`
  /// and `findAllByRole`.
  /// >
  /// > Read more about the different [types of queries](https://testing-library.com/docs/queries/about#types-of-queries) to gain more clarity on which one suits your use-cases best.
  ///
  /// ```html
  /// <button onClick="...">Ok</button>
  /// <button onClick="...">Cancel</button>
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
  ///     final view = rtl.render(react.div({},
  ///       react.button({'onClick': (_) { /*...*/ }}, 'Ok'),
  ///       react.button({'onClick': (_) { /*...*/ }}, 'Cancel'),
  ///     ));
  ///
  ///     expect(view.getByRole('button', name: 'Ok'), isInTheDocument);
  ///     expect(view.getByRole('button', name: 'Cancel'), isInTheDocument);
  ///   });
  /// }
  /// ```
  /// {@endtemplate}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [role]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro byRoleOptionsHidden}
  /// {@macro byRoleOptionsSelected}
  /// {@macro byRoleOptionsChecked}
  /// {@macro byRoleOptionsPressed}
  /// {@macro byRoleOptionsExpanded}
  /// {@macro byRoleOptionsQueryFallbacks}
  /// {@macro byRoleOptionsLevel}
  E getByRole<E extends Element>(
    /*TextMatch*/ dynamic role, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    bool hidden = false,
    /*TextMatch*/ dynamic name,
    bool? selected,
    bool? checked,
    bool? pressed,
    bool? expanded,
    bool queryFallbacks = false,
    int? level,
  }) =>
      withErrorInterop(
        () => _jsGetByRole(
          getContainerForScope(),
          TextMatch.toJs(role),
          buildByRoleOptions(
            exact: exact,
            normalizer: normalizer,
            hidden: hidden,
            name: name,
            selected: selected,
            checked: checked,
            pressed: pressed,
            expanded: expanded,
            queryFallbacks: queryFallbacks,
            level: level,
          ),
        ) as E,
      );

  /// Returns a list of elements with the given [role] value, defaulting to an [exact] match.
  ///
  /// Throws if no elements are found. Use [queryAllByRole] if a RTE is not expected.
  ///
  /// {@macro byRoleOptionsName}
  ///
  /// > Related: [getByRole]
  ///
  /// > See: <https://testing-library.com/docs/queries/byrole/>
  ///
  /// {@macro ByRoleExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [role]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro byRoleOptionsHidden}
  /// {@macro byRoleOptionsSelected}
  /// {@macro byRoleOptionsChecked}
  /// {@macro byRoleOptionsPressed}
  /// {@macro byRoleOptionsExpanded}
  /// {@macro byRoleOptionsQueryFallbacks}
  /// {@macro byRoleOptionsLevel}
  List<E> getAllByRole<E extends Element>(
    /*TextMatch*/ dynamic role, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    bool hidden = false,
    /*TextMatch*/ dynamic name,
    bool? selected,
    bool? checked,
    bool? pressed,
    bool? expanded,
    bool queryFallbacks = false,
    int? level,
  }) =>
      withErrorInterop(
        () => _jsGetAllByRole(
          getContainerForScope(),
          TextMatch.toJs(role),
          buildByRoleOptions(
            exact: exact,
            normalizer: normalizer,
            hidden: hidden,
            name: name,
            selected: selected,
            checked: checked,
            pressed: pressed,
            expanded: expanded,
            queryFallbacks: queryFallbacks,
            level: level,
          ),
        ).cast<E>(), // <vomit/> https://github.com/dart-lang/sdk/issues/37676
      );

  /// Returns a single element with the given [role] value, defaulting to an [exact] match.
  ///
  /// Returns `null` if no element is found. Use [getByRole] if a RTE is expected.
  ///
  /// {@macro byRoleOptionsName}
  ///
  /// > Related: [queryAllByRole]
  ///
  /// > See: <https://testing-library.com/docs/queries/byrole/>
  ///
  /// {@macro ByRoleExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [role]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro byRoleOptionsHidden}
  /// {@macro byRoleOptionsSelected}
  /// {@macro byRoleOptionsChecked}
  /// {@macro byRoleOptionsPressed}
  /// {@macro byRoleOptionsExpanded}
  /// {@macro byRoleOptionsQueryFallbacks}
  /// {@macro byRoleOptionsLevel}
  E? queryByRole<E extends Element>(
    /*TextMatch*/ dynamic role, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    bool hidden = false,
    /*TextMatch*/ dynamic name,
    bool? selected,
    bool? checked,
    bool? pressed,
    bool? expanded,
    bool queryFallbacks = false,
    int? level,
  }) =>
      _jsQueryByRole(
        getContainerForScope(),
        TextMatch.toJs(role),
        buildByRoleOptions(
          exact: exact,
          normalizer: normalizer,
          hidden: hidden,
          name: name,
          selected: selected,
          checked: checked,
          pressed: pressed,
          expanded: expanded,
          queryFallbacks: queryFallbacks,
          level: level,
        ),
      ) as E?;

  /// Returns a list of elements with the given [role] value, defaulting to an [exact] match.
  ///
  /// Returns an empty list if no element(s) are found.
  /// Use [getAllByRole] if a RTE is expected.
  ///
  /// {@macro byRoleOptionsName}
  ///
  /// > Related: [queryByRole]
  ///
  /// > See: <https://testing-library.com/docs/queries/byrole/>
  ///
  /// {@macro ByRoleExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [role]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro byRoleOptionsHidden}
  /// {@macro byRoleOptionsSelected}
  /// {@macro byRoleOptionsChecked}
  /// {@macro byRoleOptionsPressed}
  /// {@macro byRoleOptionsExpanded}
  /// {@macro byRoleOptionsQueryFallbacks}
  /// {@macro byRoleOptionsLevel}
  List<E> queryAllByRole<E extends Element>(
    /*TextMatch*/ dynamic role, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    bool hidden = false,
    /*TextMatch*/ dynamic name,
    bool? selected,
    bool? checked,
    bool? pressed,
    bool? expanded,
    bool queryFallbacks = false,
    int? level,
  }) =>
      _jsQueryAllByRole(
        getContainerForScope(),
        TextMatch.toJs(role),
        buildByRoleOptions(
          exact: exact,
          normalizer: normalizer,
          hidden: hidden,
          name: name,
          selected: selected,
          checked: checked,
          pressed: pressed,
          expanded: expanded,
          queryFallbacks: queryFallbacks,
          level: level,
        ),
      ).cast<E>(); // <vomit/> https://github.com/dart-lang/sdk/issues/37676

  /// Returns a future with a single element value with the given [role] value, defaulting to an [exact] match after
  /// waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByRole] or [queryByRole] in a `waitFor` function.
  ///
  /// Throws if exactly one element is not found.
  ///
  /// {@macro byRoleOptionsName}
  ///
  /// > Related: [findAllByRole]
  ///
  /// > See: <https://testing-library.com/docs/queries/byrole/>
  ///
  /// {@macro ByRoleExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [role]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro byRoleOptionsHidden}
  /// {@macro byRoleOptionsSelected}
  /// {@macro byRoleOptionsChecked}
  /// {@macro byRoleOptionsPressed}
  /// {@macro byRoleOptionsExpanded}
  /// {@macro byRoleOptionsQueryFallbacks}
  /// {@macro byRoleOptionsLevel}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<E> findByRole<E extends Element>(
    /*TextMatch*/ dynamic role, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    bool hidden = false,
    /*TextMatch*/ dynamic name,
    bool? selected,
    bool? checked,
    bool? pressed,
    bool? expanded,
    bool queryFallbacks = false,
    int? level,
    Duration? timeout,
    Duration interval = defaultAsyncCallbackCheckInterval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getByRole` instead of an
    // interop like `_jsFindByRole` to give consumers better async stack traces.
    return waitFor(
      () => getByRole<E>(
        role,
        exact: exact,
        normalizer: normalizer,
        hidden: hidden,
        name: name,
        selected: selected,
        checked: checked,
        pressed: pressed,
        expanded: expanded,
        queryFallbacks: queryFallbacks,
        level: level,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions,
    );
  }

  /// Returns a list of elements with the given [role] value, defaulting to an [exact] match after
  /// waiting 1000ms (or the provided [timeout] duration).
  ///
  /// If there is a specific condition you want to wait for other than the DOM node being on the page, wrap
  /// a non-async query like [getByRole] or [queryByRole] in a `waitFor` function.
  ///
  /// Throws if no elements are found.
  ///
  /// {@macro byRoleOptionsName}
  ///
  /// > Related: [findByRole]
  ///
  /// > See: <https://testing-library.com/docs/queries/byrole/>
  ///
  /// {@macro ByRoleExample}
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// ## Options
  ///
  /// ### [role]
  /// {@macro TextMatchArgDescription}
  /// {@macro MatcherOptionsExactArgDescription}
  /// {@macro MatcherOptionsNormalizerArgDescription}
  /// {@macro byRoleOptionsHidden}
  /// {@macro byRoleOptionsSelected}
  /// {@macro byRoleOptionsChecked}
  /// {@macro byRoleOptionsPressed}
  /// {@macro byRoleOptionsExpanded}
  /// {@macro byRoleOptionsQueryFallbacks}
  /// {@macro byRoleOptionsLevel}
  ///
  /// ## Async Options
  ///
  /// {@macro sharedWaitForOptionsTimeoutDescription}
  /// {@macro sharedWaitForOptionsIntervalDescription}
  /// {@macro sharedWaitForOptionsOnTimeoutDescription}
  /// {@macro sharedWaitForOptionsMutationObserverDescription}
  Future<List<E>> findAllByRole<E extends Element>(
    /*TextMatch*/ dynamic role, {
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    bool hidden = false,
    /*TextMatch*/ dynamic name,
    bool? selected,
    bool? checked,
    bool? pressed,
    bool? expanded,
    bool queryFallbacks = false,
    int? level,
    Duration? timeout,
    Duration interval = defaultAsyncCallbackCheckInterval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    // NOTE: Using our own Dart `waitFor` as a wrapper around `getAllByRole` instead of an
    // interop like `_jsFindAllByRole` to give consumers better async stack traces.
    return waitFor(
      () => getAllByRole<E>(
        role,
        exact: exact,
        normalizer: normalizer,
        hidden: hidden,
        name: name,
        selected: selected,
        checked: checked,
        pressed: pressed,
        expanded: expanded,
        queryFallbacks: queryFallbacks,
        level: level,
      ),
      container: getContainerForScope(),
      timeout: timeout,
      interval: interval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions,
    );
  }
}

@JS('rtl.getByRole')
external Element _jsGetByRole(
  Node container,
  /*TextMatch*/ dynamic role, [
  ByRoleOptions? options,
]);

@JS('rtl.getAllByRole')
external List< /*Element*/ dynamic> _jsGetAllByRole(
  Node container,
  /*TextMatch*/ dynamic role, [
  ByRoleOptions? options,
]);

@JS('rtl.queryByRole')
external Element? _jsQueryByRole(
  Node container,
  /*TextMatch*/ dynamic role, [
  ByRoleOptions? options,
]);

@JS('rtl.queryAllByRole')
external List< /*Element*/ dynamic> _jsQueryAllByRole(
  Node container,
  /*TextMatch*/ dynamic role, [
  ByRoleOptions? options,
]);

@JS()
@anonymous
class ByRoleOptions {
  external bool? get exact;
  external set exact(bool? value);

  external NormalizerFn Function([NormalizerOptions?])? get normalizer;
  external set normalizer(NormalizerFn Function([NormalizerOptions?])? value);

  /// {@template byRoleOptionsName}
  /// You can also query the returned element(s) by their [accessible name](https://www.w3.org/TR/accname-1.1/)
  /// by specifying the `name` argument: `getByRole(expectedRole, name: 'The name')`.
  ///
  /// The accessible `name` is for simple cases equal to the label of a form element, or the text content of a button,
  /// or the value of the `aria-label` attribute. It can be used to query a specific element if multiple elements
  /// with the same role are present on the rendered content.
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#api> for more details and examples.
  ///
  /// Use the [logRoles] utility to help determine what roles and names are visible to query for.
  /// {@endtemplate}
  external /*TextMatch*/ dynamic get name;
  external set name(/*TextMatch*/ dynamic value);

  /// {@template byRoleOptionsHidden}
  /// ### [hidden]
  /// If you set `hidden` to true, elements that are normally excluded from the accessibility tree are
  /// considered for the query as well.
  ///
  /// The default behavior follows <https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion> with the exception of
  /// `role="none"` and `role="presentation"` which are considered in the query in any case.
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#hidden> for more details and examples.
  /// {@endtemplate}
  external bool? get hidden;
  external set hidden(bool? value);

  /// {@template byRoleOptionsSelected}
  /// ### [selected]
  /// You can filter the returned elements by their selected state by setting `selected: true` or `selected: false`.
  ///
  /// To learn more about the selected state and which elements can have this state see
  /// [ARIA `aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#selected> for more details and examples.
  /// {@endtemplate}
  external bool? get selected;
  external set selected(bool? value);

  /// {@template byRoleOptionsChecked}
  /// ### [checked]
  /// You can filter the returned elements by their checked state by setting `checked: true` or `checked: false`.
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#checked> for more details and examples.
  /// {@endtemplate}
  external bool? get checked;
  external set checked(bool? value);

  /// {@template byRoleOptionsPressed}
  /// ### [pressed]
  /// Buttons can have a pressed state. You can filter the returned elements by their pressed state by
  /// setting `pressed: true` or `pressed: false`.
  ///
  /// To learn more about the pressed state see [ARIA `aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#pressed> for more details and examples.
  /// {@endtemplate}
  external bool? get pressed;
  external set pressed(bool? value);

  /// {@template byRoleOptionsExpanded}
  /// ### [expanded]
  /// You can filter the returned elements by their expanded state by setting `expanded: true` or `expanded: false`.
  ///
  /// To learn more about the expanded state and which elements can have this state see
  /// [ARIA `aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#expanded> for more details and examples.
  /// {@endtemplate}
  external bool? get expanded;
  external set expanded(bool? value);

  /// {@template byRoleOptionsQueryFallbacks}
  /// ### [queryFallbacks]
  /// By default, it's assumed that the first role of each element is supported,
  /// so only the first role can be queried. If you need to query an element by
  /// any of its fallback roles instead, you can use `queryFallbacks: true`.
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#queryfallbacks> for more details and examples.
  /// {@endtemplate}
  external bool? get queryFallbacks;
  external set queryFallbacks(bool? value);

  /// {@template byRoleOptionsLevel}
  /// ### [level]
  /// An element with the `heading` role can be queried by any heading level `getByRole('heading')`
  /// or by a specific heading level using the `level` option `getByRole('heading', level: 2)`.
  ///
  /// The level option queries the element(s) with the `heading` role matching the indicated level
  /// determined by the semantic HTML heading elements `<h1>`-`<h6>` or matching the `aria-level` attribute.
  ///
  /// To learn more about the `aria-level` property, see
  /// [ARIA `aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
  ///
  /// See: <https://testing-library.com/docs/queries/byrole#level> for more details and examples.
  /// {@endtemplate}
  external int? get level;
  external set level(int? value);
}

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

/// https://testing-library.com/docs/react-testing-library/api#render
@JS()
library react_testing_library.src.react.render.render;

import 'dart:html' show DocumentFragment, Element, Node;

import 'package:js/js.dart';
import 'package:meta/meta.dart';
import 'package:react/react_client.dart' show ReactComponentFactoryProxy, ReactElement;
import 'package:react_testing_library/src/dom/pretty_dom.dart';
import 'package:react_testing_library/src/dom/scoped_queries.dart' show ScopedQueries;
import 'package:test/test.dart' show addTearDown;

import 'package:react_testing_library/src/react/render/types.dart' show JsRenderResult, RenderOptions;

/// Renders the [ui] element into the DOM, returning a [RenderResult] API that can be used
/// to do things like [RenderResult.rerender] with different props, or to call
/// a query function scoped within the [container] that was rendered into.
///
/// By default, the [container] will be removed from the DOM and [RenderResult.unmount] will be called
/// along with an optional [onDidTearDown] in the `tearDown` of any test that calls this
/// function unless [autoTearDown] is set to false.
///
/// Optionally, you can specify:
///
/// * __[container]__, which will be the mount point of the React tree.
/// This must be a [Element] that exists in the DOM at the time that `render` is called.
/// * __[wrapper]__, which will be wrapped around the [ui] - which is
/// especially useful when testing components that need a context provider of some kind.
/// This should be an OverReact `UiFactory` or a [ReactComponentFactoryProxy].
///
/// > See: <https://testing-library.com/docs/react-testing-library/api#render>
RenderResult render(
  ReactElement ui, {
  Node container,
  Node baseElement,
  bool hydrate = false,
  // TODO: Implement if CPLAT-13502 is deemed necessary
  // Map<String, Query> queries,
  /*UiFactory || ReactComponentFactoryProxy*/ wrapper,
  bool autoTearDown = true,
  void Function() onDidTearDown,
}) {
  final renderOptions = RenderOptions()..hydrate = hydrate;
  if (container != null) renderOptions.container = container;
  if (baseElement != null) renderOptions.baseElement = baseElement;
  if (wrapper != null) {
    if (wrapper is ReactComponentFactoryProxy) {
      renderOptions.wrapper = wrapper.type;
    } else {
      // Its probably a UiFactory
      try {
        renderOptions.wrapper = wrapper().componentFactory.type;
      } catch (err) {
        throw ArgumentError.value(wrapper, 'wrapper', 'wrapper must be a ReactComponentFactoryProxy or UiFactory');
      }
    }
  }
  if (!autoTearDown && onDidTearDown != null) {
    throw ArgumentError('onDidTearDown cannot be set when autoTearDown is false.');
  }

  final jsResult = _render(ui, renderOptions);

  if (autoTearDown) {
    addTearDown(() {
      jsResult.unmount();
      jsResult.container?.remove();
      onDidTearDown?.call();
    });
  }

  return RenderResult._(jsResult, ui);
}

/// The model returned from [render], which includes all the `ScopedQueries` scoped to the
/// [container] that the [renderedElement] was rendered within.
///
/// > See: <https://testing-library.com/docs/react-testing-library/api/#render-result>
///
/// {@category Queries}
@sealed
class RenderResult extends ScopedQueries {
  RenderResult._(this._jsRenderResult, this._renderedElement) : super(() => _jsRenderResult.container);

  final JsRenderResult _jsRenderResult;

  /// The rendered VDOM instance ([ReactElement]) that was passed to [render] as the first argument.
  ReactElement get renderedElement => _renderedElement;
  ReactElement _renderedElement;

  /// The containing DOM node of your rendered [ReactElement] _(via [render])_.
  ///
  /// > See: <https://testing-library.com/docs/react-testing-library/api/#container-1>
  Node get container => _jsRenderResult.container;

  /// The containing DOM node where your [ReactElement] is rendered in the [container].
  ///
  /// If you don't specify the `baseElement` in the options of [render], it will default to `document.body`.
  ///
  /// This is useful when the component you want to test renders something outside the container `div`,
  /// e.g. when you want to snapshot test your portal component which renders its HTML directly in the body.
  ///
  /// > See: <https://testing-library.com/docs/react-testing-library/api/#baseelement-1>
  Node get baseElement => _jsRenderResult.baseElement;

  /// A shortcut for `console.log(prettyDOM(baseElement))`.
  ///
  /// > __NOTE: It's recommended to use `screen.debug` instead.__
  ///
  /// > See: <https://testing-library.com/docs/react-testing-library/api/#debug>
  void debug([
    Node baseElement,
    int maxLength,
    PrettyDomOptions options,
  ]) =>
      _jsRenderResult.debug(baseElement, maxLength, options);

  /// Updates the props of the [renderedElement] by providing an updated [ui] element.
  ///
  /// > See: <https://testing-library.com/docs/react-testing-library/api/#rerender>
  void rerender(ReactElement ui) {
    _renderedElement = ui;
    _jsRenderResult.rerender(ui);
  }

  /// Unmounts the [renderedElement].
  ///
  /// This is automatically called in the `tearDown` of each test that calls [render]
  /// unnecessary unless you set `autoTearDown` to `false`.
  ///
  /// > See: <https://testing-library.com/docs/react-testing-library/api/#unmount>
  void unmount() => _jsRenderResult.unmount();

  /// Returns a `DocumentFragment` of your [renderedElement].
  ///
  /// This can be useful if you need to avoid live bindings and see how your component reacts to events.
  ///
  /// > See: <https://testing-library.com/docs/react-testing-library/api/#asfragment>
  DocumentFragment asFragment() => _jsRenderResult.asFragment();
}

/// {@template RenderSupportsReactAndOverReactCallout}
/// > __NOTE:__ `render()` supports React vDom elements / custom components created using either the
///   [react](https://pub.dev/packages/react) or [over_react](https://pub.dev/packages/over_react) packages.
/// >
/// > The examples shown here use the `react` package since the `react_testing_library` does not have a direct
///   dependency on `over_react` - but both libraries are fully supported.
/// {@endtemplate}
@JS('rtl.render')
external JsRenderResult _render(/*ReactElement*/ dynamic ui, RenderOptions options);

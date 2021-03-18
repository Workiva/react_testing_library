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

import 'dart:html' show DocumentFragment, Element;

import 'package:js/js.dart';
import 'package:react/react_client.dart' show ReactComponentFactoryProxy, ReactElement;
import 'package:react_testing_library/src/dom/scoped_queries.dart' show ScopedQueries;
import 'package:test/test.dart' show addTearDown;

import 'package:react_testing_library/src/react/render/types.dart' show JsRenderResult, RenderOptions;

/// Renders the [ui] into the DOM, returning a [RenderResult] API that can be used
/// to do things like [RenderResult.rerender] with different props, or to call
/// a query function scoped within the [container] that was rendered into.
///
/// By default, the [container] will be removed from the DOM and [RenderResult.unmount] will be called
/// along with an optional [autoTearDownCallback] in the `tearDown` of any test that calls this
/// function unless [autoTearDown] is set to false.
///
/// Optionally, you can specify:
///
/// * __[container]__, which will be the mount point of the React tree.
/// This must be a [Element] that exists in the DOM at the time that `render` is called.
/// * __[wrapper]__, which will be wrapped around the [ui] - which is
/// especially useful when testing components that need a context provider of some kind.
///
/// > See: <https://testing-library.com/docs/react-testing-library/api#render>
RenderResult render(
  ReactElement ui, {
  Element container,
  Element baseElement,
  bool hydrate = false,
  // TODO: Implement if CPLAT-13502 is deemed necessary
  // Map<String, Query> queries,
  /*UiFactory || ReactComponentFactoryProxy*/ wrapper,
  bool autoTearDown = true,
  Function() autoTearDownCallback,
}) {
  final renderOptions = RenderOptions()..hydrate = hydrate;
  if (container != null) renderOptions.container = container;
  if (baseElement != null) renderOptions.baseElement = baseElement;
  if (wrapper != null) {
    if (wrapper is ReactComponentFactoryProxy) {
      ui = wrapper({}, ui);
    } else {
      // Its probably a UiFactory
      try {
        ui = wrapper()(ui);
      } catch (err) {
        throw ArgumentError('wrapper must be a ReactComponentFactoryProxy or UiFactory');
      }
    }
  }

  final jsResult = _render(ui, renderOptions);

  addTearDown(() {
    if (autoTearDown) {
      jsResult.unmount();
      jsResult.container?.remove();
      autoTearDownCallback?.call();
    }
  });

  return RenderResult._(jsResult, ui);
}

/// The model returned from [render], which includes all the [ScopedQueries] scoped to the
/// container that was rendered within.
///
/// TODO: Document fields / methods
/// TODO: Document how to use the bound queries on the container
class RenderResult extends ScopedQueries {
  RenderResult._(this._jsRenderResult, this._renderedElement) : super(() => _jsRenderResult.container);

  final JsRenderResult _jsRenderResult;

  ReactElement get renderedElement => _renderedElement;
  ReactElement _renderedElement;

  Element get container => _jsRenderResult.container;

  Element get baseElement => _jsRenderResult.baseElement;

  void debug([
    Element baseElement,
    int maxLength,
    // TODO
    /*prettyFormat.OptionsReceived*/ dynamic options,
  ]) =>
      _jsRenderResult.debug(baseElement, maxLength, options);

  void rerender(ReactElement ui) {
    _renderedElement = ui;
    _jsRenderResult.rerender(ui);
  }

  void unmount() => _jsRenderResult.unmount();

  DocumentFragment asFragment() => _jsRenderResult.asFragment();
}

@JS('rtl.render')
external JsRenderResult _render(ReactElement ui, RenderOptions options);

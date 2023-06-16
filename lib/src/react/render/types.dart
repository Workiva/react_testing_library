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

@JS()
library react_testing_library.src.react.render.types;

import 'dart:html' show DocumentFragment, Node;

import 'package:js/js.dart';
import 'package:react/react_client/react_interop.dart' show ReactElement;
import 'package:react/react_client/js_backed_map.dart';
import 'package:react_testing_library/src/dom/pretty_dom.dart' show PrettyDomOptions;

import 'package:react_testing_library/src/react/render/render.dart';

/// A representation of the JS Object that will be returned from the call to `rtl.render`.
///
/// Private. Do not export from this library. Consumers should use [RenderResult].
@JS()
@anonymous
class JsRenderResult {
  external Node get container;
  external Node get baseElement;

  external void debug([
    Node? baseElement,
    int? maxLength,
    PrettyDomOptions? options,
  ]);

  external void rerender(ReactElement ui);

  external void unmount();

  external DocumentFragment asFragment();
}

/// A representation of the JS Object that will be created by the call to [render]
/// from the individual arguments for that function.
@JS()
@anonymous
class RenderOptions {
  external Node get container;
  external set container(Node value);

  external Node get baseElement;
  external set baseElement(Node value);

  external dynamic get wrapper;
  external set wrapper(dynamic value);

  external bool get hydrate;
  external set hydrate(bool value);

  external JsMap get queries;
  external set queries(JsMap value);
}

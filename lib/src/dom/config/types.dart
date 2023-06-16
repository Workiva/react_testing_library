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

@JS()
library react_testing_library.src.dom.config.types;

import 'dart:html' show Element;

import 'package:js/js.dart';

@JS()
@anonymous
class JsConfig {
  external String get testIdAttribute;
  external set testIdAttribute(String value);

  external int get asyncUtilTimeout;
  external set asyncUtilTimeout(int value);

  external bool get computedStyleSupportsPseudoElements;
  external set computedStyleSupportsPseudoElements(bool value);

  external bool get defaultHidden;
  external set defaultHidden(bool value);

  external bool get showOriginalStackTrace;
  external set showOriginalStackTrace(bool value);

  external bool get throwSuggestions;
  external set throwSuggestions(bool value);

  external /*JsError*/ dynamic Function(String message, Element container) get getElementError;
  external set getElementError(/*JsError*/ dynamic Function(String message, Element container) value);
}

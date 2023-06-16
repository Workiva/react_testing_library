
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
library react_testing_library.src.dom.config.configure;

import 'dart:html' show Element;

import 'package:js/js.dart' show JS, allowInterop;
import 'package:react_testing_library/src/dom/config/types.dart' show JsConfig;
import 'package:react_testing_library/src/util/error_message_utils.dart';

export 'package:react_testing_library/src/dom/config/types.dart' show JsConfig;

/// Configuration for the react-testing-library.
///
/// > See: <https://testing-library.com/docs/dom-testing-library/api-configuration/>
void configure({
  String? testIdAttribute,
  int? asyncUtilTimeout,
  bool? computedStyleSupportsPseudoElements,
  bool? defaultHidden,
  bool? showOriginalStackTrace,
  bool? throwSuggestions,
  TestingLibraryElementError Function(Object message, Element container)? getElementError,
}) {
  JsError _getJsGetElementError(Object message, Element container) {
    final dartError = allowInterop(getElementError!)(message, container);
    return buildJsGetElementError(dartError.message, container);
  }

  final existingConfig = getConfig();
  return jsConfigure(JsConfig()
    ..testIdAttribute = testIdAttribute ?? existingConfig.testIdAttribute
    ..asyncUtilTimeout = asyncUtilTimeout ?? existingConfig.asyncUtilTimeout
    ..computedStyleSupportsPseudoElements =
        computedStyleSupportsPseudoElements ?? existingConfig.computedStyleSupportsPseudoElements
    ..defaultHidden = defaultHidden ?? existingConfig.defaultHidden
    ..showOriginalStackTrace = showOriginalStackTrace ?? existingConfig.showOriginalStackTrace
    ..throwSuggestions = throwSuggestions ?? existingConfig.throwSuggestions
    ..getElementError = getElementError != null ? allowInterop(_getJsGetElementError) : existingConfig.getElementError);
}

@JS('rtl.configure')
external void jsConfigure([JsConfig? newConfig]);

/// Returns the configuration options being used by react-testing-library.
///
/// > See: <https://testing-library.com/docs/dom-testing-library/api-configuration/>
@JS('rtl.getConfig')
external JsConfig getConfig();

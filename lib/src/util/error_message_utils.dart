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

@JS()
library react_testing_library.src.util.error_message_utils;

import 'dart:html' show Element;

import 'package:js/js.dart' show JS;

import 'package:react_testing_library/src/dom/config/configure.dart' show configure;

/// Builds and configures react-testing-library to use a custom value for `JsConfig.getElementError`
/// if any queries fail in the current test.
void setEphemeralElementErrorMessage(
    Object Function(Object originalMessage, Element container) customErrorMessageBuilder) {
  TestingLibraryElementError buildCustomDartGetElementError(Object originalMessage, Element container) {
    return TestingLibraryElementError.fromJs(
        buildJsGetElementError(customErrorMessageBuilder(originalMessage, container), container));
  }

  configure(getElementError: buildCustomDartGetElementError);
}

/// Catches any potential `JsError`s thrown by JS query function by calling [getJsQueryResult],
/// preserving the stack trace of the error thrown from JS by throwing a [TestingLibraryElementError].
///
/// Optionally, a [errorMessage] can be provided to customize the error message.
T withErrorInterop<T>(T Function() getJsQueryResult, {String errorMessage}) {
  T returnValue;

  try {
    returnValue = getJsQueryResult();
  } catch (e) {
    throw TestingLibraryElementError.fromJs(e, errorMessage: errorMessage);
  }

  return returnValue;
}

/// A custom error class to be used when a react_testing_library test fails.
class TestingLibraryElementError extends Error {
  TestingLibraryElementError(this.message, [this.jsStackTrace]) : super();

  factory TestingLibraryElementError.fromJs(/*JsError*/ jsError, {String errorMessage}) {
    final message = errorMessage == null ? jsError.toString() : '$jsError\n\n$errorMessage';
    final stack = jsError is JsError ? StackTrace.fromString(jsError.stack) : null;
    return TestingLibraryElementError(message, stack);
  }

  final String message;
  final StackTrace jsStackTrace;

  @override
  String toString() => message;
}

class TestingLibraryAsyncTimeout extends Error {
  TestingLibraryAsyncTimeout(this.message) : super();

  final String message;

  @override
  String toString() => message;
}

@JS('Error')
class JsError {
  external String get name;
  external set name(String value);

  external String get message;
  external set message(String value);

  external String get stack;
  external set stack(String value);
}

@JS('rtl.buildTestingLibraryElementError')
external JsError buildTestingLibraryElementError(Object message);

@JS('rtl.buildJsGetElementError')
external JsError buildJsGetElementError(Object message, Element container);

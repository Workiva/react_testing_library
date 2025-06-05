// Copyright 2025 Workiva Inc.
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
library;

import 'dart:async';
import 'dart:html';

import 'package:js/js.dart';

@JS('rtl.act')
external dynamic _act(void Function([dynamic, dynamic, dynamic]) callback);

/// A test helper to apply pending React updates before making assertions.
///
/// This is RTL's version of React.act for convenience because it handles setting `IS_REACT_ACT_ENVIRONMENT`
/// to avoid https://react.dev/reference/react/act#error-the-current-testing-environment-is-not-configured-to-support-act.
///
/// See RTL docs: https://testing-library.com/docs/react-testing-library/api/#act
/// See React docs: https://react.dev/reference/react/act
Future<void> act(FutureOr<void> Function() callback) async {
  final callbackReturnValue = callback();
  final jsCallback =
      ([_, __, ___]) => callbackReturnValue is Future ? futureToPromise(callbackReturnValue) : callbackReturnValue;
  final promise = _act(allowInterop(jsCallback)) as Object;
  await promiseToFuture<void>(promise);
}

// Copied from react-dart https://github.com/Workiva/react-dart/blob/489d86fa72ab9a4ff60972180cf9a46c6ca2cffd/lib/src/js_interop_util.dart#L24-L40
/// Creates JS `Promise` which is resolved when [future] completes.
///
/// See also:
/// - [promiseToFuture]
Promise futureToPromise<T>(Future<T> future) {
  return Promise(allowInterop((resolve, reject) {
    future.then((result) => resolve(result), onError: reject);
  }));
}

@JS()
abstract class Promise {
  external factory Promise(
      Function(dynamic Function(dynamic value) resolve, dynamic Function(dynamic error) reject) executor);

  external Promise then(dynamic Function(dynamic value) onFulfilled, [dynamic Function(dynamic error) onRejected]);
}

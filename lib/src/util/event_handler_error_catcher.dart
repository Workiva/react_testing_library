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

import 'dart:html';

import 'package:react/react_client/react_interop.dart' show throwErrorFromJS;

/// INTENDED FOR INTERNAL USE IN REACT_TESTING_LIBRARY ONLY.
///
/// Event Handlers triggered by a UserEvent or fireEvent may throw errors
/// but due to how the DOM natively works with Events, the point that dispatched
/// the event will never surface it, leading to false positives.
///
/// This function wraps around the call to the JS RTL within UserEvent and
/// fireEvent in order to surface the errors.
T eventHandlerErrorCatcher<T>(T Function() cb) {
  T result;
  final errors = <dynamic>{};
  final errorStream = window.onError.cast<ErrorEvent>().listen((event) {
    errors.add(event.error);
  });
  result = cb();
  errorStream.cancel();
  if (errors.isNotEmpty) {
    if (errors.length == 1) {
      throwErrorFromJS(errors.first);
    } else {
      throw Exception('Multiple errors: $errors');
    }
  }
  return result;
}

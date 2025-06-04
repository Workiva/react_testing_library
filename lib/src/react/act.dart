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

Future<void> act(FutureOr<void> Function() callback) async {
  final promise = _act(allowInterop(([_, __, ___]) => callback())) as Object;
  await promiseToFuture<void>(promise);
}
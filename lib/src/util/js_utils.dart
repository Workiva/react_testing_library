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

import 'dart:js';

/// [Global JavaScript Array Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
// ignore: type_annotate_public_apis
final jsArray = context['Array'] as JsObject;

/// Store a helper reference to the global [jsArray]'s [`slice` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
// ignore: type_annotate_public_apis
final arrayProtoSlice = jsArray['prototype']['slice'] as JsObject;

/// Converts the Array-like [object] to a [JsArray] using [arrayProtoSlice].
JsArray<T> convertToArray<T>(JsObject? object) {
  final rawArray = (arrayProtoSlice.callMethod('apply', [object]) as Iterable).cast<T>();
  return JsArray.from(rawArray);
}

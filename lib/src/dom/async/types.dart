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
library react_testing_library.src.dom.async.types;

import 'package:js/js.dart';
import 'package:meta/meta.dart';

/// A function typedef used by `onTimeout` parameters in asynchronous `find*` / `waitFor` queries.
///
/// Returns either an `Error` or a `TestFailure` when provided with the [originalError].
typedef QueryTimeoutFn = /*Error || TestFailure*/ Object? Function(/*Error*/ Object? originalError);

@JS()
@anonymous
class SharedJsWaitForOptions {
  /// {@template sharedWaitForOptionsTimeoutDescription}
  /// ### [timeout]
  ///
  /// How long to wait for the node to appear in the DOM before throwing a `TestFailure`, defaulting to `1000ms`.
  /// {@endtemplate}
  external int get timeout;
  external set timeout(int value);

  /// {@template sharedWaitForOptionsIntervalDescription}
  /// ### [interval]
  ///
  /// How often the callback is called, defaulting to `50ms`.
  /// {@endtemplate}
  external int get interval;
  external set interval(int value);

  /// {@template sharedWaitForOptionsOnTimeoutDescription}
  /// ### [onTimeout]
  ///
  /// Is called if the `timeout` duration passes before the node is found in the DOM, and
  /// can be used to customize a `TestFailure` message.
  /// {@endtemplate}
  external dynamic get onTimeout;
  external set onTimeout(dynamic value);

  /// {@template sharedWaitForOptionsMutationObserverDescription}
  /// ### [mutationObserverOptions]
  ///
  /// The default values are:
  ///
  /// ```
  /// {subtree: true, childList: true, attributes: true, characterData: true}
  /// ```
  ///
  /// which will detect additions and removals of child elements _(including text nodes)_ in the container
  /// and any of its descendants. It will also detect attribute changes. When any of those changes occur,
  /// it will re-run the callback.
  /// {@endtemplate}
  external JsMutationObserverOptions get mutationObserverOptions;
  external set mutationObserverOptions(JsMutationObserverOptions value);
}

@JS()
@anonymous
class JsMutationObserverOptions {
  external bool get subtree;
  external set subtree(bool value);

  external bool get childList;
  external set childList(bool value);

  external bool get attributes;
  external set attributes(bool value);

  external bool get characterData;
  external set characterData(bool value);

  external List<String> get attributeFilter;
  external set attributeFilter(List<String> value);
}

/// Builds a set of options that can be used for any async query like `waitFor`,
/// or a "findBy" / "findAllBy" query.
///
/// @nodoc
class MutationObserverOptions {
  const MutationObserverOptions({
    this.subtree = true,
    this.childList = true,
    this.attributes = true,
    this.characterData = true,
    this.attributeFilter = const [],
  });

  final bool subtree;
  final bool childList;
  final bool attributes;
  final bool characterData;
  final List<String> attributeFilter;

  @protected
  JsMutationObserverOptions toJs() => JsMutationObserverOptions()
    ..subtree = subtree
    ..childList = childList
    ..attributes = attributes
    ..characterData = characterData
    ..attributeFilter = attributeFilter;
}

const defaultMutationObserverOptions = MutationObserverOptions();
const defaultAsyncCallbackCheckInterval = Duration(milliseconds: 50);

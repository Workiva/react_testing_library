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

import 'dart:html' show Node;
import 'dart:js' show allowInterop;

import 'package:meta/meta.dart';
import 'package:react_testing_library/src/dom/async/types.dart';
import 'package:react_testing_library/src/dom/matches/types.dart';

/// An interface shared by all the individual query type mixins.
mixin IQueries {
  /// @nodoc
  @protected
  Node? Function() get getContainerForScope;

  /// @nodoc
  @protected
  MatcherOptions buildMatcherOptions({
    bool exact = true,
    NormalizerFn Function([NormalizerOptions?])? normalizer,
    String? selector,
    /*String|bool*/ dynamic ignore = 'script',
  }) {
    final matcherOptions = MatcherOptions()..exact = exact;
    if (normalizer != null) matcherOptions.normalizer = allowInterop(normalizer);
    if (selector != null) matcherOptions.selector = selector;
    if (ignore != null) matcherOptions.ignore = ignore;

    return matcherOptions;
  }

  /// @nodoc
  @protected
  SharedJsWaitForOptions buildWaitForOptions({
    Duration? timeout,
    Duration? interval,
    QueryTimeoutFn? onTimeout,
    MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
  }) {
    final waitForOptions = SharedJsWaitForOptions();
    if (timeout != null) waitForOptions.timeout = timeout.inMilliseconds;
    if (interval != null) waitForOptions.interval = interval.inMilliseconds;
    if (onTimeout != null) waitForOptions.onTimeout = allowInterop(onTimeout);
    waitForOptions.mutationObserverOptions = mutationObserverOptions.toJs();

    return waitForOptions;
  }
}

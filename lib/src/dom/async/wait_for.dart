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

/// https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
@JS()
library react_testing_library.src.dom.async.wait_for;

import 'dart:async';
import 'dart:html' show MutationObserver, Node, document;

import 'package:js/js.dart';
import 'package:react_testing_library/src/dom/pretty_dom.dart';
import 'package:test/test.dart';

import 'package:react_testing_library/src/dom/async/types.dart';
import 'package:react_testing_library/src/dom/config/configure.dart' show getConfig;
import 'package:react_testing_library/src/util/error_message_utils.dart' show TestingLibraryElementError;
export 'package:react_testing_library/src/dom/async/types.dart' show JsMutationObserverOptions;

/// Calls the provided [expectation] on a given [interval] and/or when the [container] DOM changes,
/// completing only if it does not `throw`, or by `throw`ing if
/// the [timeout] expires before the [expectation] succeeds.
///
/// Similar to <https://testing-library.com/docs/dom-testing-library/api-async/#waitfor>, but designed to
/// work with the `dart:test` package's [expect] function and Dart [Future]s instead of JS `Promise`s.
///
/// * If you're waiting for an element to exist in the DOM, use a `findBy*` query instead.
/// * If you're waiting for an element to be removed from the DOM, use [waitForElementToBeRemoved] instead.
///
/// ## Options
///
/// ### [container]
///
/// The DOM node to attach the [MutationObserver] to.
///
/// Defaults to `document.body`.
///
/// {@macro sharedWaitForOptionsTimeoutDescription}
/// {@macro sharedWaitForOptionsIntervalDescription}
/// {@macro sharedWaitForOptionsOnTimeoutDescription}
/// {@macro sharedWaitForOptionsMutationObserverDescription}
///
/// {@category Async}
Future<T> waitFor<T>(
  FutureOr<T> Function() expectation, {
  Node container,
  Duration timeout,
  Duration interval = const Duration(milliseconds: 50),
  QueryTimeoutFn onTimeout,
  MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
}) async {
  final config = getConfig();
  container ??= document.body;
  timeout ??= Duration(milliseconds: config.asyncUtilTimeout);
  onTimeout ??= (error) => error;

  /*Error*/ dynamic lastError;
  MutationObserver observer;
  Timer intervalTimer;
  Timer overallTimeoutTimer;
  bool resultPending;
  final doneCompleter = Completer<T>();

  void onDone(dynamic error, [FutureOr<T> result]) {
    overallTimeoutTimer.cancel();
    intervalTimer.cancel();
    observer.disconnect();
    if (resultPending != null) {
      resultPending = false;
    }

    if (error != null) {
      doneCompleter.completeError(error);
    } else if (result is TestFailure) {
      doneCompleter.completeError(result);
    } else {
      doneCompleter.complete(result);
    }
  }

  // ignore: prefer_void_to_null
  FutureOr<Null> handleTimeout() {
    /*Error*/ dynamic error;
    if (lastError != null) {
      error = lastError;
    } else {
      error = TimeoutException('Timed out in waitFor after ${timeout.inMilliseconds}ms.');
    }
    onDone(onTimeout(error), null);
  }

  FutureOr checkCallback([_]) async {
    if (resultPending == false) return;

    try {
      final result = expectation();
      if (result is Future) {
        // Since we'll time out the expectation's future using the same `timeout` duration,
        // cancel the `overallTimeoutTimer` so that we don't fail with a generic `TestingLibraryAsyncTimeout`
        // before the specified `expectation` has a chance to fail with a more useful / contextual error.
        overallTimeoutTimer.cancel();
        resultPending = true;
        await (result as Future).then((resolvedValue) {
          onDone(null, resolvedValue as T);
        }, onError: onDone).timeout(timeout, onTimeout: handleTimeout);
      } else {
        onDone(null, result);
      }
      // If `callback` throws, wait for the next mutation, interval, or timeout.
    } catch (error) {
      // Save the most recent callback error to reject the promise with it in the event of a timeout
      lastError = error;
    }
  }

  overallTimeoutTimer = Timer(timeout, handleTimeout);

  intervalTimer = Timer.periodic(interval, checkCallback);
  observer = MutationObserver((_, __) => checkCallback())
    ..observe(
      container,
      childList: mutationObserverOptions.childList,
      attributes: mutationObserverOptions.attributes,
      characterData: mutationObserverOptions.characterData,
      subtree: mutationObserverOptions.subtree,
      attributeFilter: mutationObserverOptions.attributeFilter,
    );
  await checkCallback();

  return doneCompleter.future;
}

/// Waits for the removal of the single element returned from the [callback] to be removed from the DOM.
///
/// Similar to <https://testing-library.com/docs/dom-testing-library/api-async/#waitforelementtoberemoved>,
/// but designed to work with Dart [Future]s instead of JS `Promise`s.
///
/// To wait for multiple elements to be removed, use [waitForElementsToBeRemoved].
///
/// ## Options
///
/// ### [container]
///
/// An ancestor DOM node of the element you return from [callback].
/// This node will have a [MutationObserver] attached to it.
///
/// Defaults to `document.body`.
///
/// {@macro sharedWaitForOptionsTimeoutDescription}
/// {@macro sharedWaitForOptionsIntervalDescription}
/// {@macro sharedWaitForOptionsOnTimeoutDescription}
/// {@macro sharedWaitForOptionsMutationObserverDescription}
///
/// {@category Async}
Future<void> waitForElementToBeRemoved(
  Node Function() callback, {
  Node container,
  Duration timeout,
  Duration interval = const Duration(milliseconds: 50),
  QueryTimeoutFn onTimeout,
  MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
}) async {
  container ??= document.body;

  final el = callback();
  if (el == null) {
    throw TestingLibraryElementError('The callback must return a non-null Element.');
  }

  if (!container.contains(el)) {
    throw TestingLibraryElementError(
        'The element returned from the callback was not present in the container at the time waitForElementToBeRemoved() was called:\n\n'
        '${prettyDOM(container)}');
  }

  await waitFor(
    () => expect(container.contains(el), isFalse),
    container: container,
    timeout: timeout,
    interval: interval,
    onTimeout: onTimeout ??
        (error) {
          return TimeoutException(
              'The element returned from the callback was still present in the container after ${timeout.inMilliseconds}ms:\n\n'
              '${prettyDOM(container)}');
        },
    mutationObserverOptions: mutationObserverOptions,
  );
}

/// Waits for the removal of all the elements returned from the [callback] to be removed from the DOM.
///
/// To wait for a single element to be removed, use [waitForElementToBeRemoved].
///
/// ## Options
///
/// ### container
///
/// An ancestor DOM node of the elements you return from [callback].
/// This node will have a [MutationObserver] attached to it.
///
/// Defaults to `document.body`.
///
/// {@macro sharedWaitForOptionsTimeoutDescription}
/// {@macro sharedWaitForOptionsIntervalDescription}
/// {@macro sharedWaitForOptionsOnTimeoutDescription}
/// {@macro sharedWaitForOptionsMutationObserverDescription}
///
/// {@category Async}
Future<void> waitForElementsToBeRemoved(
  List<Node> Function() callback, {
  Node container,
  Duration timeout,
  Duration interval = const Duration(milliseconds: 50),
  QueryTimeoutFn onTimeout,
  MutationObserverOptions mutationObserverOptions = defaultMutationObserverOptions,
}) async {
  container ??= document.body;
  final els = callback();

  if (els == null || els.isEmpty) {
    throw TestingLibraryElementError('The callback must return one or more non-null Elements.');
  }

  for (final el in els) {
    if (!container.contains(el)) {
      throw TestingLibraryElementError(
          'One of the elements returned from the callback was not present in the container at the time waitForElementsToBeRemoved() was called:\n\n'
          '${prettyDOM(container)}');
    }
  }

  await Future.wait(els.map((el) => waitForElementToBeRemoved(() => el,
      container: container,
      timeout: timeout,
      interval: interval,
      onTimeout: onTimeout,
      mutationObserverOptions: mutationObserverOptions)));
}

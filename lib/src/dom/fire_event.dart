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
library react_testing_library.src.dom.fire_event;

import 'dart:html';

import 'package:js/js.dart';
import 'package:react/react_client/js_backed_map.dart';
import 'package:react/react_client/js_interop_helpers.dart';

import '../util/event_handler_error_catcher.dart';
import '../user_event/user_event.dart';

/// Fires a DOM [event] on the provided [element].
///
/// > **NOTE:**
/// >
/// > Most projects have a few use cases for [fireEvent], but the majority of the time you should
///   probably use [UserEvent] utility methods instead.
/// >
/// > Read more about [interactions vs. events](https://workiva.github.io/react_testing_library/topics/UserActions-topic.html#interactions-vs-events)
///
/// ## Example
///
/// ```html
/// <button>Submit</button>
/// ```
///
/// ```dart
/// import 'package:react/react.dart' as react;
/// import 'package:react_testing_library/react_testing_library.dart' as rtl;
/// import 'package:test/test.dart';
///
/// void main() {
///   test('', () {
///     // Render the DOM shown in the example snippet above.
///     final view = rtl.render(react.button({}, 'Submit'));
///
///     // Use react_testing_library queries to store a reference to the node.
///     final button = view.getByRole('button', name: 'Submit');
///
///     // Use `fireEvent` to create a click event, and emit it on the node.
///     rtl.fireEvent(
///       button,
///       MouseEvent('click'),
///     );
///   });
/// }
/// ```
///
/// ## Warning About Errors
///
/// Unlike the JS API, _any uncaught errors thrown during event propagation will get rethrown._
/// This helps surface errors that could otherwise go unnoticed since they aren't printed
/// to the terminal when running tests.
///
/// {@macro RenderSupportsReactAndOverReactCallout}
///
/// Related: [fireEventByName]
///
/// See: <https://testing-library.com/docs/dom-testing-library/api-events/#fireevent>
///
/// {@category UserActions}
bool fireEvent(Element element, Event event) => eventHandlerErrorCatcher(() => _fireEvent(element, event));

@JS('rtl.fireEvent')
external bool _fireEvent(
  Element element,
  Event event,
);

@JS('rtl.fireEventObj')
external JsMap get _fireEventObj;

/// Fires a DOM [Event] using the [eventName] on the provided [element].
///
/// The [eventName] must be one of the keys found in the
/// JS [`eventMap`](https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js).
///
/// > **NOTE:**
/// >
/// > Most projects have a few use cases for [fireEventByName], but the majority of the time you should
///   probably use [UserEvent] utility methods instead.
/// >
/// > Read more about [interactions vs. events](https://workiva.github.io/react_testing_library/topics/UserActions-topic.html#interactions-vs-events)
///
/// ### Dart / JS API Parity
///
/// Since Dart doesn't support anonymous objects that can act as both a Map and a function
/// like the JS `fireEvent` can, this function acts as a proxy for:
///
/// ```js
/// // JS API
/// fireEvent.click(someElement, {'button': 2});
/// ```
///
/// Where the Dart API equivalent of the above call would be:
///
/// ```dart
/// // Dart API
/// fireEventByName('click', someElement, {'button': 2});
/// ```
///
/// ### Warning About Errors
///
/// Unlike the JS API, _any uncaught errors thrown during event propagation will get rethrown._
/// This helps surface errors that could otherwise go unnoticed since they aren't printed
/// to the terminal when running tests.
///
/// See: <https://testing-library.com/docs/dom-testing-library/api-events/#fireeventeventname>
///
/// {@category UserActions}
bool fireEventByName(String eventName, Element element, [Map eventProperties]) {
  if (!JsBackedMap.fromJs(_jsEventMap).keys.contains(eventName)) {
    throw ArgumentError.value(eventName, 'eventName');
  }

  final jsFireEventByNameFn =
      JsBackedMap.fromJs(_fireEventObj)[eventName] as bool Function(Element, [/*JsObject*/ dynamic]);

  if (eventProperties == null) {
    return eventHandlerErrorCatcher(() => jsFireEventByNameFn(element));
  }

  return eventHandlerErrorCatcher(() => jsFireEventByNameFn(element, jsifyAndAllowInterop(eventProperties)));
}

@JS('rtl.eventMap')
external JsMap get _jsEventMap;

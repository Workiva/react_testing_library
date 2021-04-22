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
library react_testing_library.src.user_events.user_event;

import 'dart:html';

import 'package:js/js.dart';
import 'package:react/react_client/js_backed_map.dart';
import 'package:react/react_client/js_interop_helpers.dart';

import '../dom/fire_event.dart';

dynamic _jsifyEventData(Map eventData) =>
    jsifyAndAllowInterop(eventData ?? const {});

/// Test utilities that provide more advanced simulation of browser interactions
/// than the built-in [fireEvent] method.
class UserEvent {
  /// Clicks [element], depending on what [element] is it can have different
  /// side effects.
  ///
  /// Note that [click] will trigger hover events before clicking. To disable
  /// this, set the [skipHover] option to `true`.
  ///
  /// Use [eventInit] to set options on the initial [MouseEvent]. For example,
  ///
  /// ```dart
  /// UserEvent.click(element, eventInit: {'shiftKey': true});
  /// ```
  ///
  /// Use [clickCount] to update the initial click count. See documentation on
  /// [UIEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  /// for more information.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#clickelement-eventinit-options>.
  static bool click(
    Element element, {
    Map eventInit,
    bool skipHover = false,
    int clickCount = 0,
  }) {
    final options =
        JsBackedMap.from({'skipHover': skipHover, 'clickCount': clickCount})
            .jsObject;
    return JsBackedMap.fromJs(userEvent)['click'](
        element, _jsifyEventData(eventInit), options);
  }

  /// Clicks [element] twice, depending on what [element] is it can have
  /// different side effects.
  ///
  /// Use [eventInit] to set options on the initial [MouseEvent]. For example,
  ///
  /// ```dart
  /// UserEvent.dblClick(element, eventInit: {'shiftKey': true});
  /// ```
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#dblclickelement-eventinit-options>.
  static bool dblClick(Element element, {Map eventInit}) {
    return JsBackedMap.fromJs(userEvent)['dblClick'](element, _jsifyEventData(eventInit),);
  }
}

@JS('rtl.userEvent')
external get userEvent;

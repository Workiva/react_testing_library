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
library react_testing_library.src.user_event.user_event;

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
  /// this, set [skipHover] to `true`.
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
  static void click(
    Element element, {
    Map eventInit,
    bool skipHover = false,
    int clickCount = 0,
  }) {
    final options =
        JsBackedMap.from({'skipHover': skipHover, 'clickCount': clickCount})
            .jsObject;
    return JsBackedMap.fromJs(_userEvent)['click'](
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
  static void dblClick(Element element, {Map eventInit}) {
    return JsBackedMap.fromJs(_userEvent)['dblClick'](element, _jsifyEventData(eventInit),);
  }

  /// TODO finish this description
  ///
  /// Note that [type] will click the element before typing. To disable this,
  /// set the [skipClick] option to true. When skipping the click you must
  /// manually focus [element] using `element.focus()`.
  ///
  ///
  /// > A note about modifiers: Modifier keys ({shift}, {ctrl}, {alt}, {meta})
  /// will activate their corresponding event modifiers for the duration of type
  /// command or until they are closed (via {/shift}, {/ctrl}, etc.). If they
  /// are not closed explicitly, then key up events will be fired to close them
  /// automatically (to disable this, set the [skipAutoClose] option to true).
  ///
  /// > Also note that behavior that happens with modifier key combinations will
  /// not be simulated as different operating systems function differently in
  /// this regard.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options>.
  static void type(
      Element element, String text, {
        bool skipClick = false,
        bool skipAutoClose = false,
        int initialSelectionStart,
        int initialSelectionEnd,
      }) {
    final options = <String, dynamic>{'skipClick': skipClick, 'skipAutoClose': skipAutoClose,};
    if(initialSelectionStart != null) {
      options.putIfAbsent('initialSelectionStart', () => initialSelectionStart);
    }
    if(initialSelectionEnd != null) {
      options.putIfAbsent('initialSelectionEnd', () => initialSelectionEnd);
    }

    JsBackedMap.fromJs(_userEvent)['type'](element, text, JsBackedMap.from(options).jsObject,);
  }

  static Future<void> typeWithDelay(
      Element element, String text, int delay, {
        bool skipClick = false,
        bool skipAutoClose = false,
        dynamic initialSelectionStart,
        dynamic initialSelectionEnd,
      }) async {
    final options = {'delay': delay, 'skipClick': skipClick, 'skipAutoClose': skipAutoClose,};
    final map = JsBackedMap.from(options).jsObject;
    // if(initialSelectionStart != null) {
    //   options.putIfAbsent('initialSelectionStart', () => initialSelectionStart);
    // }
    // if(initialSelectionEnd != null) {
    //   options.putIfAbsent('initialSelectionEnd', () => initialSelectionEnd);
    // }

    await promiseToFuture(JsBackedMap.fromJs(_userEvent)['type'](element, text, map,));
  }
}

@JS('rtl.userEvent')
external get _userEvent;

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

dynamic _jsifyEventData(Map eventData) =>
    jsifyAndAllowInterop(eventData ?? const {});

class UserEvent {
  static bool click(
    Element element, {
    Map init,
    bool skipHover = false,
    int clickCount = 0,
  }) {
    final options = JsBackedMap.from(
        {'skipHover': skipHover, 'clickCount': clickCount});
    return JsBackedMap.fromJs(userEvent)['click'](
        element, _jsifyEventData(init));
  }
}

@JS('rtl.userEvent')
external get userEvent;

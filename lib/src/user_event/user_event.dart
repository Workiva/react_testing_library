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
import 'dart:js_util';

import 'package:js/js.dart';
import 'package:react/react_client/js_backed_map.dart';
import 'package:react/react_client/js_interop_helpers.dart';

import '../dom/fire_event.dart';

dynamic _jsifyEventData(Map eventData) => jsifyAndAllowInterop(eventData ?? const {});

// Converts a JsMap FileList to a List<File>.
List<File> _unjsifyFileList(List<File> fileList) {
  if (fileList is! JsMap) return fileList;
  final jsFileList = JsBackedMap.fromJs(fileList as JsMap);
  final convertedFiles = <File>[];
  for (int i = 0; i < (jsFileList['length'] as int); i++) {
    convertedFiles.add(jsFileList['item'](i) as File);
  }
  return convertedFiles;
}

// todo possibly add tests for the arg type errors these could throw (if not add type checks here)

// todo add examples to doc comments and create dartdoc pages

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
    final options = {'skipHover': skipHover, 'clickCount': clickCount};
    return JsBackedMap.fromJs(_userEvent)['click'](
      element,
      _jsifyEventData(eventInit),
      JsBackedMap.from(options).jsObject,
    );
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
    return JsBackedMap.fromJs(_userEvent)['dblClick'](
      element,
      _jsifyEventData(eventInit),
    );
  }

  /// Writes [text] inside an input or textarea [element].
  ///
  /// To add a delay between each character typed, use [UserEvent.typeWithDelay].
  ///
  /// Note that [type] will click the element before typing. To disable this,
  /// set the [skipClick] option to true. When skipping the click you must
  /// manually focus [element] using `element.focus()`.
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
  /// ### With Selection Range
  ///
  /// > Note: [type] does not currently work as expected with selection range due
  /// > to [a bug](https://github.com/testing-library/user-event/issues/677) in
  /// > the user-event package.
  ///
  /// If [element] already contains a value, [type] will begin typing at the end
  /// of the existing value by default. To override this behavior and set the
  /// selection range to something else, call [element.setSelectionRange] before
  /// calling [type].
  ///
  /// In order to set the initial selection range to zero, you must also set
  /// [initialSelectionStart] and [initialSelectionEnd] to zero along with
  /// calling `element.setSelectionRange(0, 0)`.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options>.
  // TODO: figure out why this does not work as expected with selection range https://jira.atl.workiva.net/browse/CPLAT-14155
  static void type(
    Element element,
    String text, {
    bool skipClick = false,
    bool skipAutoClose = false,
    // The follow two options currently do not work as expected.
    int initialSelectionStart,
    int initialSelectionEnd,
  }) {
    final options = <String, dynamic>{
      'skipClick': skipClick,
      'skipAutoClose': skipAutoClose,
    };
    if (initialSelectionStart != null) {
      options.addEntries([MapEntry('initialSelectionStart', initialSelectionStart)]);
    }
    if (initialSelectionEnd != null) {
      options.addEntries([MapEntry('initialSelectionEnd', initialSelectionEnd)]);
    }

    JsBackedMap.fromJs(_userEvent)['type'](
      element,
      text,
      JsBackedMap.from(options).jsObject,
    );
  }

  /// Writes [text] inside an input or textarea [element] with a [delay] between
  /// each character typed.
  ///
  /// Use [UserEvent.type] for no [delay].
  ///
  /// Note that [type] will click the element before typing. To disable this,
  /// set the [skipClick] option to true. When skipping the click you must
  /// manually focus [element] using `element.focus()`.
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
  /// ### With Selection Range
  ///
  /// > Note: [typeWithDelay] does not currently work as expected with selection range due
  /// > to [a bug](https://github.com/testing-library/user-event/issues/677) in
  /// > the user-event package.
  ///
  /// If [element] already contains a value, [type] will begin typing at the end
  /// of the existing value by default. To override this behavior and set the
  /// selection range to something else, call [element.setSelectionRange] before
  /// calling [type].
  ///
  /// In order to set the initial selection range to zero, you must also set
  /// [initialSelectionStart] and [initialSelectionEnd] to zero along with
  /// calling `element.setSelectionRange(0, 0)`.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options>.
  // TODO: figure out why this does not work as expected with selection range https://jira.atl.workiva.net/browse/CPLAT-14155
  static Future<void> typeWithDelay(
    Element element,
    String text,
    Duration delay, {
    bool skipClick = false,
    bool skipAutoClose = false,
    dynamic initialSelectionStart,
    dynamic initialSelectionEnd,
  }) async {
    final options = {
      'delay': delay.inMilliseconds,
      'skipClick': skipClick,
      'skipAutoClose': skipAutoClose,
    };
    if (initialSelectionStart != null) {
      options.addEntries([MapEntry('initialSelectionStart', initialSelectionStart)]);
    }
    if (initialSelectionEnd != null) {
      options.addEntries([MapEntry('initialSelectionEnd', initialSelectionEnd)]);
    }

    await promiseToFuture(JsBackedMap.fromJs(_userEvent)['type'](
      element,
      text,
      JsBackedMap.from(options).jsObject,
    ));
  }

  /// Learn more: <https://github.com/testing-library/user-event#keyboardtext-options>.
  static dynamic keyboard(String text, {dynamic keyboardState}) {
    // todo https://github.com/testing-library/user-event/blob/master/src/keyboard/types.ts
    final options = keyboardState != null ? {'keyboardState': keyboardState} : {};
    return JsBackedMap.fromJs(_userEvent)['keyboard'](
      text,
      JsBackedMap.from(options).jsObject,
    );
  }

  /// Uploads [files] to [element].
  ///
  /// [element] must be an [InputElement] with a `type` attribute of "file" or a
  /// [LabelElement] for a file [InputElement]. When uploading multiple files,
  /// make sure that [element]'s `multiple` attribute is set to `true`.
  ///
  /// Use [clickInit] and [changeInit] to initialize the click and change events
  /// that occur as a part of the upload.
  ///
  /// By default, the `accept` attribute on [element] will be ignored when
  /// [upload]ing files. Set [applyAccept] to true to allow `accept` to filter
  /// files.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event#uploadelement-file--clickinit-changeinit->.
  static void upload(
    /*InputElement | LabelElement*/ Element element,
    List<File> files, {
    Map clickInit,
    Map changeInit,
    bool applyAccept = false,
  }) {
    final init = {
      'clickInit': _jsifyEventData(clickInit),
      'changeInit': _jsifyEventData(changeInit),
    };
    final options = {'applyAccept': applyAccept};
    JsBackedMap.fromJs(_userEvent)['upload'](
      element,
      files,
      JsBackedMap.from(init).jsObject,
      JsBackedMap.from(options).jsObject,
    );

    if (element is LabelElement && element.control is InputElement) {
      (element.control as InputElement).files = _unjsifyFileList((element.control as InputElement).files);
    } else if (element is InputElement) {
      element.files = _unjsifyFileList(element.files);
    }
  }

  /// Selects the text inside [element] and deletes it.
  ///
  /// [element] can be an [InputElement] or [TextAreaElement].
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#clearelement>.
  static void clear(Element element) {
    // todo delete this workaround when I figure out why typing {selectall} doesn't work in dart
    // https://codesandbox.io/s/user-event-clear-thivp?file=/src/__tests__/index.js
    if (element is InputElement) {
      element.setSelectionRange(0, element.value.length);
    } else if (element is TextAreaElement) {
      element.setSelectionRange(0, element.value.length);
    }
    // end workaround
    JsBackedMap.fromJs(_userEvent)['clear'](element);
  }

  /// Selects the specified [values] of [selectElement].
  ///
  /// [values] can either be a list of values or [OptionElement]s.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values>.
  static void selectOptions(
    SelectElement selectElement,
    List<dynamic> values, {
    Map clickInit,
  }) {
    JsBackedMap.fromJs(_userEvent)['selectOptions'](
      selectElement,
      values,
      _jsifyEventData(clickInit),
    );
  }

  /// Removes the selection for the specified [values] of [selectElement].
  ///
  /// [selectElement] must have the `multiple` attribute set to `true`.
  ///
  /// [options] can either be a list of values or [OptionElement]s.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#deselectoptionselement-values>.
  static void deselectOptions(
    SelectElement selectElement,
    List<dynamic> values, {
    Map clickInit,
  }) {
    JsBackedMap.fromJs(_userEvent)['deselectOptions'](
      selectElement,
      values,
      _jsifyEventData(clickInit),
    );
  }

  /// Fires a tab event changing the document.activeElement in the same way the browser does.
  ///
  /// Options:
  /// * [shift] (default `false`): can be true or false to invert tab direction.
  /// * [focusTrap] (default [document.body]): a container element to restrict the tabbing within.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#tabshift-focustrap>.
  static void tab({bool shift, Element focusTrap}) {
    final options = {'shift': shift, 'focusTrap': focusTrap};
    return JsBackedMap.fromJs(_userEvent)['tab'](
      JsBackedMap.from(options).jsObject,
    );
  }

  /// Hovers over [element].
  ///
  /// Use [eventInit] to initialize the `onMouseOver` event.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event/#hoverelement>.
  static void hover(Element element, {Map eventInit}) {
    return JsBackedMap.fromJs(_userEvent)['hover'](element, _jsifyEventData(eventInit));
  }

  /// Unhovers out of [element].
  ///
  /// Use [eventInit] to initialize the `onMouseOut` event.
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event#unhoverelement>.
  static void unhover(Element element, {Map eventInit}) {
    return JsBackedMap.fromJs(_userEvent)['unhover'](element, _jsifyEventData(eventInit));
  }

  /// Simulates pasting [text] into [element].
  ///
  /// Use [eventInit] to initialize the clipboard event.
  ///
  /// todo add description of selection start and end options
  ///
  /// Learn more: <https://testing-library.com/docs/ecosystem-user-event#pasteelement-text-eventinit-options>.
  static void paste(
    Element element,
    String text, {
    Map eventInit,
    int initialSelectionStart,
    int initialSelectionEnd,
  }) {
    final options = {
      'initialSelectionStart': initialSelectionStart,
      'initialSelectionEnd': initialSelectionEnd,
    };
    return JsBackedMap.fromJs(_userEvent)['paste'](
      element,
      text,
      _jsifyEventData(eventInit),
      JsBackedMap.from(options).jsObject,
    );
  }
}

@JS('rtl.userEvent')
external JsMap get _userEvent;

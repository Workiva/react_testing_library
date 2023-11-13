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
import 'package:meta/meta.dart';
import 'package:react/react_client/js_backed_map.dart';
import 'package:react/react_client/js_interop_helpers.dart';

import '../util/event_handler_error_catcher.dart';
import '../dom/fire_event.dart';
import 'special_chars.dart';

/// Test [utility methods](#static-methods) that provide more advanced simulation of browser interactions
/// than the [fireEvent] function.
///
/// > See: <https://testing-library.com/docs/ecosystem-user-event>
///
/// {@category UserActions}
@sealed
abstract class UserEvent {
  /// Clicks [element], depending on what [element] is it can have different
  /// side effects.
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#clickelement-eventinit-options>
  ///
  /// ## Options
  ///
  /// ### [eventInit]
  ///
  /// Use [eventInit] to set options on the initial [MouseEvent]. For example,
  ///
  /// ```dart
  /// UserEvent.click(element, eventInit: {'shiftKey': true});
  /// ```
  ///
  /// ### [skipHover]
  ///
  /// [click] will trigger hover events before clicking. To disable this, set
  /// [skipHover] to `true`.
  ///
  /// ### [clickCount]
  ///
  /// Use [clickCount] to update the initial click count. See documentation on
  /// [UIEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  /// for more information.
  ///
  /// ### [skipPointerEventsCheck]
  ///
  /// Attempting to interact with an element that has `'pointer-events: none'`
  /// set will throw an error. Use [skipPointerEventsCheck] to prevent that error
  /// from being thrown by skipping the check of whether any element in the
  /// DOM-tree has `'pointer-events: none'` set. In addition, the underlying
  /// check for pointer events is costly in general and very costly when rendering
  /// large DOM-trees. Can be used to speed up tests.
  ///
  /// ## Example
  ///
  /// ```html
  /// <input type="checkbox" />
  /// ```
  ///
  /// ```dart
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show isChecked;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.input({'type': 'checkbox'}));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final checkbox = view.getByRole('checkbox');
  ///
  ///     // Use `UserEvent.click` to simulate a user clicking the checkbox.
  ///     UserEvent.click(checkbox);
  ///
  ///     // Use `isChecked` matcher to verify that the checkbox was clicked.
  ///     expect(checkbox, isChecked);
  ///   });
  /// }
  /// ```
  ///
  /// ### Warning About Errors
  ///
  /// Unlike the JS API, _any uncaught errors thrown during event propagation will get rethrown._
  /// This helps surface errors that could otherwise go unnoticed since they aren't printed
  /// to the terminal when running tests.
  ///
  /// {@macro RenderSupportsReactAndOverReactCallout}
  ///
  /// {@category UserActions}
  static void click(
    Element element, {
    Map? eventInit,
    bool skipHover = false,
    int clickCount = 0,
    bool skipPointerEventsCheck = false,
  }) {
    final options = {
      'skipHover': skipHover,
      'clickCount': clickCount,
      'skipPointerEventsCheck': skipPointerEventsCheck,
    };
    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'click')(
        element,
        _jsifyEventData(eventInit),
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Clicks [element] twice, depending on what [element] is it can have
  /// different side effects.
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#dblclickelement-eventinit-options>
  ///
  /// ## Options
  ///
  /// ### [eventInit]
  ///
  /// Use [eventInit] to set options on the initial [MouseEvent]. For example,
  ///
  /// ```dart
  /// UserEvent.dblClick(element, eventInit: {'shiftKey': true});
  /// ```
  ///
  /// ### [skipPointerEventsCheck]
  ///
  /// Attempting to interact with an element that has `'pointer-events: none'`
  /// set will throw an error. Use [skipPointerEventsCheck] to prevent that error
  /// from being thrown by skipping the check of whether any element in the
  /// DOM-tree has `'pointer-events: none'` set. In addition, the underlying
  /// check for pointer events is costly in general and very costly when rendering
  /// large DOM-trees. Can be used to speed up tests.
  ///
  /// ## Example
  ///
  /// ```jsx
  /// <input type="checkbox" onChange={() => clickCount++} />
  /// ```
  ///
  /// ```dart
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show isChecked;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     var clickCount = 0;
  ///
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.input({
  ///       'type': 'checkbox',
  ///       'onChange': (_) => clickCount++,
  ///     }));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final checkbox = view.getByRole('checkbox');
  ///
  ///     // Use `UserEvent.dblClick` to simulate a user double clicking the checkbox.
  ///     UserEvent.dblClick(checkbox);
  ///
  ///     expect(clickCount, equals(2));
  ///
  ///     // Use `isChecked` matcher to verify that the checkbox is no longer checked.
  ///     expect(checkbox, isNot(isChecked));
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
  /// {@category UserActions}
  static void dblClick(Element element, {Map? eventInit, bool skipPointerEventsCheck = false}) {
    final options = {
      'skipPointerEventsCheck': skipPointerEventsCheck,
    };

    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'dblClick')(
        element,
        _jsifyEventData(eventInit),
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Writes [text] inside an input or textarea [element].
  ///
  /// > To add a delay between each character typed, use [UserEvent.typeWithDelay].
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options>
  ///
  /// ## Options
  ///
  /// ### [skipClick]
  ///
  /// [type] will click the element before typing. To disable this, set the [skipClick]
  /// option to true. When skipping the click you must manually focus [element] using `element.focus()`.
  ///
  /// ### [skipAutoClose]
  ///
  /// Modifier keys ({shift}, {ctrl}, {alt}, {meta}) will activate their corresponding
  /// event modifiers for the duration of type command or until they are closed (via {/shift}, {/ctrl}, etc.).
  /// If they are not closed explicitly, then key up events will be fired to close them
  /// automatically. To disable this, set the [skipAutoClose] option to true.
  ///
  /// > Note that behavior that happens with modifier key combinations will
  /// not be simulated as different operating systems function differently in
  /// this regard.
  ///
  /// ## With Selection Range
  ///
  /// If [element] already contains a value, [type] will begin typing at the end
  /// of the existing value by default. To override this behavior and set the
  /// selection range to something else, call [InputElement.setSelectionRange] before
  /// calling [type].
  ///
  /// In order to set the initial selection range to zero, you must also set
  /// [initialSelectionStart] and [initialSelectionEnd] to zero along with
  /// calling `element.setSelectionRange(0, 0)`.
  ///
  /// ## Special Characters
  ///
  /// [Supported special characters](https://testing-library.com/docs/ecosystem-user-event/#special-characters)
  /// can be used in [text] to modify the behavior of [type]. Common characters are also
  /// exposed via [SpecialChars].
  ///
  /// ## Example
  ///
  /// ```html
  /// <div>
  ///   <label for="input">Type here:</label>
  ///   <input id="input" />
  /// </div>
  /// ```
  ///
  /// ```dart
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show hasValue;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.div({}, [
  ///       react.label({
  ///         'htmlFor': 'input',
  ///       }, 'Type here:'),
  ///       react.input({'id': 'input'})
  ///     ]));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final input = view.getByLabelText('Type here:');
  ///
  ///     // Use `UserEvent.type` to simulate a user typing in the input.
  ///     UserEvent.type(input, 'Hello, World!');
  ///
  ///     // Use `hasValue` matcher to verify the value of input.
  ///     expect(input, hasValue('Hello, World!'));
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
  /// {@category UserActions}
  static void type(
    Element element,
    String text, {
    bool skipClick = false,
    bool skipAutoClose = false,
    // The follow two options currently do not work as expected.
    int? initialSelectionStart,
    int? initialSelectionEnd,
  }) {
    final options = {
      'skipClick': skipClick,
      'skipAutoClose': skipAutoClose,
      if (initialSelectionStart != null) 'initialSelectionStart': initialSelectionStart,
      if (initialSelectionEnd != null) 'initialSelectionEnd': initialSelectionEnd,
    };
    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'type')(
        element,
        text,
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Writes [text] inside an input or textarea [element] with a [delay] between
  /// each character typed.
  ///
  /// __WARNING__: When using [typeWithDelay], [element] must be allowed to keep focus or the test
  /// will fail. When running tests concurrently, do not use [typeWithDelay], instead use [UserEvent.type].
  ///
  /// > Use [UserEvent.type] for no [delay].
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#typeelement-text-options>
  ///
  /// ## Options
  ///
  /// ### [skipClick]
  ///
  /// [typeWithDelay] will click the element before typing. To disable this, set the [skipClick]
  /// option to true. When skipping the click you must manually focus [element] using `element.focus()`.
  ///
  /// ### [skipAutoClose]
  ///
  /// Modifier keys ({shift}, {ctrl}, {alt}, {meta}) will activate their corresponding
  /// event modifiers for the duration of type command or until they are closed (via {/shift}, {/ctrl}, etc.).
  /// If they are not closed explicitly, then key up events will be fired to close them
  /// automatically. To disable this, set the [skipAutoClose] option to true.
  ///
  /// > Note that behavior that happens with modifier key combinations will
  /// not be simulated as different operating systems function differently in
  /// this regard.
  ///
  /// ## With Selection Range
  ///
  /// If [element] already contains a value, [typeWithDelay] will begin typing at the end
  /// of the existing value by default. To override this behavior and set the
  /// selection range to something else, call [InputElement.setSelectionRange] before
  /// calling [typeWithDelay].
  ///
  /// In order to set the initial selection range to zero, you must also set
  /// [initialSelectionStart] and [initialSelectionEnd] to zero along with
  /// calling `element.setSelectionRange(0, 0)`.
  ///
  /// ## Special Characters
  ///
  /// [Supported special characters](https://testing-library.com/docs/ecosystem-user-event/#special-characters)
  /// can be used in [text] to modify the behavior of [typeWithDelay]. Common characters are also
  /// exposed via [SpecialChars].
  ///
  /// ## Example
  ///
  /// ```html
  /// <div>
  ///   <label for="input">Type here:</label>
  ///   <input id="input" />
  /// </div>
  /// ```
  ///
  /// ```dart
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show hasValue;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () async {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.div({}, [
  ///       react.label({
  ///         'htmlFor': 'input',
  ///       }, 'Type here:'),
  ///       react.input({'id': 'input'})
  ///     ]));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final input = view.getByLabelText('Type here:');
  ///
  ///     // Use `UserEvent.type` to simulate a user typing in the input.
  ///     await UserEvent.typeWithDelay(input, 'Hello, World!', Duration(milliseconds: 500));
  ///
  ///     // Use `hasValue` matcher to verify the value of input.
  ///     expect(input, hasValue('Hello, World!'));
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
  /// {@category UserActions}
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
      if (initialSelectionStart != null) 'initialSelectionStart': initialSelectionStart,
      if (initialSelectionEnd != null) 'initialSelectionEnd': initialSelectionEnd,
    };

    await eventHandlerErrorCatcher(() async {
      await promiseToFuture(getProperty(_userEvent, 'type')(
        element,
        text,
        jsifyAndAllowInterop(options),
      ) as Object);
    });
  }

  /// Simulates the keyboard events described by [text].
  ///
  /// This is similar to [UserEvent.type] but without any clicking or changing the selection range.
  ///
  /// > To add a delay between each keystroke, use [UserEvent.keyboardWithDelay].
  ///
  /// > See: <https://github.com/testing-library/user-event#keyboardtext-options>
  ///
  /// Keystrokes can be described:
  ///
  /// * Per printable character
  /// ```
  ///   UserEvent.keyboard('foo') // translates to: f, o, o
  /// ```
  /// The brackets `{` and `[` are used as special characters and can be
  /// referenced by doubling them.
  /// ```
  /// UserEvent.keyboard('{{a[[') // translates to: {, a, [
  /// ```
  /// * Per [KeyboardEvent.key] (only supports alphanumeric values of key)
  /// ```
  /// UserEvent.keyboard('{Shift}{f}{o}{o}') // translates to: Shift, f, o, o
  /// ```
  /// This does not keep any key pressed. So Shift will be lifted before pressing f.
  /// * Per [KeyboardEvent.code]
  /// ```
  /// UserEvent.keyboard('[ShiftLeft][KeyF][KeyO][KeyO]') // translates to: Shift, f, o, o
  /// ```
  /// * Per legacy [UserEvent.type] modifier/specialChar
  /// The modifiers like {shift} (note the lowercase) will automatically be kept
  /// pressed. You can cancel this behavior by adding a / to the end of the descriptor.
  /// ```
  /// UserEvent.keyboard('{shift}{ctrl/}a{/shift}') // translates to: Shift(down), Control(down+up), a, Shift(up)
  /// ```
  /// Keys can be kept pressed by adding a `>` to the end of the descriptor - and lifted by adding a `/` to the beginning of the descriptor:
  /// ```
  /// UserEvent.keyboard('{Shift>}A{/Shift}') // translates to: Shift(down), A, Shift(up)
  /// ```
  ///
  /// ## Options
  ///
  /// ### [keyboardState]
  ///
  /// [keyboard] returns a keyboard state that can be used to continue keyboard operations.
  ///
  /// ```
  /// final keyboardState = UserEvent.keyboard('[ControlLeft>]') // keydown [ControlLeft]
  /// // ... inspect some changes ...
  /// UserEvent.keyboard('a', {keyboardState: keyboardState}) // press [KeyA] with active ctrlKey modifier
  /// ```
  ///
  /// ### [keyboardMap]
  ///
  /// The mapping of key to code is performed by a [default key map](https://github.com/testing-library/user-event/blob/master/src/keyboard/keyMap.ts)
  /// portraying a "default" US-keyboard. You can provide your own local keyboard mapping per option.
  ///
  /// ```
  /// UserEvent.keyboard('?', {keyboardMap: myOwnLocaleKeyboardMap})
  /// ```
  ///
  /// ### [autoModify]
  ///
  /// Future versions might try to interpolate the modifiers needed to reach a
  /// printable key on the keyboard. E.g. Automatically pressing {Shift} when
  /// CapsLock is not active and A is referenced. If you don't wish this behavior,
  /// set [autoModify] to `false` (this is `false` by default).
  ///
  /// ## Warning About Errors
  ///
  /// Unlike the JS API, _any uncaught errors thrown during event propagation will get rethrown._
  /// This helps surface errors that could otherwise go unnoticed since they aren't printed
  /// to the terminal when running tests.
  ///
  /// {@category UserActions}
  static KeyboardState keyboard(
    String text, {
    KeyboardState? keyboardState,
    bool autoModify = false,
    List<Map>? keyboardMap,
  }) {
    final options = {
      'autoModify': autoModify,
      if (keyboardState != null) 'keyboardState': keyboardState,
      if (keyboardMap != null) 'keyboardMap': keyboardMap,
    };
    return eventHandlerErrorCatcher(() {
      return getProperty(_userEvent, 'keyboard')(
        text,
        jsifyAndAllowInterop(options),
      ) as KeyboardState;
    });
  }

  /// Simulates the keyboard events described by [text] with a [delay] between each keystroke.
  ///
  /// This is similar to [UserEvent.typeWithDelay] but without any clicking or changing the selection range.
  ///
  /// __WARNING__: When using [keyboardWithDelay], the element being typed in must be allowed to keep focus or the test
  /// will fail. When running tests concurrently, do not use [keyboardWithDelay], instead use [UserEvent.keyboard].
  ///
  /// > Use [UserEvent.keyboard] for no [delay].
  ///
  /// > See: <https://github.com/testing-library/user-event#keyboardtext-options>
  ///
  /// Keystrokes can be described:
  ///
  /// * Per printable character
  /// ```
  ///   UserEvent.keyboard('foo') // translates to: f, o, o
  /// ```
  /// The brackets `{` and `[` are used as special characters and can be
  /// referenced by doubling them.
  /// ```
  /// UserEvent.keyboard('{{a[[') // translates to: {, a, [
  /// ```
  /// * Per [KeyboardEvent.key] (only supports alphanumeric values of key)
  /// ```
  /// UserEvent.keyboard('{Shift}{f}{o}{o}') // translates to: Shift, f, o, o
  /// ```
  /// This does not keep any key pressed. So Shift will be lifted before pressing f.
  /// * Per [KeyboardEvent.code]
  /// ```
  /// UserEvent.keyboard('[ShiftLeft][KeyF][KeyO][KeyO]') // translates to: Shift, f, o, o
  /// ```
  /// * Per legacy [UserEvent.type] modifier/specialChar
  /// The modifiers like {shift} (note the lowercase) will automatically be kept
  /// pressed. You can cancel this behavior by adding a / to the end of the descriptor.
  /// ```
  /// UserEvent.keyboard('{shift}{ctrl/}a{/shift}') // translates to: Shift(down), Control(down+up), a, Shift(up)
  /// ```
  /// Keys can be kept pressed by adding a `>` to the end of the descriptor - and lifted by adding a `/` to the beginning of the descriptor:
  /// ```
  /// UserEvent.keyboard('{Shift>}A{/Shift}') // translates to: Shift(down), A, Shift(up)
  /// ```
  ///
  /// ## Options
  ///
  /// ### [keyboardState]
  ///
  /// [keyboard] returns a keyboard state that can be used to continue keyboard operations.
  ///
  /// ```
  /// final keyboardState = UserEvent.keyboard('[ControlLeft>]') // keydown [ControlLeft]
  /// // ... inspect some changes ...
  /// UserEvent.keyboard('a', {keyboardState: keyboardState}) // press [KeyA] with active ctrlKey modifier
  /// ```
  ///
  /// ### [keyboardMap]
  ///
  /// The mapping of key to code is performed by a [default key map](https://github.com/testing-library/user-event/blob/master/src/keyboard/keyMap.ts)
  /// portraying a "default" US-keyboard. You can provide your own local keyboard mapping per option.
  ///
  /// ```
  /// UserEvent.keyboard('?', {keyboardMap: myOwnLocaleKeyboardMap})
  /// ```
  ///
  /// ### [autoModify]
  ///
  /// Future versions might try to interpolate the modifiers needed to reach a
  /// printable key on the keyboard. E.g. Automatically pressing {Shift} when
  /// CapsLock is not active and A is referenced. If you don't wish this behavior,
  /// set [autoModify] to `false` (this is `false` by default).
  ///
  /// ## Warning About Errors
  ///
  /// Unlike the JS API, _any uncaught errors thrown during event propagation will get rethrown._
  /// This helps surface errors that could otherwise go unnoticed since they aren't printed
  /// to the terminal when running tests.
  ///
  /// {@category UserActions}
  static Future<KeyboardState> keyboardWithDelay(
    String text,
    Duration delay, {
    KeyboardState? keyboardState,
    bool autoModify = false,
    List<Map>? keyboardMap,
  }) {
    final options = {
      'delay': delay.inMilliseconds,
      'autoModify': autoModify,
      if (keyboardState != null) 'keyboardState': keyboardState,
      if (keyboardMap != null) 'keyboardMap': keyboardMap,
    };
    return eventHandlerErrorCatcher(() {
      return promiseToFuture(getProperty(_userEvent, 'keyboard')(
        text,
        jsifyAndAllowInterop(options),
      ) as Object);
    });
  }

  /// Uploads [files] to [element].
  ///
  /// [element] must be a [FileUploadInputElement] or a [LabelElement] for a
  /// [FileUploadInputElement]. When uploading multiple files,
  /// make sure that [element]'s `multiple` attribute is set to `true`.
  ///
  /// See: <https://testing-library.com/docs/ecosystem-user-event/#uploadelement-file--clickinit-changeinit->
  ///
  /// ## Options
  ///
  /// ### [clickInit] and [changeInit]
  ///
  /// Use [clickInit] and [changeInit] to initialize the click and change events
  /// that occur as a part of the upload.
  ///
  /// ### [applyAccept]
  ///
  /// By default, the `accept` attribute on [element] will be ignored when
  /// [upload]ing files. Set [applyAccept] to true to allow `accept` to filter
  /// files.
  ///
  /// ## Example
  ///
  /// ```html
  /// <div>
  ///   <label for="single-input">Single Input:</label>
  ///   <input id="single-input" type="file" accept=".png,.jpeg" />
  /// </div>
  /// <div>
  ///   <label for="multi-input">Multi-Input:</label>
  ///   <input id="multi-input" type="file" accept=".png,.jpeg" multiple />
  /// </div>
  /// ```
  ///
  /// ```dart
  /// import 'dart:html';
  ///
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('Single file input', () {
  ///     final file = File([], 'file1.mp3');
  ///
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.div({}, [
  ///       react.label({
  ///         'htmlFor': 'single-input',
  ///       }, 'Single Input:'),
  ///       react.input({
  ///         'id': 'single-input',
  ///         'type': 'file',
  ///         'accept': '.png,.jpeg',
  ///       }),
  ///     ]));
  ///
  ///     // Use react_testing_library queries to store references to the nodes.
  ///     final input = view.getByLabelText('Single Input:') as FileUploadInputElement;
  ///
  ///     // Use `UserEvent.upload` to simulate a user uploading a file in the input.
  ///     UserEvent.upload(input, [file]);
  ///
  ///     // Verify the value of the input.
  ///     expect(input.files.single.name, 'file1.mp3');
  ///   });
  ///
  ///   test('Multiple file input', () {
  ///     final files = [
  ///       File([], 'file1.mp3'),
  ///       File([], 'file2.jpeg'),
  ///       File([], 'file3.png'),
  ///     ];
  ///
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.div({}, [
  ///       react.label({
  ///         'htmlFor': 'multi-input',
  ///       }, 'Multi-Input:'),
  ///       react.input({
  ///         'data-test-id': 'multi-input',
  ///         'type': 'file',
  ///         'multiple': true,
  ///         'accept': '.png,.jpeg',
  ///       }),
  ///     ]));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final input = view.getByLabelText('Multi-Input:') as FileUploadInputElement;
  ///
  ///     // Use `UserEvent.upload` to simulate a user uploading a file in the input.
  ///     UserEvent.upload(input, files, applyAccept: true);
  ///
  ///     // Verify the value of the input.
  ///     expect(input.files, hasLength(2));
  ///     expect(input.files.first.name, 'file2.jpeg');
  ///     expect(input.files[1].name, 'file3.png');
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
  /// {@category UserActions}
  static void upload(
    /*InputElement | LabelElement*/ Element element,
    List<File> files, {
    Map? clickInit,
    Map? changeInit,
    bool applyAccept = false,
  }) {
    final init = {
      'clickInit': _jsifyEventData(clickInit),
      'changeInit': _jsifyEventData(changeInit),
    };
    final options = {'applyAccept': applyAccept};
    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'upload')(
        element,
        files,
        _jsifyEventData(init),
        jsifyAndAllowInterop(options),
      );
    });

    // Convert the `element.files` because the JS `upload` sets it equal to a
    // map with with an `item` method to access files.
    if (element is LabelElement && element.control is FileUploadInputElement) {
      (element.control! as FileUploadInputElement).files =
          _unjsifyFileList((element.control! as FileUploadInputElement).files);
    } else if (element is FileUploadInputElement) {
      element.files = _unjsifyFileList(element.files);
    }
  }

  /// Selects the text inside [element] and deletes it.
  ///
  /// [element] can be an [InputElement] or [TextAreaElement].
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#clearelement>
  ///
  /// ## Example
  ///
  /// ```html
  /// <input value="Hello, World!" />
  /// ```
  ///
  /// ```dart
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show hasValue;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.input({
  ///       'defaultValue': 'Hello, World!',
  ///     }));
  ///
  ///     // Use react_testing_library queries to store references to the nodes.
  ///     final input = view.getByRole('textbox');
  ///     expect(input, hasValue('Hello, World!'), reason: 'sanity check');
  ///
  ///     // Use `UserEvent.clear` to simulate a user deleting the contents of the input.
  ///     UserEvent.clear(input);
  ///
  ///     // Use the `hasValue` matcher to verify the value of the input.
  ///     expect(input, hasValue(''));
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
  /// {@category UserActions}
  static void clear(Element element) => eventHandlerErrorCatcher(() => getProperty(_userEvent, 'clear')(element));

  /// Selects the specified [values] of [selectElement].
  ///
  /// [values] can either be a list of values or [OptionElement]s.
  ///
  /// > Related: [UserEvent.deselectOptions]
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values>
  ///
  /// ## Options
  ///
  /// ### [clickInit]
  ///
  /// Use [clickInit] to initialize the click events that occur as a part of the selection.
  ///
  /// ### [skipPointerEventsCheck]
  ///
  /// Attempting to interact with an element that has `'pointer-events: none'`
  /// set will throw an error. Use [skipPointerEventsCheck] to prevent that error
  /// from being thrown by skipping the check of whether any element in the
  /// DOM-tree has `'pointer-events: none'` set. In addition, the underlying
  /// check for pointer events is costly in general and very costly when rendering
  /// large DOM-trees. Can be used to speed up tests.
  ///
  /// ## Example
  ///
  /// ```html
  /// <select multiple>
  ///   <option value="topping1">Cheese</option>
  ///   <option value="topping2">Pineapple</option>
  ///   <option value="topping3">Olives</option>
  ///   <option value="topping4">Pepperoni</option>
  ///   <option value="topping5">Bacon</option>
  /// </select>
  /// ```
  ///
  /// ```dart
  /// import 'dart:html';
  ///
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show hasValue;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.select(
  ///       {'multiple': true},
  ///       [
  ///         react.option({'value': 'topping1'}, 'Cheese'),
  ///         react.option({'value': 'topping2'}, 'Pineapple'),
  ///         react.option({'value': 'topping3'}, 'Olives'),
  ///         react.option({'value': 'topping4'}, 'Pepperoni'),
  ///         react.option({'value': 'topping5'}, 'Bacon'),
  ///       ],
  ///     ));
  ///
  ///     // Use react_testing_library queries to store references to the nodes.
  ///     final select = view.getByRole('listbox') as SelectElement;
  ///
  ///     // Use `UserEvent.selectOptions` to simulate a user selecting options from a list.
  ///     UserEvent.selectOptions(select, ['topping1']);
  ///     UserEvent.selectOptions(select, [view.getByText('Olives'), view.getByText('Bacon')]);
  ///
  ///     // Use the `hasValue` matcher to verify the value of the select.
  ///     expect(select, hasValue(['topping1', 'topping3', 'topping5']));
  ///     expect(select, isNot(hasValue(['topping2', 'topping4'])));
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
  /// {@category UserActions}
  static void selectOptions(
    SelectElement selectElement,
    List<dynamic> values, {
    Map? clickInit,
    bool skipPointerEventsCheck = false,
  }) {
    final options = {
      'skipPointerEventsCheck': skipPointerEventsCheck,
    };

    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'selectOptions')(
        selectElement,
        values,
        _jsifyEventData(clickInit),
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Removes the selection for the specified [values] of [selectElement].
  ///
  /// [selectElement] must have the `multiple` attribute set to `true`.
  ///
  /// [values] can either be a list of values or [OptionElement]s.
  ///
  /// > Related: [UserEvent.selectOptions]
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#deselectoptionselement-values>
  ///
  /// ## Options
  ///
  /// ### [clickInit]
  ///
  /// Use [clickInit] to initialize the click events that occur as a part of the selection.
  ///
  /// ### [skipPointerEventsCheck]
  ///
  /// Attempting to interact with an element that has `'pointer-events: none'`
  /// set will throw an error. Use [skipPointerEventsCheck] to prevent that error
  /// from being thrown by skipping the check of whether any element in the
  /// DOM-tree has `'pointer-events: none'` set. In addition, the underlying
  /// check for pointer events is costly in general and very costly when rendering
  /// large DOM-trees. Can be used to speed up tests.
  ///
  /// ## Example:
  ///
  /// ```html
  /// <select multiple>
  ///   <option value="topping1" selected>Cheese</option>
  ///   <option value="topping2" selected>Pineapple</option>
  ///   <option value="topping3">Olives</option>
  ///   <option value="topping4">Pepperoni</option>
  ///   <option value="topping5" selected>Bacon</option>
  /// </select>
  /// ```
  ///
  /// ```dart
  /// import 'dart:html';
  ///
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show hasValue;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.select(
  ///       {'multiple': true},
  ///       [
  ///         react.option({'value': 'topping1', 'selected': true}, 'Cheese'),
  ///         react.option({'value': 'topping2', 'selected': true}, 'Pineapple'),
  ///         react.option({'value': 'topping3'}, 'Olives'),
  ///         react.option({'value': 'topping4'}, 'Ham'),
  ///         react.option({'value': 'topping5', 'selected': true}, 'Bacon'),
  ///       ],
  ///     ));
  ///
  ///     // Use react_testing_library queries to store references to the nodes.
  ///     final select = view.getByRole('listbox') as SelectElement;
  ///
  ///     // Use `UserEvent.deselectOptions` to simulate a user deselecting options from a list.
  ///     UserEvent.deselectOptions(select, ['topping5']);
  ///     UserEvent.deselectOptions(select, [view.getByText('Pineapple')]);
  ///
  ///     // Use the `hasValue` matcher to verify the value of the select.
  ///     expect(select, hasValue(['topping1']));
  ///     expect(select, isNot(hasValue(['topping2', 'topping3', 'topping4', 'topping5'])));
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
  /// {@category UserActions}
  static void deselectOptions(
    SelectElement selectElement,
    List values, {
    Map? clickInit,
    bool skipPointerEventsCheck = false,
  }) {
    final options = {
      'skipPointerEventsCheck': skipPointerEventsCheck,
    };

    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'deselectOptions')(
        selectElement,
        values,
        _jsifyEventData(clickInit),
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Fires a tab event changing the document.activeElement in the same way the browser does.
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#tabshift-focustrap>
  ///
  /// ## Options
  ///
  /// ### [shift]
  ///
  /// Default: `false`
  ///
  /// Set [shift] to `true` to invert the tab direction.
  ///
  /// ### [focusTrap]
  ///
  /// Default: [HtmlDocument.body]
  ///
  /// Set [focusTrap] to restrict the tabbing within a certain container.
  ///
  /// ## Example
  ///
  /// ```html
  /// <div>
  ///   <input />
  ///   <div data-test-id="container">
  ///     <input />
  ///     <input />
  ///   </div>
  /// </div>
  /// ```
  ///
  /// ```dart
  /// import 'dart:html';
  ///
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show isFocused;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.div({}, [
  ///       react.input({}),
  ///       react.div({
  ///         'data-test-id': 'container'
  ///       }, [
  ///         react.input({}),
  ///         react.input({}),
  ///       ]),
  ///     ]));
  ///
  ///     // Use react_testing_library queries to store references to the nodes.
  ///     final inputs = view.getAllByRole('textbox');
  ///     final container = view.getByTestId('container');
  ///
  ///     // Use `isFocused` matcher to verify the currently focused element.
  ///     expect(document.body, isFocused);
  ///
  ///     UserEvent.tab();
  ///     expect(inputs.first, isFocused);
  ///
  ///     UserEvent.tab();
  ///     expect(inputs[1], isFocused);
  ///
  ///     UserEvent.tab();
  ///     expect(inputs[2], isFocused);
  ///
  ///     UserEvent.tab();
  ///     expect(document.body, isFocused, reason: 'Cycle goes back to the body element.');
  ///
  ///     // Shifts the focus backwards.
  ///     UserEvent.tab(shift: true);
  ///     expect(inputs[2], isFocused);
  ///
  ///     // Cycles focus within the container.
  ///     UserEvent.tab(focusTrap: container);
  ///     expect(inputs[1], isFocused);
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
  /// {@category UserActions}
  static void tab({bool shift = false, Element? focusTrap}) {
    final options = {'shift': shift, 'focusTrap': focusTrap};
    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'tab')(
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Hovers over [element].
  ///
  /// > Related: [UserEvent.unhover]
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event/#hoverelement>
  ///
  /// ## Options
  ///
  /// ### [eventInit]
  ///
  /// Use [eventInit] to initialize the `onMouseOver` event.
  ///
  /// ### [skipPointerEventsCheck]
  ///
  /// Attempting to interact with an element that has `'pointer-events: none'`
  /// set will throw an error. Use [skipPointerEventsCheck] to prevent that error
  /// from being thrown by skipping the check of whether any element in the
  /// DOM-tree has `'pointer-events: none'` set. In addition, the underlying
  /// check for pointer events is costly in general and very costly when rendering
  /// large DOM-trees. Can be used to speed up tests.
  ///
  /// ## Example
  ///
  /// ```html
  /// <div>
  ///   <button>Hover over me!</button>
  /// </div>
  /// ```
  ///
  /// ```dart
  /// import 'package:react/hooks.dart';
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show isInTheDocument;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     final HoverButton = react.registerFunctionComponent((props) {
  ///       final isShown = useState(false);
  ///       return react.div({}, [
  ///         react.button({
  ///           'onMouseOver': (_) => isShown.set(true),
  ///           'onMouseOut': (_) => isShown.set(false)
  ///         }, [
  ///           'Hover over me!'
  ///         ]),
  ///         if (isShown.value) react.span({}, ['Hello!']) else null,
  ///       ]);
  ///     });
  ///
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(HoverButton({}));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final button = view.getByRole('button');
  ///     expect(view.queryByText('Hello!'), isNull, reason: 'sanity check');
  ///
  ///     // Use `UserEvent.hover` to simulate a user mousing over a button.
  ///     UserEvent.hover(button);
  ///
  ///     // Use `isInTheDocument` matcher to verify that the new element is present.
  ///     expect(view.getByText('Hello!'), isInTheDocument);
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
  /// {@category UserActions}
  static void hover(
    Element element, {
    Map? eventInit,
    bool skipPointerEventsCheck = false,
  }) {
    final options = {
      'skipPointerEventsCheck': skipPointerEventsCheck,
    };

    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'hover')(
        element,
        _jsifyEventData(eventInit),
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Unhovers out of [element].
  ///
  /// > Related: [UserEvent.hover]
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event#unhoverelement>
  ///
  /// ## Options
  ///
  /// ### [eventInit]
  ///
  /// Use [eventInit] to initialize the `onMouseOut` event.
  ///
  /// ### [skipPointerEventsCheck]
  ///
  /// Attempting to interact with an element that has `'pointer-events: none'`
  /// set will throw an error. Use [skipPointerEventsCheck] to prevent that error
  /// from being thrown by skipping the check of whether any element in the
  /// DOM-tree has `'pointer-events: none'` set. In addition, the underlying
  /// check for pointer events is costly in general and very costly when rendering
  /// large DOM-trees. Can be used to speed up tests.
  ///
  /// ## Example
  ///
  /// ```html
  /// <div>
  ///   <button>Hover over me!</button>
  /// </div>
  /// ```
  ///
  /// ```dart
  /// import 'package:react/hooks.dart';
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show isInTheDocument;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     final HoverButton = react.registerFunctionComponent((props) {
  ///       final isShown = useState(false);
  ///       return react.div({}, [
  ///         react.button({
  ///           'onMouseOver': (_) => isShown.set(true),
  ///           'onMouseOut': (_) => isShown.set(false)
  ///         }, [
  ///           'Hover over me!'
  ///         ]),
  ///         if (isShown.value) react.span({}, ['Hello!']) else null,
  ///       ]);
  ///     });
  ///
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(HoverButton({}));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final button = view.getByRole('button');
  ///     expect(view.queryByText('Hello!'), isNull, reason: 'sanity check');
  ///
  ///     // Use `UserEvent.hover` to simulate a user mousing over a button.
  ///     UserEvent.hover(button);
  ///
  ///     // Use `isInTheDocument` matcher to verify that the new element is present.
  ///     expect(view.getByText('Hello!'), isInTheDocument);
  ///
  ///     // Use `UserEvent.unhover` to simulate a user unhovering a button.
  ///     UserEvent.unhover(button);
  ///
  ///     // Verify that the new element is no longer present in the document.
  ///     expect(view.queryByText('Hello!'), isNull);
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
  /// {@category UserActions}
  static void unhover(Element element, {Map? eventInit, bool skipPointerEventsCheck = false}) {
    final options = {
      'skipPointerEventsCheck': skipPointerEventsCheck,
    };

    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'unhover')(
        element,
        _jsifyEventData(eventInit),
        jsifyAndAllowInterop(options),
      );
    });
  }

  /// Simulates pasting [text] into [element].
  ///
  /// > See: <https://testing-library.com/docs/ecosystem-user-event#pasteelement-text-eventinit-options>
  ///
  /// ## Options
  ///
  /// ### [eventInit]
  ///
  /// Use [eventInit] to initialize the clipboard event.
  ///
  /// ## With Selection Range
  ///
  /// If [element] already contains a value, [text] will be pasted at the end
  /// of the existing value by default. To override this behavior and set the
  /// selection range to something else, call [InputElement.setSelectionRange] before
  /// calling [paste].
  ///
  /// In order to set the initial selection range to zero, you must also set
  /// [initialSelectionStart] and [initialSelectionEnd] to zero along with
  /// calling `element.setSelectionRange(0, 0)`.
  ///
  /// ## Example
  ///
  /// ```html
  /// <input value="This is a bad example" />
  /// ```
  ///
  /// ```dart
  /// import 'dart:html';
  ///
  /// import 'package:react/react.dart' as react;
  /// import 'package:react_testing_library/matchers.dart' show hasValue;
  /// import 'package:react_testing_library/react_testing_library.dart' as rtl;
  /// import 'package:react_testing_library/user_event.dart';
  /// import 'package:test/test.dart';
  ///
  /// void main() {
  ///   test('', () {
  ///     // Render the DOM shown in the example snippet above.
  ///     final view = rtl.render(react.input({'defaultValue': 'This is a bad example'}));
  ///
  ///     // Use react_testing_library queries to store references to the node.
  ///     final input = view.getByRole('textbox') as InputElement;
  ///
  ///     input.setSelectionRange(10, 13);
  ///
  ///     // Use `UserEvent.paste` to simulate a user pasting text into an input.
  ///     UserEvent.paste(input, 'good');
  ///
  ///     // Use `hasValue` matcher to verify the value of the input.
  ///     expect(input, hasValue('This is a good example'));
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
  /// {@category UserActions}
  static void paste(
    Element element,
    String text, {
    Map? eventInit,
    int? initialSelectionStart,
    int? initialSelectionEnd,
  }) {
    final options = {
      if (initialSelectionStart != null) 'initialSelectionStart': initialSelectionStart,
      if (initialSelectionEnd != null) 'initialSelectionEnd': initialSelectionEnd,
    };
    eventHandlerErrorCatcher(() {
      getProperty(_userEvent, 'paste')(
        element,
        text,
        _jsifyEventData(eventInit),
        jsifyAndAllowInterop(options),
      );
    });
  }
}

@JS('rtl.userEvent')
external JsMap get _userEvent;

/// An opaque object returned from keyboard-related user event methods
/// that can be used to continue keyboard operations via the `keyboardState` argument.
@JS()
@anonymous
class KeyboardState {
  external factory KeyboardState._();
}

dynamic _jsifyEventData(Map? eventData) => jsifyAndAllowInterop(eventData ?? const {});

// Converts a JsMap FileList to a List<File>.
List<File> _unjsifyFileList(List<File>? fileList) {
  if (fileList is FileList) return fileList;

  final jsFileList = JsBackedMap.fromJs((fileList ?? []) as JsMap);
  final convertedFiles = <File>[];
  for (var i = 0; i < (jsFileList['length'] as int); i++) {
    final file = jsFileList['item'](i);
    if (file is File) {
      convertedFiles.add(file);
    }
  }
  return convertedFiles;
}

# Testing Components with Interactions

- **[Patterns Covered Here](#patterns-covered-here)**
- **[Event Simulation](#event-simulation)**
  - **[Migration Goal](#migration-goal)**
  - **[When Not to Use UserEvent](#when-not-to-use-userevent)**
  - **[Migrating DOM Event Calls](#migrating-dom-event-calls)**
  - **[Changing an Element's value](#changing-an-elements-value)**
- **[Direct API calls](#direct-api-calls)**
  - **[Calling Component Instance APIs](#calling-component-instance-apis)**
  - **[Triggering Callbacks via Props](#triggering-callbacks-via-props)**
  - **[Calling Component Lifecycle Methods](#calling-component-lifecycle-methods)**
  - **[Using APIs to get UI and Trigger an Event](#using-apis-to-get-ui-and-trigger-an-event)**
- **[Component State Changes](#component-state-changes)**
- **[Documentation References](#documentation-references)**

This migration guide covers the part of tests that verify a component behavior exists. This might be clicking a button and expecting the DOM to change, calling component APIs on a ref to trigger state changes, or setting the component state directly! For more information on what patterns are covered, check the [patterns list below](#patterns-covered-here).

This guide does not go into detail about React Testing Library (RTL) APIs themselves in terms of parameters or options. Instead, it focuses on common test patterns and what they look like using the RTL APIs. For more resources on how these interaction APIs work, see the [documentation section](#documentation-references).

## Patterns Covered Here

The most general categories for the patterns this guide will focus on migrating are:

- <u>Event Simulation</u>
  - react_test_utils.Simulate
  - `Element.click()`/`.focus()`/`.blur()`
  - Element.dispatchEvent
  - Changes via `Element.value`
- <u>Direct API calls</u>
  - Accessing component class methods
  - Using `.props` to trigger callbacks
  - Calling Component Lifecycle methods
  - Grabbing UI nodes to use as event targets
- <u>Component State Changes</u>
  - Calling `setState` on a component instance
  - Assigning state directly

## Event Simulation

### Migration Goal

The goal of event simulation migrations are to move the test to more closely resemble how a user will interact with your UI. The recommended way to do this is to use the `UserEvent` class because its methods simulate real-world sequences of different event types, as opposed to just dispatching a single event. `UserEvent`'s APIs are also descriptive to the user action that is being tested, as opposed to an event that is being triggered. For example, `UserEvent.hover` will emulate a user hovering a DOM node, triggering multiple mouse and pointer events. As a result, `UserEvent` may not have a one-to-one API for the events exposed in `Simulate`.

Below is a table of `UserEvent` APIs and events that each one triggers. It should be used as a general reference, but the lists of events are not exact to what you may see in a test\*.

Using this table, the line of thinking would be to determine what event a test is currently simulating and find a `UserEvent` API that triggers the desired event.

| RTL's UserEvent API                                                                                              | Events on Target\*                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [clear](https://workiva.github.io/react_testing_library/user_event/UserEvent/clear.html)                         | onMouseOver, onMouseEnter, onMouseMove, onMouseDown, onMouseUp, onClick, onKeyDown, onChange, onKeyUp                     |
| [click](https://workiva.github.io/react_testing_library/user_event/UserEvent/click.html)                         | onMouseOver, onMouseEnter, onMouseMove, onMouseDown, onMouseUp, onClick                                                   |
| [dblClick](https://workiva.github.io/react_testing_library/user_event/UserEvent/dblClick.html)                   | onMouseOver, onMouseEnter, onMouseMove, onMouseDown, onMouseUp, onClick, onMouseDown, onMouseUp, onClick                  |
| [deselectOptions](https://workiva.github.io/react_testing_library/user_event/UserEvent/deselectOptions.html)     | {onMouseOver, onMouseEnter, onMouseMove, onMouseDown, onMouseUp, onClick} repeated for each option                        |
| [hover](https://workiva.github.io/react_testing_library/user_event/UserEvent/hover.html)                         | onMouseOver, onMouseEnter, onMouseMove                                                                                    |
| [keyboard](https://workiva.github.io/react_testing_library/user_event/UserEvent/keyboard.html)                   | {onKeyDown, onChange, onKeyUp} repeated for every keystroke                                                               |
| [keyboardWithDelay](https://workiva.github.io/react_testing_library/user_event/UserEvent/keyboardWithDelay.html) | {onKeyDown, onChange, onKeyUp} repeated for every keystroke                                                               |
| [paste](https://workiva.github.io/react_testing_library/user_event/UserEvent/paste.html)                         | onFocus, onChange                                                                                                         |
| [selectOptions](https://workiva.github.io/react_testing_library/user_event/UserEvent/selectOptions.html)         | {onMouseOver, onMouseEnter, onMouseMove, onMouseDown, onMouseUp, onClick} repeated for each option                        |
| [tab](https://workiva.github.io/react_testing_library/user_event/UserEvent/tab.html)                             | onKeyDown, onBlur, onFocus, onKeyUp                                                                                       |
| [type](https://workiva.github.io/react_testing_library/user_event/UserEvent/type.html)                           | MouseEvents, ClickEvents, onFocus                                                                                         |
| [typeWithDelay](https://workiva.github.io/react_testing_library/user_event/UserEvent/typeWithDelay.html)         | onMouseOver, onMouseEnter, onMouseMove, onMouseDown, onFocus, onMouseUp, onClick, {onKeyDown, onChange, onKeyUp} repeated |
| [unhover](https://workiva.github.io/react_testing_library/user_event/UserEvent/unhover.html)                     | onMouseMove, onMouseLeave                                                                                                 |
| [upload](https://workiva.github.io/react_testing_library/user_event/UserEvent/upload.html)                       | onMouseOver, onMouseEnter, onMouseMove, onMouseDown, onFocus, onMouseUp, onClick, onBlur, onFocus, onChange               |

> \* This table does not show the _exact_ events that get triggered because
>
> 1. Some handlers trigger _a lot_ of events, so less utilized ones (such as pointer events) were excluded to keep the table parsable
> 1. There may be more or fewer events based on custom component and page logic

### When Not to Use `UserEvent`

There are not any concrete guidelines for when [fireEvent](https://workiva.github.io/react_testing_library/rtl.dom.events/fireEvent.html) should be used instead of `UserEvent`. When writing tests, `UserEvent` should be the default tool you reach for. From there, if the test requires a precise event to avoid conflicts or to gain access to a specific UI state, then `fireEvent` may be more appropriate. However, this should not be a common occurrence.

### Migrating DOM Event Calls

This section is the migration reference for tests using:

- react_test_utils.Simulate
- Element.event() (click, focus, blur)
- Element.dispatchEvent
- Calling component event handlers

In the case that the test is simply calling a basic event API to emulate an event, the migration should be simple. Below is an example of doing this migration.

Pre-existing test:

```dart
import 'package:over_react/over_react.dart';
import 'package:web_skin_dart/component2/text_input.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

main() {
  test('TextInputs call blur handler', () {
    var firstWasBlurred = false;
    var secondWasBlurred = false;

    final firstInputRef = createRef<TextInputComponent>();
    final secondInputRef = createRef<TextInputComponent>();

    render(Wrapper()(
      Dom.div()(
        (TextInput()
          ..ref = firstInputRef
          ..label = 'the second input'
          ..onBlur = (_) => firstWasBlurred = true
        )(),
        (TextInput()
          ..ref = secondInputRef
          ..label = 'the second input'
          ..onBlur = (_) => secondWasBlurred = true
        )(),
      ),
    ));

    final firstInput = findDomNode(firstInputRef.current.getInputDomNode()) as InputElement;
    firstInput.focus();
    blur(firstInput);

    final secondInput = findDomNode(secondInputRef.current.getInputDomNode()) as InputElement;
    secondInput.focus();
    blur(secondInput);

    expect(firstWasBlurred, isTrue);
    expect(secondWasBlurred, isTrue);
  });
}
```

With React Testing Library, that becomes:

```diff
-import 'package:over_react/over_react.dart';
 import 'package:web_skin_dart/component2/text_input.dart';
-import 'package:over_react_test/over_react_test.dart';
+import 'package:react_testing_library/react_testing_library.dart';
+import 'package:react_testing_library/user_event.dart';
 import 'package:test/test.dart';

 main() {
   test('TextInputs call blur handler', () {
     var firstWasBlurred = false;
     var secondWasBlurred = false;
-
-    final firstInputRef = createRef<TextInputComponent>();
-    final secondInputRef = createRef<TextInputComponent>();

     render(Wrapper()(
       Dom.div()(
         (TextInput()
-          ..ref = firstInputRef
           ..label = 'the second input'
           ..onBlur = (_) => firstWasBlurred = true
         )(),
         (TextInput()
-          ..ref = secondInputRef
           ..label = 'the second input'
           ..onBlur = (_) => secondWasBlurred = true
         )(),
       ),
     ));

     final firstInput = screen.getByLabelText('the first input');
     firstInput.focus();
-    blur(firstInput);
-
-    final secondInput = findDomNode(secondInputRef.current.getInputDomNode()) as InputElement;
-    secondInput.focus();
-    blur(secondInput);
+    UserEvent.tab();
+    UserEvent.tab();

     expect(firstWasBlurred, isTrue);
     expect(secondWasBlurred, isTrue);
  });
 }
```

Note that the query `findDomNode` also changed to `getByLabelText`, but was not highlighted because that change is explained more in the [querying migration guide](https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/queries.md).

In this example, the goal was to simulate a user navigating through a form and different inputs losing focus. In the original test, we were doing this by getting the input DOM node via a ref and query, and then manually calling `focus` and `blur`.

With RTL, it's a simpler test. Instead of difficult queries, the first input is grabbed and then all we need is the `tab` API! Not only does this test the same core behavior, but it's in a way that the user may actually interact with the page. The `tab` API has checks under the hood to navigate the page as the `tab` key would in a browser. Consequently, you'll also be able to see if there is unexpected behavior when tabbing between fields. However, perhaps the user really wouldn't tab through this form for whatever reason. We could use `click` API instead! Whatever makes the most sense. The goal is to use `UserEvent` to emulate what the anticipated user behavior is.

### Changing an Element's value

This section is the migration reference for:

- Changes via `Element.value`

Another common case is using the `value` property on an element to update the UI and trigger an `onChange` (or other) listener.

<details>
  <summary>Component Definition (click to expand)</summary>

```dart
import 'package:over_react/over_react.dart';
import 'package:web_skin_dart/component2/text_input.dart';

part 'component_definition.over_react.g.dart';

mixin WrappedInputProps on UiProps {}

UiFactory<WrappedInputProps> WrappedInput = uiForwardRef(
  (props, ref) {
    final inputValue = useState('');

    return (Dom.div()(
      (TextInput()
        ..label = 'the text input'
        ..ref = ref
        ..onChange = (e) {
          props.onChange(e);
          inputValue.set(e.target.value);
        }
      )(),
      (Dom.div()..addTestId('valueMirror'))(inputValue.value),
    ));
  },
  _$WrappedInputConfig, // ignore: undefined_identifier
);

```

</details>

The simple example shows a component that has an uncontrolled input and another element that is relying on the input's `onChange` function to keep it up to date. To test this with OverReact Test, we may have updated the `TextInput`'s value directly and then manually triggered a change, like so:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('verify input changes', () {
    var wasChanged = false;
    final ref = createRef<TextInputComponent>();

    final renderedInstance = render(Wrapper()(
      (WrappedInput()
        ..onChange = ((_) => wasChanged = true)
        ..ref = ref
      )(),
    ));

    final inputElement = ref.current.getInputDomNode();
    expect(inputElement.value, '');

    inputElement.value = 'a new value';
    change(inputElement, {'target': inputElement});

    expect(wasChanged, isTrue);

    final valueMirror = getByTestId(renderedInstance, 'valueMirror');
    final valueMirrorNode = findDomNode(valueMirror);

    expect(valueMirrorNode.innerHtml, 'a new value');
  });
}
```

Instead, using React Testing Library, we can grab the element and use `UserEvent` to imitate a user typing!

```dart
import 'package:over_react/over_react.dart';

import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('verify input changes', () {
    var wasChanged = false;

    render((WrappedInput()..onChange = ((_) => wasChanged = true))());

    final input = screen.getByLabelText<InputElement>('the text input');
    expect(input, hasValue(''));

    // This is the main change! Note that we're not even
    // explicitly triggering an `onChange` event. The
    // `type` API simulates a user typing into an input!
    UserEvent.type(input, 'a new value');
    expect(wasChanged, isTrue);

    expect(screen.getByText('a new value'), isInTheDocument);
  });
}
```

## Direct API calls

Tests that rely on direct API calls are those that utilize the component's object instance to trigger a behavior.

### Calling Component Instance APIs

This section is the migration reference for using a ref or component instance to access:

- prop callbacks (`componentRef.props.onChange`)
- class methods that update state (`componentRef.updateValue`)
- methods that update the UI directly (`.show`, `.toggle`, `.focus`, `.blur`, etc)

Another common pattern is using APIs on the component instance to change the values in order to verify the UI updates as expected. In general, the new approach here is to query for the UI element that should trigger the change and use the `UserEvent` API to trigger the correct event instead. Below is an example of tests demonstrating this.

<details>
  <summary>Component Definition (click to expand)</summary>

```dart
import 'dart:html';

import 'package:over_react/over_react.dart';

part 'component_definition.over_react.g.dart'; // ignore: uri_does_not_exist

UiFactory<FormParentProps> FormParent = castUiFactory(_$FormParent); // ignore: undefined_identifier

mixin FormParentProps on UiProps {}

mixin FormParentState on UiState {
  int count;
}

class FormParentComponent extends UiStatefulComponent2<FormParentProps, FormParentState> {
  @override
  get initialState => (newState()..count = 0);

  incrementCount() {
    this.setState(newState()..count = state.count + 1);
  }

  @override
  render() {
    return (Dom.div()(
      (ControlledForm()
        ..count = state.count
        ..updateCount = incrementCount
      )(),
    ));
  }
}

mixin ControlledFormProps on UiProps {
  void Function() updateCount;
  int count;
}

UiFactory<ControlledFormProps> ControlledForm = uiFunction(
  (props) {
    return (Dom.div()(
      (Dom.button()..onClick = (_) => props.updateCount())('Update Count'),
      (Dom.div()..addTestId('count'))(props.count),
    ));
  },
  _$ControlledFormConfig, // ignore: undefined_identifier
);

```

</details>

This is a classic controlled component example where a parent's state and callbacks are used to update a child's UI. It's a common testing pattern to do something like access the parent's `incrementCount` method to check that the UI can be updated as expected when that API gets called. This is what that test looks like:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('the component can be incremented', () {
    final formParentRef = createRef<FormParentComponent>();

    final renderedInstance = render((FormParent()..ref = formParentRef)());
    final countDiv = getByTestId(renderedInstance, 'count');
    final countDivNode = findDomNode(countDiv);
    expect(countDivNode.innerHtml, '0');

    formParentRef.current.incrementCount();
    expect(countDivNode.innerHtml, '1');
  });
}
```

However, this testing strategy may not reflect the user behavior. Instead, we should use the button to check if the state updates correctly, like so:

```dart
import 'package:over_react/over_react.dart';

// Switch out the imports to use RTL
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('the component can be incremented', () {
    // Remove the ref
    render(FormParent()());

    final countDiv = screen.getByText('0');

    // This is the main change!
    //
    // Instead of using a ref, we're querying for the button directly and using
    // `UserEvent` to click it and trigger the state change
    final incrementButton = screen.getByRole('button', name: 'Update Count');
    UserEvent.click(incrementButton);

    // Verify the click changed the component state
    expect(countDiv, hasTextContent('1'));
  });
}
```

### Triggering Callbacks via Props

This section is the migration reference for tests that access props and:

- call raw event handlers (`onClick`, `onFocus`, etc)
- custom component callbacks

Tests sometimes use the `props` field on a component instance to trigger event callbacks that are set on that component.

<details>
  <summary>Component Definition (click to expand)</summary>

```dart
import 'package:over_react/over_react.dart';
import 'package:web_skin_dart/component2/all.dart';

part 'component_definition.over_react.g.dart';

mixin LoginProps on UiProps {}

UiFactory<LoginProps> Login = uiFunction(
  (_) {
    final username = useState('');
    final password = useState('');
    final error = useState<String>(null);
    final isAuthed = useState(false);

    bool _credentialsAreValid() {
      return username.value.isNotEmpty && password.value.isNotEmpty;
    }

    return ((Form()
      ..addTestId('form')
      ..onSubmit = (e) {
        e.preventDefault();
        error.set(null);

        if (_credentialsAreValid()) {
          isAuthed.set(true);
        } else {
          isAuthed.set(false);
          error.set('Uh oh, there was an error!');
        }
      }
    )(
      (TextInput()
        ..addTestId('username-field')
        ..label = 'Username'
        ..placeholder = 'Username'
        ..onChange = (e) {
          username.set(e.target.value);
        }
      )(),
      (TextInput()
        ..addTestId('password-field')
        ..label = 'Password'
        ..placeholder = 'Password'
        ..onChange = (e) {
          password.set(e.target.value);
        }
      )(),
      (Button()..type = ButtonType.SUBMIT)('Log In'),
      error.value != null ? (Dom.div()..addTestId('error-message'))(error.value) : null,
      isAuthed.value ? (Dom.div()..addTestId('success-message'))('Welcome!') : null,
    ));
  },
  _$LoginConfig, // ignore: undefined_identifier
);
```

</details>

This example is an extremely simplified login form that changes the UI based on what happens in the `onSubmit` callback. To verify that form behaves as expected, with OverReact Test we may have done something like:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('can submit a form', () {
    final renderedInstance = render(Wrapper()(
      Login()(),
    ));

    FormComponent form = getComponentByTestId(renderedInstance, 'form');
    form.props.onSubmit(createSyntheticFormEvent());

    expect(queryByTestId(renderedInstance, 'error-message')?.innerHtml, contains('Uh oh'));

    TextInputComponent username = getComponentByTestId(renderedInstance, 'username-field');
    TextInputComponent password = getComponentByTestId(renderedInstance, 'password-field');

    username.setValue('jonsnow');
    change(username.getInputDomNode());

    password.setValue('winteriscoming');
    change(password.getInputDomNode());

    form.props.onSubmit(createSyntheticFormEvent());
    expect(queryByTestId(renderedInstance, 'error-message'), isNull);
    expect(queryByTestId(renderedInstance, 'success-message'), isNotNull);
  });
}
```

This example differs from others in that we're getting the form instance with `getComponentByTestId` and then calling `form.props.onSubmit` to change the state of the form. On top of that though, we're using `TextInput` APIs to change the values of the input nodes and the `Simulate.change` API to get our `Login` form's state to update. We can simplify this with RTL APIs like so:

```dart
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

main() {
  test('can submit a form', () async {
    render(Login()());

    // Instead of worrying about the component's props, we can just
    // find the button and click it!
    final loginButton = screen.getByRole('button', name: 'Log In');
    UserEvent.click(loginButton);

    expect(screen.getByText('Uh oh', exact: false), isInTheDocument);

    // Instead of using a component's APIs to grab a node and simulate a
    // change, we can just search by label and use the `type` API!
    UserEvent.type(screen.getByLabelText('Username'), 'jonsnow');

    // Additionally, we can test that the user can just "tab" to the
    // password input by using the `tab` API instead of querying for
    // the input!
    UserEvent.tab();
    UserEvent.keyboard('winteriscoming');

    // Again, clicking the button instead of
    // calling `onSubmit` directly
    UserEvent.click(loginButton);

    expect(screen.queryByText('Uh oh', exact: false), isNot(isInTheDocument));
    expect(screen.getByText('Welcome!'), isInTheDocument);
  });
}
```

### Calling Component Lifecycle Methods

This section is the migration reference for tests that:

- call any component lifecycle event (`shouldComponentUpdate`, `componentWillUnmount`, `componentWillReceiveProps`, etc)

Similar to accessing component methods directly, tests should focus on the affect a process has on the UI rather than the expected output of a component lifecycle event.

<details>
  <summary>Component Definition (click to expand)</summary>

```dart
import 'package:over_react/over_react.dart';
import 'package:web_skin_dart/component2/button.dart';

part 'component_definition.over_react.g.dart';

UiFactory<LifecycleTestProps> LifecycleTest = castUiFactory(_$LifecycleTest); // ignore: undefined_identifier

mixin LifecycleTestProps on UiProps {}

mixin LifecycleTestState on UiState {
  int count;
}

class LifecycleTestComponent extends UiStatefulComponent2<LifecycleTestProps, LifecycleTestState> {
  @override
  Map get initialState => newState()..count = 0;

  @override
  bool shouldComponentUpdate(_, Map nextState) {
    final tNextState = typedStateFactory(nextState);
    if (tNextState.count % 3 != 0) return false;

    return true;
  }

  @override
  render() {
    return (Dom.div()(
      (Dom.div()..addTestId('count-text'))('The count is ${state.count}'),
      (Button()
        ..addTestId('counter-button')
        ..onClick = (e) => setState(newState()..count = state.count + 1)
      )('Update Count'),
    ));
  }
}
```

</details>

In the example, the component's UI is dependent upon the outcome of `shouldComponentUpdate`. Since we can just access the method on the component, we could test how the method behaves like so:

```dart
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('verify input changes', () {
    final renderedInstance = render(LifecycleTest()());

    LifecycleTestComponent component = getDartComponent(renderedInstance);
    expect(component.shouldComponentUpdate({}, {'LifecycleTestState.count': 1}), isFalse);
    expect(component.shouldComponentUpdate({}, {'LifecycleTestState.count': 11}), isFalse);
    expect(component.shouldComponentUpdate({}, {'LifecycleTestState.count': 12}), isTrue);
  });
}
```

However, with RTL, we could do something like:

```dart
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('verify input changes', () {
    render(LifecycleTest()());

    final button = screen.getByRole('button', name: 'Update Count');
    final count = screen.queryByText('The count is', exact: false);
    expect(count, hasTextContent(endsWith(' 0')));

    // Instead of calling the component instance,
    // simulate the user behavior
    UserEvent.click(button);
    expect(count, hasTextContent(endsWith('0')));

    // Rather than programmatically setting
    // the state, simulate the user interaction
    // that would create the UI
    for (var i = 1; i <= 4; i++) {
      UserEvent.click(button);
    }

    expect(count, hasTextContent(endsWith('3')));
  });
}
```

### Using APIs to get UI and trigger an event

This section is the migration reference for tests that call methods to grab UI, such as (but not limited to):

- `getInputDomNode`
- `getHitareaDOMNode`

These APIs are related to how to query for elements ([see that migration guide here](https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/queries.md)), but the fix may involve using events to show new elements. An example of that is below!

<details>
  <summary>Component Definition</summary>

```dart
import 'package:over_react/over_react.dart';
import 'package:web_skin_dart/component2/all.dart';

part 'component_definition.over_react.g.dart';

mixin WrappedMenuProps on UiProps {
  void Function(dynamic event) handleClick;
}

UiFactory<WrappedMenuProps> WrappedMenu = uiForwardRef(
  (props, ref) {
    return (Dom.div()(
      (DropdownButton()
        ..displayText = 'Open Menu'
        ..addTestId('button')
      )(
        DropdownMenu()(
          MenuItem()('First Menu Item'),
          (SubMenu()..menuItem = MenuItem())(
            DropdownMenu()(
              MenuItem()('First Menu Item'),
              (SubMenu()..menuItem = MenuItem())(
                DropdownMenu()(
                  MenuItem()('First Menu Item'),
                  (SubMenu()..menuItem = MenuItem())(
                    (MenuItem()
                      ..ref = ref
                      ..onClick = props.handleClick
                    )('First Menu Item'),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ));
  },
  _$WrappedMenuConfig, // ignore: undefined_identifier
);
```

</details>

In the example, there is a dropdown button with menu items. A ref is forwarded to a particular menu item. The pre-existing test could be:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('click menu item', () {
    final ref = createRef<MenuItemComponent>();
    var wasClicked = false;
    final renderedInstance = render(Wrapper()(
      (WrappedMenu()
        ..ref = ref
        ..handleClick = (_) {
          wasClicked = true;
        }
      )(),
    ));

    click(queryByTestId(renderedInstance, 'button'));
    click(ref.current.getHitareaDOMNode());
    expect(wasClicked, isTrue);
  });
}
```

However, we want to avoid using refs to trigger events in tests meant to verify UI works a certain way due to user interaction. Instead, we could do:

```dart
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

main() {
  test('click menu item', () async {
    var wasClicked = false;
    render(
      (WrappedMenu()
        ..handleClick = (_) {
          wasClicked = true;
        }
      )(),
    );

    UserEvent.click(screen.getByRole('button', name: 'Open Menu'));
    UserEvent.click(await screen.findByText('First Menu Item'));

    expect(wasClicked, isTrue);
  });
}
```

## Component State Changes

This section is the migration reference for tests that update state directly, such as:

- Calling `setState` on a component instance
- Setting state equal to a new value directly

<details>
  <summary>Component Definition (click to expand)</summary>

```dart
UiFactory<CustomDropdownProps> CustomDropdown = castUiFactory(_$CustomDropdown); // ignore: undefined_identifier

mixin CustomDropdownProps on UiProps {}

mixin CustomDropdownState on UiState {
  String selectedItem;
}

class CustomDropdownComponent extends UiStatefulComponent2<CustomDropdownProps, CustomDropdownState> {
  @override
  render() {
    return (Dom.div()(
      (DropdownButton()
        ..displayText = 'Open Menu'
        ..addTestId('button')
      )(
        DropdownMenu()(
          (MenuItem()
            ..onClick = (_) {
              setState(newState()..selectedItem = 'first');
            }
          )('First Menu Item'),
          (MenuItem()
            ..onClick = (_) {
              setState(newState()..selectedItem = 'second');
            }
          )('Second Menu Item'),
          (MenuItem()
            ..onClick = (_) {
              setState(newState()..selectedItem = 'third');
            }
          )('Third Menu Item'),
          (MenuItem()
            ..onClick = (_) {
              setState(newState()..selectedItem = 'fourth');
            }
          )('Fourth Menu Item'),
        ),
      ),
      _renderSubContent(),
    ));
  }

  ReactElement _renderSubContent() {
    switch (state.selectedItem ?? '') {
      case 'first':
        return (Dom.div()..addTestId('first'))(
          'This is the first menu item UI!',
        );
      case 'second':
        return (Dom.div()..addTestId('second'))(
          'This is the second menu item UI!',
        );
      default:
        return (Dom.div()..addTestId('default'))(
          'This is the default menu item UI',
        );
    }
  }
}
```

</details>

The example component uses state to decide what subcontent to render, and in order to change that content, the user needs to utilize a dropdown button. A common pattern is to skip the interaction with the button, and just set the state directly instead like so:

```dart
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('View changes with state', () {
    final renderedInstance = render(CustomDropdown()());
    expect(getByTestId(renderedInstance, 'second'), isNull);
    expect(getByTestId(renderedInstance, 'default'), isNotNull);

    CustomDropdownComponent component = getDartComponent(renderedInstance);
    component.setState(component.typedStateFactory({'CustomDropdownState.selectedItem': 'second'}));


    expect(getByTestId(renderedInstance, 'second'), isNotNull);
    expect(getByTestId(renderedInstance, 'default'), isNull);
  });
}
```

However, RTL encourages tests to mirror user behavior. We want to change the test to use `UserEvent` to navigate the UI and cause the state to change.

```dart
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('View changes with state', () {
    render(CustomDropdown()());
    expect(screen.queryByText('second menu item UI', exact: false), isNull);
    expect(screen.queryByText('default menu item UI', exact: false), isNotNull);

    // Instead of setting the state, interact with the UI instead!
    UserEvent.click(screen.getByRole('button', name: 'Open Menu'));
    UserEvent.click(screen.getByText('Second Menu Item'));

    expect(screen.queryByText('second menu item UI', exact: false), isNotNull);
    expect(screen.queryByText('default menu item UI', exact: false), isNull);
  });
}
```

Note that the RTL test also changed how we asserted that the click events caused a change, but that's covered more in the Expectations migration guide!

## Documentation References

The examples here were intended to be declarative enough that underlying knowledge of RTL wasn't necessary, but throughout the migration it would be beneficial to have the context. Below are documents related to the APIs needed for migrating.

Both Dart and JS docs are referenced underneath the specific APIs. The Dart version should be the source of truth for usage, as even though an attempt was made to match the JS API's 1 to 1, there are some differences. The Dart docs often link to the JS docs for supplemental information, which is why they are also referenced here.

- [User Actions Philosophy]
- UserEvent APIs
  - [Dart UserEvent]
  - [JS UserEvent]
- fireEvent
  - [Dart fireEvent]
  - [JS fireEvent]

[user actions philosophy]: https://workiva.github.io/react_testing_library/topics/UserActions-topic.html
[dart userevent]: https://workiva.github.io/react_testing_library/user_event/UserEvent-class.html
[dart fireevent]: https://workiva.github.io/react_testing_library/rtl.dom.events/fireEvent.html
[js userevent]: https://testing-library.com/docs/ecosystem-user-event
[js fireevent]: https://testing-library.com/docs/dom-testing-library/api-events

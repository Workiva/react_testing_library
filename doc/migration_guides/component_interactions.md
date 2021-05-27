TODO add ToC

# Testing Components with Interactions

This guide talks about the part of tests that verify a behavior exists. This might be clicking a button and expecting the DOM to change, calling component APIs on a ref to trigger state changes, or setting the component state directly! For more information on what patterns are covered, check the [patterns list below](#what-patterns-does-this-cover) to see if it, or something close, is listed.

This guide does not go into detail about React Testing Library (RTL) APIs themselves and instead focuses on common test patterns and what that looks like using the RTL APIs. For more resources on how these interaction APIs work, see the references below.

> NOTE: this guide defaults to using the `UserEvent` API because most of the time, that should work. However, in more complex environments, it may be necessary to use the `fireEvent` API instead.

## References

For a high level understanding, examples here should be declarative enough that knowledge of the RTL APIs being used isn't required. That being said, understanding the philosophy and the options would be beneficial. Below is a list of documentation that is relevant to this aspect of the migration.

Both Dart and JS docs are referenced underneath the specific APIs. The Dart version should be the source of truth for usage, as even though an attempt was made to match the JS API's 1 to 1, there are some differences. However, the Dart APIs often link to the JS docs for supplemental information and context.

- [User Actions Philosophy]
- UserEvent APIs
  - [Dart UserEvent]
  - [JS UserEvent]
- fireEvent
  - [Dart fireEvent]
  - [JS fireEvent]

## What Patterns Does This Cover?

The most general categories for the patterns this guide will focus on migrating are:

- <u>Event Simulation</u>
  - react_test_utils.Simulate
  - Element.event() (click, focus, blur)
  - `dispatchEvent`
  - Changes via `Element.value`
- <u>Using Class APIs</u>
  - Accessing component class methods
  - Calling Component Lifecyle methods
  - Getting UI to trigger an event on
- <u>Component State Changes</u>
  - Calling `setState` on a component instance
  - Assigning state directly

Besides those general categories, there are special cases that are related to interactions but are a broader pattern. These are:

- Async events
- Verifying Event Order
- Meta keys

Those will be covered in individual sections after the general categories are covered.

## Event Simulation

The event simulation category is around migrating away from the pre-existing ways of imitating user interaction via the event simulation methods.

### Triggering DOM events

This section is the migragation reference for tests using:

- react_test_utils.Simulate
- Element.event() (click, focus, blur)
- `dispatchEvent`

In Dart, there are a few ways to generate browser events (some more real than others) in tests. In the case that your test is just calling one of these APIs to target an element with an event, the switch should be simple. Here is a test written with the traditional APIs:

```dart
import 'package:web_skin_dart/component2/button.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

main() {
  test('button handles onClick', () {
    var hasBeenClicked = false;

    final container = render((Button()
      ..onClick = (event) => hasBeenClicked = true)());
    final button = getByTestId(container, 'wsd.hitarea');

    click(button);
    expect(hasBeenClicked, isTrue);
  });
}
```

With React Testing Library, that becomes:

```diff
import 'package:web_skin_dart/component2/button.dart';
- import 'package:over_react_test/over_react_test.dart';
+ import 'package:react_testing_library/react_testing_library.dart';
+ import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

main() {
  test('button handles onClick', () {
    var hasBeenClicked = false;

    final container = render((Button()
      ..onClick = (event) => hasBeenClicked = true)());
    final button = getByRole(container.container, 'button');

-     click(button);
+     UserEvent.click(button);
    expect(hasBeenClicked, isTrue);
  });
}
```

Note that the query `getByTestId` also changed to `getByRole`, but was not highlighted because that change is explained more in the [querying conversion guide](TODO add link here). Otherwise, all we needed to do was switch out the imports and use a different API for click!

### Changing an Element's value

This section is the migragation reference for:

- Changes via `Element.value`

Another common case is using the `value` property on an element to update the UI and trigger an `onChange` (or other) listener.

<details>
  <summary>Component Definition</summary>

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

The simple example shows a component that has an unconctrolled input and another element that is relying on on the input's `onChange` function to keep it up to date. To test this, we could update the `TextInput`'s value directly and then manually trigger a change, like so:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

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
```

Instead, using React Testing Library, we can grab the element and use `UserEvent` to immitate a user typing!

```dart
import 'package:over_react/over_react.dart';

import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

test('closes when the document it clickeds', () {
  var wasChanged = false;
  // Note that the `Wrapper` component could be removed!
  final renderedInstance = render(
    (WrappedInput()..onChange = ((_) => wasChanged = true))(),
  );

  final input = getByRole(renderedInstance.container, 'textbox') as InputElement;
  expect(input.value, '');

  // This is the main change! Note that we're not even
  // explicitly triggering an `onChange` event. The
  // `type` API simulates a user typing into an input!
  UserEvent.type(input, 'a new value');
  expect(wasChanged, isTrue);

  final mirror = getByText(renderedInstance.container, 'a new value');
  expect(mirror, isNotNull);
  expect(mirror, isA<DivElement>());
});
```

## Direct API calls

Tests that rely on direct API calls are those that utilities the component's object instance to trigger a behavior.

### Using a Ref to call component APIs

This section is the migragation reference for using a ref or component instance to access:

- prop callbacks (`componentRef.props.onChange`)
- class methods that update state (`componentRef.updateValue`)
- methods that update the UI directly (`.show`, `.toggle`, `.focus`, `.blur`, etc)

Another common pattern is using APIs on the instance (whether it is a component Ref or an Element) to change the values in order to verify the UI updates as expected. In general, the new approach here is to query for the UI element that should trigger the change and use the `UserEvent` API to trigger the correct event instead. Below is an example of tests demonstrating this.

<details>
  <summary>Component Definition</summary>

TODO format / comment / rename this

```dart
import 'dart:html';

import 'package:over_react/over_react.dart';

part 'component_definition.over_react.g.dart'; // ignore: uri_does_not_exist

UiFactory<CallbackComponentProps> Callback = castUiFactory(_$Callback); // ignore: undefined_identifier

mixin CallbackComponentProps on UiProps {}

mixin CallbackComponentState on UiState {
int count;
}

class CallbackComponent extends UiStatefulComponent2<CallbackComponentProps, CallbackComponentState> {
@override
get initialState => (newState()..count = 0);

incrementCount() {
this.setState(newState()..count = state.count + 1);
}

@override
render() {
return (Dom.div()(
(ControlledForm()
..count=state.count
..updateCount = incrementCount
)(),
));
}
}

mixin ControlledFormProps on UiProps {
void Function() updateCount;
int count;
}

UiFactory<ControlledFormProps> ControlledForm = uiFunction((props) {
return (
Dom.div()(
(Dom.button()..onClick = (_) => props.updateCount())('Update Count'),
(Dom.div()..addTestId('count'))(props.count),
)
);
},
_$ControlledFormConfig, // ignore: undefined_identifier
);

```

</details>
This is a classic controlled component example where a parent's state and callbacks are used to update a child's UI. It's a common testing pattern to access the parent's `incrementCount` method to check that the UI can be updated as expected when that API gets called. This is what that test looks like:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('the component can be incremented', () {
    final callbackRef = createRef<CallbackComponent>();

    final renderdInstance = render((Callback()..ref=callbackRef)());
    final countDiv = getByTestId(renderdInstance, 'count');
    final countDivNode = findDomNode(countDiv);
    expect(countDivNode.innerHtml, '0');

    callbackRef.current.incrementCount();
    expect(countDivNode.innerHtml, '1');
  });
}
```

However, this testing strategy may not reflect the user behavior. Instead, we should use the button to check if the state updates correctly, like so:

```dart
import 'package:over_react/over_react.dart';

// Switch out the imports to use RTL
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('the component can be incremented', () {
    // Remove the ref
    final renderdInstance = render(Callback()());

    final countDiv = queryByText(renderdInstance.container, '0');

    expect(countDiv, isNotNull);
    expect(countDiv, isA<DivElement>());

    // This is the main change!
    //
    // Instead of using a ref, we're quering for the button directly and using
    // `UserEvent` to click it and trigger the state change
    final incrementButton = queryByRole(renderdInstance.container, 'button');
    UserEvent.click(incrementButton);

    // Verify the click changed the component state
    expect(countDiv.innerHtml, '1');
  });
}
```

### Calling Component Lifecycle Methods

This section is the migragation reference for tests that:

- call any compopnent lifecycle event (`shouldComponentUpdate`, `componentWillUncomount`, `componentWillReceiveProps`, etc)

Similar to accessing component methods directly, tests should focus on the affect a process has on the UI rather than the expected output of a component lifecycle event.

<details>
  <summary>Component Definition</summary>

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
      )(),
    ));
  }
}
```

</details>
In the example, the component's UI is dependendent upon the outcome of `shouldComponentUpdate`. Since we can just access the method on the component, we could test how the method behaves like so:

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

However, with RTL, we would do:

```dart
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
  test('verify input changes', () {
    final renderedInstance = rtl.render(LifecycleTest()());

    final button = rtl.queryByRole(renderedInstance.container, 'button');
    final count = rtl.queryByText(renderedInstance.container, RegExp('The count is'));
    expect(count.innerHtml, contains('0'));

    // Instead of calling the component instance,
    // simulate the user behavior
    ue.UserEvent.click(button);
    expect(count.innerHtml, contains('0'));

    // Rather than programatically setting
    // the state, simulate the user interaction
    // that would create the UI
    for (var i = 1; i <= 4; i++) {
      ue.UserEvent.click(button);
    }

    expect(count.innerHtml, contains('3'));
  });
}
```

### Using APIs to get UI and trigger an event

This section is the migragation reference for tests that call methods to grab UI, such as (but not limited to):

- `getInputDomNode`
- `getHitareaDOMNode`

These APIs are related to how to query for elements ([see that migration guide here](TODO add migration guide)), but are often
tightly coupled with triggering events. Consequently, there is an example of how to migrate these APIs below:

## Component State Changes

This section is the migragation reference for tests that update state directly, such as:

- Calling `setState` on a component instance
- Setting state equal to a new value directly

TODO EXAMPLE add example of setting state directly

## Special Cases

This section is the migragation reference for tests that have more complex interaction requirements, such as:

- Listening for async events
- Verifying event order
- Interactions with meta keys

### Listening for Async Events

Tests that listen for async events are close to the same:

TODO EXAMPLE listening for async events

### Verifying Event Order

TODO EXAMPLE verifying event order

### Using Meta Keys

TODO EXAMPLE meta keys

[user actions philosophy]: https://workiva.github.io/react_testing_library/topics/UserActions-topic.html
[dart userevent]: https://workiva.github.io/react_testing_library/user_event/UserEvent-class.html
[dart fireevent]: https://workiva.github.io/react_testing_library/rtl.dom.events/fireEvent.html
[js userevent]: https://testing-library.com/docs/ecosystem-user-event
[js fireevent]: https://testing-library.com/docs/dom-testing-library/api-events

TODO add ToC

## Testing Components with Interactions

This guide talks about the part of tests that verify a behavior exists. This might be clicking a button and expecting the DOM to change, calling component APIs on a ref to trigger state changes, or setting the component state directly! For more information on what patterns are covered, check the [patterns list below](what-patterns-does-this-cover) to see if it, or something close, is listed.

This guide does not go into detail about React Testing Library (RTL) APIs themselves and instead focuses on common test patterns and what that looks like using the RTL APIs. For more resources on how these interaction APIs work, see the references below.

> NOTE: this guide defaults to using the `UserEvent` API because most of the time, that should work. However, in more complex environments, it may be necessary to use the `fireEvent` API instead.

### References

The examples here should be declarative enough that knowledge of the RTL APIs being used isn't required. That being said, understanding the philosophy and the options would be beneficial. Below is a list of documentation that is relevant to this aspect of the migration.

Both Dart and JS docs are referenced below the specific APIs. The Dart version should be the source of truth for usage, as even though an attempt was made to match the JS API's 1 to 1, there are some differences. However, the Dart APIs often link to the JS docs for supplemental information and context.

- [User Actions Philosophy]
- UserEvent APIs
  - [Dart UserEvent]
  - [JS UserEvent]
- fireEvent
  - [Dart fireEvent]
  - [JS fireEvent]

### What Patterns Does This Cover?

The most general categories for the patterns this guide will focus on migrating are:

- <u>Event Simulation</u>
  - react_test_utils.Simulate
  - Element.event() (click, focus, blur)
  - `dispatchEvent`
  - Direct method calls
  - Changes via `Element.value`
- <u>Using Class APIs</u>
  - Using a Ref to call component APIs
  - Grabbing and calling component class methods
  - Calling Component Lifecyle methods
- <u>Component State Changes</u>
  - Calling `setState` on a component instance
  - Assigning state directly

Besides those broader categories, there are special cases that are related to interactions but are a broader pattern. These are:

- Async events
- Verifying Event Order
- Meta keys

### Event Simulation

The event simulation category is around migrating away from the pre-existing ways of imitating user interaction via the event simulation methods.

#### Triggering DOM events

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

Sometimes, those events are applied on the window or document instead.

TODO create example of the window being clicked

#### Direct Method Calls

This section is the migragation reference for:

- Direct method calls
- Changes via `Element.value`

Another common pattern is using APIs on the instance (whether it is a component Ref or an Element) to change the values in order to verify the UI updates as expected. In general, the approach here is to query for the UI element that is being programmatically changed, and use the `UserEvent` API to trigger the correct event instead. Below is an example of tests that are testing the components declared in the collapseable region.

<details>
  <summary>Component Declaration</summary>

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

<br/> This is a classic controlled component example where a parent's state and callbacks are used to update a child's UI. It's a common testing pattern to access the parent's `incrementCount` method to check that the UI can be updated as expected when that API gets called. This is what that test looks like:

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

However, this testing strategy does not reflect the user behavior. Instead, we should use the button to check if the state updates correctly, like so:

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

As this test was mostly re-written, a diff did not emphesaize the most signficant change. Most of the changes were how the component were queried ([migration guide for queries](TODO add a link here)). However, for the purposes of this migration guide, the most important change was that we queried for the button and clicked it. Instead of relying on a component's implementation, we verified the UI itself worked as expected.

[user actions philosophy]: https://workiva.github.io/react_testing_library/topics/UserActions-topic.html
[dart userevent]: https://workiva.github.io/react_testing_library/user_event/UserEvent-class.html#static-methods
[dart fireevent]: https://workiva.github.io/react_testing_library/rtl.dom.events/fireEvent.html
[js userevent]: https://testing-library.com/docs/ecosystem-user-event
[js fireevent]: https://testing-library.com/docs/dom-testing-library/api-events

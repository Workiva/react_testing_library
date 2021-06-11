# Migrating Test Expectations

The guide is focused on what matchers React Testing Library (RTL) exposes and how to use them to convert common expectation patterns to those new matchers. Before beginning this migragation guide, but sure you have read the [philosophy][entrypoint-philosophy] of RTL. Not all tests can migrate expectations without extra forethought, and the migration guide's entrypoint describes when that is the case.

The matchers and examples here are focused on inspecting the DOM, which means some tests may not need to have their `expect` statements migrated. Here are some examples that may be good to go:

- Testing callbacks
- Checking that network requests are made
- Ensuring a store can be updated

Before moving on though, it's crucial to recall the philosophy of [use case testing][entrypoint-use-cases] and ensure that an application user does not see the effects of the use case being tested. If they do, even if the test did not originally verify this, migrating the test will mean adding that validation.

For example, let's imagine a component that is connected to a store. The store has two values:

- `inputValue`
- `hasSubmitted`

This component will update both values, but only actually updates its own UI when `inputValue` changes. A test that originally only checked that `hasSubmitted` can be updated may not need to have its expectation migrated because in isolation, the DOM didn't change. On the flip side, we can't just check the store to see if `inputValue` changed because the DOM _should have_ updated.

Most patterns are similar. Some network requests will not impact the UI while many will. Callbacks can expose data outside a component, but they can also impact the existing UI when they are fired. Whenever an update should make it to the DOM, these matchers and migration steps are relevant!

## What this Guide Covers

- Queries as an Expectation
- Migrating Props and State Assertions
  - Asserting Props or State are Set as Expected
  - Verifying Styles are Set
- Checking Form Input Nodes
- Migrating Children Assertions
- Async Assertions

## New Matchers

RTL exposes a new set of matchers that can be used for asserting conditions on DOM nodes. The main documentation entrypoint for these matchers can be found [here][matcher-docs].

### Constants

- [isChecked](https://workiva.github.io/react_testing_library/matchers/isChecked-constant.html)
- [isDisabled](https://workiva.github.io/react_testing_library/matchers/isDisabled-constant.html)
- [isEmptyDomElement](https://workiva.github.io/react_testing_library/matchers/isEmptyDomElement-constant.html)
- [isEnabled](https://workiva.github.io/react_testing_library/matchers/isEnabled-constant.html)
- [isFocused](https://workiva.github.io/react_testing_library/matchers/isFocused-constant.html)
- [isInTheDocument](https://workiva.github.io/react_testing_library/matchers/isInTheDocument-constant.html)
- [isPartiallyChecked](https://workiva.github.io/react_testing_library/matchers/isPartiallyChecked-constant.html)

### Functions

- [containsElement](https://workiva.github.io/react_testing_library/matchers/containsElement.html)
- [excludesClasses](https://workiva.github.io/react_testing_library/matchers/excludesClasses.html)
- [hasAttribute](https://workiva.github.io/react_testing_library/matchers/hasAttribute.html)
- [hasClasses](https://workiva.github.io/react_testing_library/matchers/hasClasses.html)
- [hasDescription](https://workiva.github.io/react_testing_library/matchers/hasDescription.html)
- [hasDisplayValue](https://workiva.github.io/react_testing_library/matchers/hasDisplayValue.html)
- [hasExactClasses](https://workiva.github.io/react_testing_library/matchers/hasExactClasses.html)
- [hasFormValues](https://workiva.github.io/react_testing_library/matchers/hasFormValues.html)
- [hasStyles](https://workiva.github.io/react_testing_library/matchers/hasStyles.html)
- [hasTextContent](https://workiva.github.io/react_testing_library/matchers/hasTextContent.html)
- [hasValue](https://workiva.github.io/react_testing_library/matchers/hasValue.html)

## Queries as an Expectation

You may have already worked through the [querying migration guide][querying-guide]. If so, you're familiar with the three different query categories:

- `getBy`
- `queryBy`
- `findBy`

and that `getBy` APIs will fail the test while others will just return `null` if the query fails.

Because `getBy` will actually fail the test instead of returning nothing, those queries can be used as expectations all on their own. Below is an example differentiating how this would have worked in OverReact Test with how it works in RTL.

<details>

  <summary>Component Definition (click to expand)</summary>

```dart
import 'package:over_react/over_react.dart';
import 'package:web_skin_dart/component2/all.dart';

part 'component_definition.over_react.g.dart';

mixin SubmitButtonProps on UiProps {}

UiFactory<SubmitButtonProps> SubmitButton = uiFunction(
  (props) {
    final hasSubmitted = useState(false);
    final hasClickedPreSubmit = useState(false);

    return (Fragment()(
      (Button()
        ..addTestId('pre-submit-button')
        ..onClick = (_) => hasSubmitted.set(true)
      )('Create Submit Button'),
      hasClickedPreSubmit.value
          ? (Button()
            ..addTestId('submit-button')
            ..onClick = (_) => hasSubmitted.set(true)
          )('Submit')
          : null,
      hasSubmitted.value ? (Dom.div()..addTestId('submitted-container'))('Yay, you submitted!') : null,
    ));
  },
  _$SubmitButtonConfig, // ignore: undefined_identifier
);
```

</details>

The example is little contrived, but the important thing is that there are two elements that _could_ exist but may not. To test the last one, we need the other to already exist. To test that with OverReact Test, we could do:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
   test('can submit a form', () {
    final renderResult = render(Wrapper()(
      SubmitButton()(),
    ));

    click(queryByTestId(renderResult, 'pre-submit-button'));

    click(queryByTestId(renderResult, 'submit-button'));

    expect(queryByTestId(renderResult, 'submitted-container'), isNotNull);
  });
}
```

That test is nice and terse, but the problem is that the query for the `submit-button` may return `null`, which will throw this rather unhelpful error when running the test:

```
NoSuchMethodError: invalid member on null: '__reactFiber$ng533drevep'
package:react/react_dom.js 4534:52         getInstanceFromNode
package:react/react_dom.js 2470:26         click
package:react/react_test_utils.dart 63:67  click
ui_components/button/rtl_test.dart 72:10   <fn>
```

It gives a line number and mentions the `click` API, but it doesn't actually spell out "Your query returned `null`". As a result, most would actually do this:

```diff
 import 'package:over_react/over_react.dart';
 import 'package:over_react_test/over_react_test.dart';
 import 'package:test/test.dart';

 import '../component_definition.dart';

 main() {
   test('can submit a form', () {
     final renderResult = render(Wrapper()(
       SubmitButton()(),
     ));

     click(queryByTestId(renderResult, 'pre-submit-button'));

+    final submitButton = queryByTestId(renderResult, 'submit-button');
+    expect(submitButton, isNotNull);
+    click(submitButton);
-    click(queryByTestId(renderResult, 'submit-button'));

     expect(queryByTestId(renderResult, 'submitted-container'), isNotNull);
   });
 }
```

That way, if the test is going to fail because that `submit-button` doesn't get rendered like expected, the test failure error is actually helpful.

So for OverReact Test, that looks good. Let's look at how we could write in with RTL though:

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
   test('shows the submit confirmation', () {
    final view = rtl.render(SubmitButton()());

    UserEvent.click(view.getByRole('button', name: 'Create Submit Button'));

    UserEvent.click(view.getByRole('button', name: 'Submit'));

    expect(view.getByText('Yay, you submitted!'), isInTheDocument);
  });
}
```

That looks almost exactly like the first (and simpler) OverReact Test example. However, there are two differences:

1. If the test fails trying to find the submit button, it fails _before_ getting to `UserEvent.click` because the `getByRole` query failed. On top of that, here's the error message (collapsed, because it's quite long):

   <details>
   <summary>Error Message (click to expand)</summary>

   ```
   TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "Submit"

         Here are the accessible roles:

           button:

           Name "Create Submit Button":
           <div
             aria-disabled="false"
             class="btn btn-default"
             data-test-id="pre-submit-button wsd.hitareaComponent wsd.hitarea"
             role="button"
             tabindex="0"
             value=""
           />

           --------------------------------------------------

         <div>
           <div
             aria-disabled="false"
             class="btn btn-default"
             data-test-id="pre-submit-button wsd.hitareaComponent wsd.hitarea"
             role="button"
             tabindex="0"
             value=""
           >
             Create Submit Button
           </div>
         </div>

         ------------------------------
         Query Failure Stack Trace:
         package:react_testing_library/js/react-testing-library.js 18440:25     buildTestingLibraryElementError
         package:react_testing_library/js/react-testing-library.js 18457:22     buildJsGetElementError
         package:react_testing_library/js/react-testing-library.js 15970:37     <fn>
         package:react_testing_library/js/react-testing-library.js 15942:36     <fn>
         package:react_testing_library/js/react-testing-library.js 15995:37     getByRole
         package:react_testing_library/src/dom/queries/by_role.dart 138:15      <fn>
         package:react_testing_library/src/util/error_message_utils.dart 43:28  withErrorInterop
         package:react_testing_library/src/dom/queries/by_role.dart 137:7       getByRole
         ui_components/button/rtl_test.dart 91:25                               <fn>
         package:test_api/src/backend/declarer.dart 171:19                      <fn>
         dart:sdk_internal 32183:33                                             onValue
         package:stack_trace/src/stack_zone_specification.dart 126:26           <fn>
         package:stack_trace/src/stack_zone_specification.dart 206:15           [_run]
         package:stack_trace/src/stack_zone_specification.dart 126:14           <fn>
         dart:sdk_internal 28107:27                                             <fn>
         package:stack_trace/src/stack_zone_specification.dart 206:15           [_run]
         package:stack_trace/src/stack_zone_specification.dart 116:48           <fn>
         dart:sdk_internal 28557:9                                              <fn>

         ------------------------------
         dart:sdk_internal                                                     throw_
         package:react_testing_library/src/util/error_message_utils.dart 46:7  withErrorInterop
         package:react_testing_library/src/dom/queries/by_role.dart 137:7      getByRole
         ui_components/button/rtl_test.dart 91:25                              <fn>
   ```

   </details>

   Here's why that message is so awesome:

   - It explicitly says it couldn't find a button with the name "Submit", and that's why it failed.
   - It shows the elements on the DOM that _could have_ been queried successfully.
   - There is still a stack trace, but it's actually helpful and points to the line and the query directly.

   So while this test looks like the simplest version that could be written in OverReact Test, it handles that failure much better.

1. The last `expect` statement is redundant. The last assertion is:

   ```dart
   expect(view.getByText('Yay, you submitted!'), isInTheDocument);
   ```

   Technically, the `expect` statement itself will never fail because the nested `getByText` query will fail first if an element isn't found. As a result, that `expect` statement is the equivelant to just:

   ```dart
   view.getByText('Yay, you submitted!');
   ```

   For this example, it made sense to actually wrap it in an `expect` so that it is clear that the test is ending with an expectation that the text could be found, but doing this [is up to personal preference][common-mistakes-get-assertions]. The important thing is to understand that `getBy` queries have this behavior and can be used that way.

## Assertions Verifying Props and State Values

The most common pattern to be migrated is checking an instance's prop or state values are the expected values. Before migrating these types of expectations, it's import to understand the concept of [use case testing][entrypoint-use-case].

This section covers:

- Asserting Props or State are Set as Expected
- Verifying Styles or Class Names

For all of these scenarios, the approach is to shift from checking the underlying values to what the user should expect to see in the application when the props and state are set to those values.

All of the examples in this section will use the same component definition (below, collapsed) to illustrate how a test was written with OverReact Test and how it could now be written with RTL. The example is a simple log in form that triggers `onSuccessfulAuth` or `onFailedAuth`, in addition to managing it's own form state.

<details>
  <summary>Component Definition (click to expand)</summary>

</details>

### Asserting Props or State are Set as Expected

When props or state are being checked in a test, there are three broad scenarios usually being tested:

- Defaults are the expected value
- Values are correct after a re-render
- Children of a parent have the expected values given the parent's props and state

#### Default values are the expected value

Usually when a test reaches into a component to verify initial props, the idea is to ensure the component is initialized with the expected data. The use case being tested, then, is that the component loads as expected. Instead of testing that the data loads as expected though, we should be testing that the UI loads as expected. Here is what this test could have looked like in OverReact Test:

#### Values are Correct after Re-Render

When components re-render, there is an opportunity for either data or UI to update in an unexpected ways. Re-renders are largely triggered by two things:

- A parent changing the component's props
- Internal state changes

### Verifying Styles or Class Names

Styles and class names are often set on an element based on the props or state of a parent. Because of that, it is common to grab the child's ref and just check its props to make sure the parent set the expected values.

TODO add an example

## Checking Form Input Nodes

To assert that a form input has an expected attribute, there are many common patterns. Sometimes it's easiest to grab the DOM node and check its values directly, sometimes the props instance is easiest, or maybe even the state. All around though, RTL makes testing these nodes very intuitive. As is mentioned in [assertions verifying props and state values](#assertions-verifying-props-and-state-values), in the case that the form inputs were being tested via their props or state, it will be important to determine what the UI the corresponds with those values are. From there though, the RTL test is really straight forward.

TODO add example

## Migrating Children Assertions

Often, a component should return children depending on the context. Assertions here may be checking how many children are rendered or that specific children have correct values. In both cases, as is the pattern, we should turn to the DOM to ensure what we expect is showing to the user.

<details>
  <summary>Component Definition (click to expand)</summary>

```dart
import 'package:over_react/over_react.dart';
import 'package:web_skin_dart/component2/all.dart';

part 'component_definition.over_react.g.dart';

UiFactory<TodoListProps> TodoList = castUiFactory(_$TodoList); // ignore: undefined_identifier

mixin TodoListProps on UiProps {}

mixin TodoListState on UiState {
  List<String> listItems;
}

class TodoListComponent extends UiStatefulComponent2<TodoListProps, TodoListState> {
  @override
  get initialState => newState()..listItems = [];

  Ref<TextInputComponent> _ref = createRef<TextInputComponent>();

  @override
  render() {
    return (Dom.div()(
      (TextInput()
        ..ref = _ref
        ..addTestId('text-input')
        ..label = 'New List Item'
      )(),
      (Button()
        ..addTestId('submit-button')
        ..onClick = (_) {
          final inputValue = _ref.current.getValue();
          _ref.current.setValue('');

          setState(newState()..listItems = [...state.listItems, inputValue]);
        }
      )('Add Item'),
      (ListGroup()..addTestId('list-group'))(
        state.listItems.map((content) {
          return (ListGroupItem()..key = content)(content);
        }),
      ),
    ));
  }
}
```

</details>

This example features a simple input and button that can be used to add items to a `ListGroup`. To test that the `ListGroup` renders the expected children with OverReact Test, we would do:

```dart
import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
   test('renders children as expected', () {
    final renderResult = render(TodoList()());
    final listGroup = getComponentByTestId(renderResult, 'list-group') as ListGroupComponent;

    void addListItem(String item) {
      final component = getDartComponent(renderResult) as TodoListComponent;
      component.setState(component.newState()..listItems = [...component.state.listItems, item]);
    }

    expect(listGroup.props.children.length, 0);

    addListItem('first item');
    addListItem('second item');

    expect(listGroup.props.children.length, 2);
  });
}
```

This is a common pattern, but has a couple of weaknesses (as far as expectations go):

1. We don't actually know that users can see the children. Children can exist with styles that prevent the node from being visible in the DOM.
1. Assuming the children render as expected, we aren't checking what they are displaying to the user. We could do that, but it's a little more verbose so often this is as far as tests go.

In RTL, we can't access the component instance itself and are guided towards testing in a way that avoids these pitfalls:

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import '../component_definition.dart';

main() {
   test('renders children as expected', () {
    final view = rtl.render(TodoList()());
    final listGroup = view.getByTestId('list-group');

    void addListItem(String item) {
      final input = view.getByLabelText('New List Item');
      UserEvent.type(input, item);
      click(view.getByRole('button', name: 'Add Item'));
    }

    expect(listGroup, isEmptyDomElement);

    addListItem('first item');
    addListItem('second item');

    expect(listGroup, containsElement(view.getByText('first item')));
    expect(listGroup, containsElement(view.getByText('second item')));
  });
}
```

Note that here we're making the same fundamental assertions, but all of them are based in the DOM as opposed to the implementation details of the component. Another important takeaway is doing:

```dart
expect(listGroup, containsElement(view.getByText('first item')));
```

and not doing:

```dart
expect(view.getByText('first item'), isInTheDocument);
```

While the latter does verify the component will add to nodes to the DOM, we want to enforce that not only does that node exist in the document, but its parent is also the `listGroup`.

## Migrating Async Assertions

[entrypoint-philosophy]: https://github.com/Workiva/react_testing_library/blob/master/doc/from_over_react_test.md#philosophy
[entrypoint-use-cases]: https://github.com/Workiva/react_testing_library/blob/master/doc/from_over_react_test.md#use-case-testing
[querying-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/queries.md
[matcher-docs]: https://workiva.github.io/react_testing_library/topics/Matchers-topic.html
[common-mistakes-get-assertions]: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions

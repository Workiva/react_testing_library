# Migration Guide for Queries

* __[Background](#background)__
* __[Best Practices](#best-practices)__
    * __[Priority](#priority)__
* __[Migration Process](#migration-process)__
    * __[ByRole](#byrole)__
    * __[ByLabelText](#bylabeltext)__
    * __[ByPlaceholderText](#byplaceholdertext)__
    * __[ByText](#bytext)__
* __[Examples](#examples)__
    * __[ByRole](#byrole-examples)__
    * __[ByLabelText](#bylabeltext-examples)__
    * __[ByText](#bytext-examples)__

## Background

## Best Practices

### Priority

Based on the [Guiding Principles][guiding-principles] of React Testing Library, your test should resemble how users 
interact with your code (component, page, etc.) as much as possible. 

With this in mind, the following is the recommended order of priority for queries:

1. Queries Accessible to Everyone
    1. `getByRole`
    1. `getByLabelText` (top priority for form fields)
    1. `getByPlaceholderText`
    1. `getByText`
    1. `getByDisplayValue`
1. Semantic Queries HTML5 and ARIA compliant selectors
    1. `getByAltText`
    1. `getByTitle`
1. Test IDs
    1. `getByTestId`

In general, `getByRole` should cover most cases and `getByTestId` should only be used as a last resort.

For more information, see [documentation on query priority][query-priority].

## Migration Process

When migrating from `over_react_test` queries to to RTL queries, try to use the [highest priority queries](#priority) 
first when possible. The following guides are in order of priority.

### ByRole

[ByRole queries][by-role-queries] search for elements by their role. Use [this table of HTML elements with their
corresponding roles](https://www.w3.org/TR/html-aria/#docconformance) to determine what role to query for.

For example, the following test uses `querySelector` to access the header element. We need to migrate this test to
use an RTL query instead.

```dart
import 'dart:html';

import 'package:copy_ui/src/copy/components/common/email_confirmation_modal.dart';
import 'package:copy_ui/src/copy/shared/constants.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

main() {
    test('EmailConfirmationModal renders with correct DOM structure', () async {
      final jacket = mount(
          (EmailConfirmationModal()
            ..jobType = JobTypes.transition.toLowerCase()
          )(),
          attachedToDocument: true);

      final header = querySelector('.modal-callout-heading');
      expect(header, isNotNull);
      expect(header.text, 'Transition Started');
    });
}
```
> Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L36)

The rendered DOM is printed in the error message of failing `ByRole` queries. This is the DOM for the header we are trying to access:

```html
<h4 
  class="modal-callout-heading"
  data-test-id="wsd.Dialog.headerContent"
  id="dialog_z6f6_callout"
>
    Transition Started
</h4>
```

Since the role for the `<h4>` element above is `heading` and the text content is `Transition Started` we can query for this
element using: `getByRole('heading', name: 'Transition Started')`. This query also combines the test's expectation
for text content with the query, so the resulting RTL test will be:

```dart
import 'package:copy_ui/src/copy/components/common/email_confirmation_modal.dart';
import 'package:copy_ui/src/copy/shared/constants.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:test/test.dart';

main() {
  test('EmailConfirmationModal renders with correct DOM structure', () async {
    final renderResult = rtl.render((EmailConfirmationModal()
      ..jobType = JobTypes.transition.toLowerCase()
    )());

    // This both finds the element and verifies the text content in one function call.
    final header = renderResult.getByRole('heading', name: 'Transition Started');
    expect(header, isInTheDocument);
  });
}
```

> See [other examples of migrating to `ByRole` queries](#byrole-examples).


### ByLabelText

While ByRole queries are top priority for most elements, you should use [ByLabelText queries][by-label-text-queries] 
when querying for form elements. These queries reflect how the user navigates a form by looking at label text.

For example, the following test uses `getComponentByTestId` and `component.getInputDomNode()` to access the input element. 
We need to migrate this test to use an RTL query instead.

```dart
import 'dart:html';

import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';
import 'package:web_skin_dart/ui_components.dart';
import 'package:graph_ui/src/components/form/property_inputs/graph_number_property_input.dart';
import 'shared_property_tests.dart';

void main() {
  test('GraphNumberPropertyInput accepts valid input', () {
    var renderedComponent = render((GraphNumberPropertyInput()
      ..isCTE = false
      ..property = numProp
    )());

    final component =
        getComponentByTestId(renderedComponent, 'graph_ui__number-property-input__input') as ClickToEditInputComponent;
    final input = component.getInputDomNode() as InputElement;

    input.value = '3.14';
    change(input);

    // ...
  });
}
```
> Example from [`graph_ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/graph_ui/-/blob/test/unit/ui_components/form/property_inputs/graph_number_property_input_test.dart#L51-54)

The rendered DOM is printed in the error message of failing `ByLabelText` queries. This is the DOM for the input we are trying to access:

```html
<div>
    <label
      class="rol-label"
      data-tecontst-id="wsd.FormComponentBehaviorMixin.label"
      for="input_5HfL"
    >
        testPropertyName
    </label>
    <div>
        <input
          class="clip-text form-control"
          data-test-id="graph_ui__number-property-input__input graph_ui__abstract-graph-input__input wsd.TextInput.input"
          id="input_5HfL"
          placeholder="Enter number"
          type="text"
          value=""
        />
    </div>
</div>
```

Since the input element has a label with the text `'testPropertyName'`, we can query for the
element using: `getByLabelText('testPropertyName')`, so the resulting RTL test will be:

```dart
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';
import 'package:graph_ui/src/components/form/property_inputs/graph_number_property_input.dart';
import 'shared_property_tests.dart';

void main() {
  test('GraphNumberPropertyInput accepts valid input', () {
    var renderResult = rtl.render((GraphNumberPropertyInput()
      ..isCTE = false
      ..property = numProp
    )());

    final input = renderResult.getByLabelText('testPropertyName');

    UserEvent.type(input, '3.14');

    // ...
  });
}
```

> See [other examples of migrating to `ByLabelText` queries](#bylabeltext-examples).


### ByPlaceholderText

If a form field does not have a label, use [ByPlaceholderText queries][by-placeholder-text-queries] to find the element.

> Note: This case should be __very__ rare because [a placeholder is not a substitute for a label](https://www.nngroup.com/articles/form-design-placeholders/).

For example, the following test uses `queryByTestId` to access the input element.
We need to migrate this test to use an RTL query instead.

```dart
import 'dart:html';

import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

main() {
  test('Input without a label', () {
    final instance = render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..placeholder = 'Type here...'
      )(),
    ));

    final input = queryByTestId(instance, 'test-id') as InputElement;
    expect(input.placeholder, 'Type here...');
  });
}
```

The rendered DOM is printed in the error message of failing `ByPlaceholderText` queries. This is the DOM for the input we are trying to access:

```html
<div>
    <input
      data-test-id="test-id"
      placeholder="Type here..."
    />
</div>
```

Since the input element has no label, we have to use the placeholder text to query for the element using:
`getByPlaceholderText('Type here...')`, so the resulting RTL test will be:

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  test('Input without a label', () {
    final renderResult = rtl.render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..placeholder = 'Type here...'
      )(),
    ));

    var input = renderResult.getByPlaceholderText('Type here...');
    expect(input, isInTheDocument);
  });
}
```


### ByText

[ByText queries][by-text-queries] can be used to find non-interactive elements that have no role, but have text content (like divs, spans, and paragraphs).

For example, the following test uses `getAllByTestId` to access all the div elements containing author names.
We need to migrate this test to use an RTL query instead.

```dart
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';
import 'package:w_history/src/components/cards/history_card_parts/authors.dart';

void main() {
  test('Author Card Component: Multiple document authors', () {
    final instance = renderAttachedToDocument((Authors()
      ..actions = actions
      ..historyData = historyData
      ..authorListExpanded = true
    )());

    final components = getAllByTestId(instance, 'wh.TimeGroupCard.authorName');
    expect(components, hasLength(3));
    expect(components[0].innerText, 'name1');
    expect(components[1].innerText, 'name3');
    expect(components[2].innerText, 'name4');
  });
}
```
> Example from [`w_history`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/w_history/-/blob/test/src/components/cards/history_card_parts/authors_test.dart#L205-206)

The rendered DOM is printed in the error message of failing `ByText` queries. This is the DOM for the divs we are trying to access:

```html
<div>
    <div
      class="w-history-v2__author"
      data-test-id="wh.TimeGroupCard.authorName"
    >
        name1
    </div>
    <div
      class="w-history-v2__author"
      data-test-id="wh.TimeGroupCard.authorName"
    >
        name3
    </div>
    <div
      class="w-history-v2__author"
      data-test-id="wh.TimeGroupCard.authorName"
    >
        name4
    </div>
</div>
```

Since these divs have no role, we have to query by text content using: `getAllByText(RegExp(r'name\d'))`, so the 
resulting RTL test will be:

```dart
import 'package:react_testing_library/matchers.dart' show hasTextContent;
import 'package:test/test.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:w_history/src/components/cards/history_card_parts/authors.dart';

void main() {
  test('Author Card Component: Multiple document authors', () {
    final renderResult = rtl.render((Authors()
      ..actions = actions
      ..historyData = historyData
      ..authorListExpanded = true
    )());

    final components = renderResult.getAllByText(RegExp(r'name\d'));
    expect(components, hasLength(3));
    expect(components[0], hasTextContent('name1'));
    expect(components[1], hasTextContent('name3'));
    expect(components[2], hasTextContent('name4'));
  });
}
```

> See [other examples of migrating to `ByText` queries](#bytext-examples).






## Examples

### ByRole Examples
### ByLabelText Examples

#### Access the element instead of the props

```diff
import 'dart:html';

+ import 'package:react_testing_library/matchers.dart' show isDisabled;
+ import 'package:react_testing_library/react_testing_library.dart' as rtl;
- import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';
import 'package:web_skin_dart/component2/all.dart';
import 'package:cerebral_ui/src/report_builder/field_properties_module/components/parameter_choices_component.dart';

main() {
  test('Parameter choices component renders text area', () {
+   var renderResult = rtl.render((ParameterChoices()
-   var instance = render((ParameterChoices()
      ..isMultiSelect = false
      ..defaultValue = 3
      ..choices = [1, 2, 3]
    )());

    // Use `getByLabelText` to store a reference to the textarea element.
+   var textArea = renderResult.getByLabelText('List Options') as TextAreaElement;
-   var choicesProps =
-       AutosizeTextarea(getPropsByTestId(instance, 'cdp.parameter.choices'));

    // Verify textArea
-   expect(choicesProps.label, 'List Options');
+   expect(textArea.placeholder, 'Add list options (one per line)');
-   expect(choicesProps.placeholder, 'Add list options (one per line)');
+   expect(textArea, isNot(isDisabled));
-   expect(choicesProps.isDisabled, false);
  });
}
```
> Example from [`cerebral-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/cerebral-ui/-/blob/test/unit/report_builder/field_properties_module/parameter_choices_component_test.dart#L20-21)

### ByText Examples



[guiding-principles]:[https://testing-library.com/docs/guiding-principles/]
[query-priority]:[https://testing-library.com/docs/queries/about/#priority]
[by-role-queries]:[https://testing-library.com/docs/queries/byrole]
[by-label-text-queries]:[https://testing-library.com/docs/queries/bylabeltext]
[by-placeholder-text-queries]:[https://testing-library.com/docs/queries/byplaceholdertext]
[by-text-queries]:[https://testing-library.com/docs/queries/bytext]
[by-alt-text-queries]:[https://testing-library.com/docs/queries/byalttext]

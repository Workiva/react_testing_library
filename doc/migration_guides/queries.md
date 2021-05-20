# Migration Guide for Queries

* __[Background](#background)__
* __[Best Practices](#best-practices)__
    * __[Priority](#priority)__
* __[Migration Process](#migration-process)__
    * __[ByRole](#byrole)__
    * __[ByLabelText](#bylabeltext)__
    * __[ByPlaceholderText](#byplaceholdertext)__
* __[Examples](#examples)__
    * __[ByRole](#byrole-examples)__
    * __[ByLabelText](#bylabeltext-examples)__
    * __[ByPlaceholderText](#byplaceholdertext-examples)__

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
(Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L36))

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
(Example from [`graph_ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/graph_ui/-/blob/test/unit/ui_components/form/property_inputs/graph_number_property_input_test.dart#L51-54))

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


## Examples

### ByRole Examples
### ByLabelText Examples

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

    // Verify textArea
+   var textArea = renderResult.getByLabelText('List Options') as TextAreaElement;
-   var choicesProps =
-       AutosizeTextarea(getPropsByTestId(instance, 'cdp.parameter.choices'));
-   expect(choicesProps.label, 'List Options');
+   expect(textArea.placeholder, 'Add list options (one per line)');
-   expect(choicesProps.placeholder, 'Add list options (one per line)');
+   expect(textArea, isNot(isDisabled));
-   expect(choicesProps.isDisabled, false);
  });
}
```

### ByPlaceholderText Examples



[guiding-principles]:[https://testing-library.com/docs/guiding-principles/]
[query-priority]:[https://testing-library.com/docs/queries/about/#priority]
[by-role-queries]:[https://testing-library.com/docs/queries/byrole]
[by-label-text-queries]:[https://testing-library.com/docs/queries/bylabeltext]

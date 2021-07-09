# Migration Guide for Queries

* __[Background](#background)__
* __[Best Practices](#best-practices)__
    * __[Priority](#priority)__
    * __[Types of Queries](#types-of-queries)__
* __[Migrating to RTL Queries](#migrating-to-rtl-queries)__
    * __[ByRole](#byrole)__
    * __[ByLabelText](#bylabeltext)__
    * __[ByPlaceholderText](#byplaceholdertext)__
    * __[ByText](#bytext)__
    * __[ByDisplayValue](#bydisplayvalue)__
    * __[ByAltText](#byalttext)__
    * __[ByTitle](#bytitle)__
    * __[ByTestId](#bytestid)__
* __[Migrating from Component/Prop Queries to DOM Element Queries](#migrating-from-componentprop-queries-to-dom-element-queries)__

## Background

React Testing Library (RTL) queries will replace all utilities (from `over_react_test` and otherwise) that current tests use
to access elements, component instances, or props.

These utilities include:

* Element Queries
    * `findDomNode()`
    * `querySelector()` / `querySelectorAll()`
    * `renderAndGetDom()`
    * `getByTestId()` / `getAllByTestId()`
    * `queryByTestId()` / `queryAllByTestId()`
    * `getComponentRootDomByTestId()`
    * `findRenderedDOMComponentWithClass()`
    * `getElementsByTagName()`
    * `getElementsByClassName()`
    * `scryRenderedDOMComponentsWithClass()`
    * `scryRenderedDOMComponentsWithTag()`
    * `scryWithDartType()`
* Component Queries
    * `getDartComponent()`
    * `renderAndGetComponent()`
    * `getComponentByTestId()` / `getAllComponentsByTestId()`
* Props Queries
    * `getPropsByTestId()`
    * `getProps()`
    
See [Migrating to RTL Queries](#migrating-to-rtl-queries) section for how to determine which query to migrate to.

See [Migrating to DOM Element Queries](#migrating-from-componentprop-queries-to-dom-element-queries) section for how to migrate from querying for components/props to DOM elements.


## Best Practices

See the [RTL Query docs][query-docs] for a full overview on how to use queries.

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
1. Semantic Queries _(HTML5 and ARIA compliant selectors)_
    1. `getByAltText`
    1. `getByTitle`
1. Test IDs
    1. `getByTestId`

In general, `getByRole` (and `getByLabelText` for form fields) should cover most cases and `getByTestId` should only be used as a last resort.

For more information, see [documentation on query priority][query-priority].

### Types of Queries

Refer to the following table for a summary of the different types of queries:

Type of Query       | 0 Matches   | 1 Match        | \>1 Matches  | Retry (Async/Await)
------------------- | ----------- | -------------- | ------------ | -------------------
_Single Element_    |             |                |              |
`getBy...`          | Throw error | Return element | Throw error  | No
`queryBy...`        | Return null | Return element | Throw error  | No
`findBy...`         | Throw error | Return element | Throw error  | Yes
_Multiple Elements_ |             |                |              | 
`getAllBy...`       | Throw       | Return array   | Return array | No
`queryAllBy...`     | Return []   | Return array   | Return array | No
`findAllBy...`      | Throw       | Return array   | Return array | Yes

In general:
* `get(All)By...` queries will commonly be used when the element(s) are expected to be in the document. 
  This will remove the need to check that the query result is not `null` or empty.
* `query(All)By...` queries will commonly be used when the element(s) are not always expected to be in the document. 
  This allows you to expect the query result to be `null` or empty without an error being thrown.
* `find(All)By...` queries will be used in async tests that need to wait for the element(s) to be in the document before querying for them.

For more information, see [documentation on types of queries][query-types].

## Migrating to RTL Queries

When migrating from `over_react_test` queries to RTL queries, try to use the [highest priority queries](#priority) 
first when possible. The following migration guidance is in order of priority.

### ByRole

[ByRole queries][by-role-queries] search for elements by their role. Use [this table of HTML elements with their
corresponding roles](https://www.w3.org/TR/html-aria/#docconformance) to determine what role to query for. 

ByRole queries should be the go-to queries to use in most cases because they:

1. Most closely reflect how the user would find elements on the page.
1. Encourage accessibility standards by ensuring that elements being tested are exposed on the 
   [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree) and have the appropriate ARIA role.

For example, the following test uses `querySelector` to access the header element.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access that same header element.

```dart
import 'dart:html';

import 'package:copy_ui/src/copy/components/common/email_confirmation_modal.dart';
import 'package:copy_ui/src/copy/shared/constants.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

main() {
  test('EmailConfirmationModal renders with correct DOM structure', () {
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
> Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui@2562f5c5d417ee6c1e1d9da28ccb261640af6fb4/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L36)

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can print the accessible roles using `rtl.logRoles(rtl.screen.container)` (see [`logRoles` documentation][log-roles]). This is the result for the header we are trying to access:

```html
heading:

Name "Transition Started":
<h4
  class="modal-callout-heading"
  id="dialog_pLPo_callout"
/>
```

<details>
  <summary>See full result of logRoles call (click to expand)</summary>

```html
document:

Name "":
<body />

Name "Transition Started":
<div
  aria-labelledby="dialog_pLPo_callout"
  class="modal-dialog"
  data-wsd-default-overlay-container=""
  role="document"
  tabindex="0"
/>

--------------------------------------------------
presentation:

Name "":
<div
  class="backdrop modal-backdrop fade in"
  role="presentation"
/>

Name "":
<div
  class="modal-content"
  role="presentation"
/>

--------------------------------------------------
dialog:

Name "":
<div
  class="email-confirmation-modal modal in modal-callout"
  id="dialog_pLPo"
  role="dialog"
  tabindex="-1"
/>

--------------------------------------------------
button:

Name "Close":
<button
  aria-controls="dialog_pLPo"
  class="close hitarea"
  tabindex="0"
  title="Close"
  type="button"
  value=""
/>

Name "OK":
<div
  aria-disabled="false"
  class="btn btn-primary"
  data-automation-id="CopyUI.Modal.EmailConfirmation.Close"
  role="button"
  tabindex="0"
  value=""
/>

--------------------------------------------------
heading:

Name "Transition Started":
<h4
  class="modal-callout-heading"
  id="dialog_pLPo_callout"
/>

--------------------------------------------------
```

</details>

Since the role for the `h4` element above is `heading` and the [accessible name](https://www.w3.org/TR/accname-1.1/) is `Transition Started`, we can query for this
element using: `getByRole('heading', name: 'Transition Started')`. This query also combines the test's expectation
for text content with the query, so the resulting RTL test will be:

```dart
import 'package:copy_ui/src/copy/components/common/email_confirmation_modal.dart';
import 'package:copy_ui/src/copy/shared/constants.dart';
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  test('EmailConfirmationModal renders with correct DOM structure', () {
    final view = rtl.render((EmailConfirmationModal()
      ..jobType = JobTypes.transition.toLowerCase()
    )());

    // `isInTheDocument` is redundant here since `get*` queries throw when a match is not found, 
    // but it can be a good idea to make the assertion explicit.
    // See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions
    expect(view.getByRole('heading', name: 'Transition Started'), isInTheDocument);
  });
}
```

#### Other Examples

The following examples are abbreviated to only show how the query portion of the test should be updated. 
Refer to the [other migration guides][other-migration-guides] for how to update the rest of these tests to RTL.

Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui@2562f5c5d417ee6c1e1d9da28ccb261640af6fb4/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L39-40):
```diff
- queryByTestId(renderedInstance, CommonComponentTestIds.emailConfirmationModalButton)
+ view.getByRole('button', name: SharedModalConstants.okButtonText)
```

Examples from [`graph_ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/graph_ui@f22018bf25a129e95cf24d56d3e84a1078613bf6/-/blob/test/unit/ui_components/ss_to_graph/import_table_test.dart#L521-526):
```diff
- getAllByTestId(renderedInstance, 'a.vertexData.headCell')
+ view.getByRole('rowheader', name: 'a')
```

```diff
- getAllByTestId(renderedInstance, 'graph_ui.ImportTable.tableBody.vertexData')
+ view.getAllByRole('cell')
```

Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk@ccaccc053a5fcec4514cac94a9c68394af58739d/-/blob/test/unit/browser/segregated_tests/memory_leakers/truss_2/workspaces_module/components/sidebar_brand_test.dart#L44-45):
```diff
- findRenderedDOMComponentWithClass(component, 'hitarea')
+ view.getByRole('button')
```

Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk@ccaccc053a5fcec4514cac94a9c68394af58739d/-/blob/test/unit/browser/segregated_tests/memory_leakers/truss_1/rich_app_shell/components/document_tabs_pane_test.dart#L372-373):
```diff
- scryRenderedDOMComponentsWithClass(component, 'nav-item')
+ view.getAllByRole('presentation')
```


### ByLabelText

While ByRole queries are top priority for most elements, you should use [ByLabelText queries][by-label-text-queries] 
when querying for form elements. These queries reflect how the user navigates a form by looking at label text.

For example, the following test uses `findRenderedDOMComponentWithClass` and `findDOMNode` to access the input element.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access that same input element.

```dart
import 'dart:html';

import 'package:react/react_dom.dart' as react_dom;
import 'package:react/react_test_utils.dart';
import 'package:test/test.dart';
import 'package:wdesk_sdk/src/truss/session_module/components/expiration/session_expired_modal.dart';

main() {
  test('SessionExpiredModal password input', () {
    final component = renderIntoDocument((SessionExpiredModal()
      ..failed = false
      ..reauthenticating = false
      ..userDisplayName = 'superUser'
    )());

    final password = findRenderedDOMComponentWithClass(component, 'form-control');
    InputElement passwordNode = react_dom.findDOMNode(password);

    String passwordInputValue = 'superSecretPassword';
    passwordNode.value = passwordInputValue;
    Simulate.change(password);

    // ...
  });
}
```
> Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk@ccaccc053a5fcec4514cac94a9c68394af58739d/-/blob/test/unit/browser/segregated_tests/memory_leakers/truss_1/session_module/components/expiration/session_expired_modal_test.dart#L140-142)

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM containing the input we are trying to access:

```html
<div
  class="form-group"
>
    <label
      class="col-xs-3 control-label"
      for="enterPasswordField"
    >
        Password
    </label>
    <div
      class="form-control-wrapper col-xs-6"
    >
        <input
          aria-required="true"
          class="form-control"
          id="enterPasswordField"
          type="password"
        />
    </div>
</div>
```

Since the input element has a label with the text `Password`, we can query for the
element using: `getByLabelText('Password')`, so the resulting RTL test will be:

```dart
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';
import 'package:wdesk_sdk/src/truss/session_module/components/expiration/session_expired_modal.dart';

main() {
  test('SessionExpiredModal password input', () {
    final view = rtl.render((SessionExpiredModal()
      ..failed = false
      ..reauthenticating = false
      ..userDisplayName = 'superUser'
    )());

    final passwordInput = view.getByLabelText('Password');

    UserEvent.type(passwordInput, 'superSecretPassword');

    // ...
  });
}
```

#### Other Examples

The following examples are abbreviated to only show how the query portion of the test should be updated.
Refer to the [other migration guides][other-migration-guides] for how to update the rest of these tests to RTL.

Example from [`xbrl-module`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/xbrl-module@0eb7a422e768d68208ec1cd78832d890fa0afe43/-/blob/test/unit/src/components/xbrl_blackline_filters_test.dart#L222-225):
```diff
- queryAllByTestId(component.getInstance(), 'xbrl--blackline-history-panel-toolbar--filter-form--datepicker')
+ view.queryAllByLabelText('Date', exact: false)
```

Example from [`w_comments`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/w_comments@23d0c03b9388286febedb703b71ff1ccc5ea54b2/-/blob/test/unit/src/comments/components/thread/create_comment_form_test.dart#L133):
```diff
- directMentionsComponent.getInputDomNode()
+ view.getByLabelText('Comment')
```


### ByPlaceholderText

If a form field does not have a label, use [ByPlaceholderText queries][by-placeholder-text-queries] to find the element.

> Note: This case should be rare because [a placeholder is not a substitute for a label](https://www.nngroup.com/articles/form-design-placeholders/).

For example, the following test uses `queryByTestId` to access the input element.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access that same input element.

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
        ..type = 'password'
        ..placeholder = 'Password'
      )(),
    ));

    final input = queryByTestId(instance, 'test-id') as InputElement;
    expect(input.placeholder, 'Password');
  });
}
```

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM for the input we are trying to access:

```html
<div>
    <input
      data-test-id="test-id"
      placeholder="Password"
      type="password"
    />
</div>
```

Since the input element has no label and no role, we have to use the placeholder text to query for the element using:
`getByPlaceholderText('Type here...')`, so the resulting RTL test will be:

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  test('Input without a label', () {
    final view = rtl.render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..type = 'password'
        ..placeholder = 'Password'
      )(),
    ));

    // `isInTheDocument` is redundant here since `get*` queries throw when a match is not found, 
    // but it can be a good idea to make the assertion explicit.
    // See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions
    expect(view.getByPlaceholderText('Password'), isInTheDocument);
  });
}
```


### ByText

[ByText queries][by-text-queries] can be used to find non-interactive elements that have no role, but have text content (like divs, spans, and paragraphs).

For example, the following test uses `getAllByTestId` to access all the div elements containing author names.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access those same div elements.

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
> Example from [`w_history`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/w_history@8b1fcb2328bb27ed420029064218fd4657de6ae4/-/blob/test/src/components/cards/history_card_parts/authors_test.dart#L205-206)

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM for the divs we are trying to access:

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
    final view = rtl.render((Authors()
      ..actions = actions
      ..historyData = historyData
      ..authorListExpanded = true
    )());

    final authorNodes = view.getAllByText(RegExp(r'name\d'));
    expect(authorNodes, hasLength(3));
    expect(authorNodes[0], hasTextContent('name1'));
    expect(authorNodes[1], hasTextContent('name3'));
    expect(authorNodes[2], hasTextContent('name4'));
  });
}
```
> Note: As an alternative to using RegEx, you can also set the `exact` option to `false` like: `getAllByText('name', exact: false)`.

#### Other Examples

The following examples are abbreviated to only show how the query portion of the test should be updated.
Refer to the [other migration guides][other-migration-guides] for how to update the rest of these tests to RTL.

Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui@2562f5c5d417ee6c1e1d9da28ccb261640af6fb4/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L37-38):
```diff
- queryByTestId(renderedInstance, CommonComponentTestIds.emailConfirmationModalDescription)
+ view.getByText('You\'ll get an email letting you know', exact: false)
```

Example from [`workspaces_components`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/workspaces_components@af5177ca4d37d43e18f03c50c9a3a29bb89636b9/-/blob/test/unit/workspaces_components/time_ago_test.dart#L34):
```diff
- queryByTestId(renderedInstance, TimeAgoTestIds.timeAgo)
+ view.getByText(TimeAgoComponent.formatTimeAgo(nowTimestamp))
```

Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk@ccaccc053a5fcec4514cac94a9c68394af58739d/-/blob/test/unit/browser/segregated_tests/memory_leakers/app_infrastructure_1/network_health/network_health_alerts_test.dart#L23):
```diff
- queryByTestId(component, 'network-health-offline')
+ view.getByText('You are not connected to the internet.')
```


### ByDisplayValue

If a form field does not have a label or placeholder, use [ByDisplayValue queries][by-display-value-queries] to find the element.

> Note: This case should be rare because form fields can often be searched for using [ByLabelText queries](#bylabeltext) instead.

For example, the following test uses `queryByTestId` to access the input element.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access that same input element.

```dart
import 'dart:html';

import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

main() {
  test('Date Input', () {
    final instance = render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..type = 'date'
        ..defaultValue = '2021-06-01'
      )(),
    ));

    final input = queryByTestId(instance, 'test-id') as InputElement;
    expect(input.value, '2021-06-01');
  });
}
```

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM for the input we are trying to access:

```html
<div>
    <input
      data-test-id="test-id"
      type="date"
      value="2021-06-01"
    />
</div>
```

Since the input element has no label, no placeholder, and no role, we have to use the display value to query for the element using:
`getByDisplayValue('2021-06-01')`, so the resulting RTL test will be:

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  test('Date Input', () {
    final view = rtl.render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..type = 'date'
        ..defaultValue = '2021-06-01'
      )(),
    ));

    // `isInTheDocument` is redundant here since `get*` queries throw when a match is not found, 
    // but it can be a good idea to make the assertion explicit.
    // See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions
    expect(view.getByDisplayValue('2021-06-01'), isInTheDocument);
  });
}
```


### ByAltText

[ByAltText queries][by-alt-text-queries] allow you to search for input, image, or area elements by `alt` text.

> Note: This case should be rare because input, image, and area elements can often be searched for using 
> [ByRole queries](#byrole) or [ByLabelText queries](#bylabeltext) instead.

For example, the following test uses `queryByTestId` to access the input element.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access that same input element.

```dart
import 'dart:html';

import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

main() {
  test('Color Input', () {
    final instance = render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..type = 'color'
        ..alt = 'color input'
      )(),
    ));

    var input = queryByTestId(instance, 'test-id') as InputElement;
    expect(input.alt, 'color input');
  });
}
```

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM for the input we are trying to access:

```html
<div>
    <input
      alt="color input"
      data-test-id="test-id"
      type="color"
    />
</div>
```

Since the color input element has no label, no placeholder, and no role, we have to use the alt text to query for the element using:
`getByAltText('color input')`, so the resulting RTL test will be:

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  test('Color Input', () {
    final view = rtl.render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..type = 'color'
        ..alt = 'color input'
      )(),
    ));

    // `isInTheDocument` is redundant here since `get*` queries throw when a match is not found, 
    // but it can be a good idea to make the assertion explicit.
    // See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions
    expect(view.getByAltText('color input'), isInTheDocument);
  });
}
```


### ByTitle

Use [ByTitle queries][by-title-queries] to query for elements that have a `title` attribute, but no text content or role.

For example, the following test uses `renderAndGetDom` to access the icon element.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access that same icon element.

```dart
import 'package:over_react_test/over_react_test.dart' as test_util;
import 'package:shared_ui/src/outline/badges/internal_sheet_badge.dart';
import 'package:test/test.dart';

void main() {
  test('Internal Sheet Badge renders badge when internal', () {
    var badge = test_util.renderAndGetDom((InternalSheetBadge()
      ..badgeMeta = (InternalSheetBadgeMeta()..isInternal = true)));

    expect(badge, isNotNull);
    expect(badge.attributes['data-test-id'],
        equals('dt.Outline.internalSheetBadge'));
  });
}
```
> Example from [`doc_plat_client`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/doc_plat_client@659287a02a269c8b2c82d9a91e9239a11c74abe0/-/blob/subpackages/shared_ui/test/unit/src/outline/internal_sheet_badge_test.dart#L19-20)

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM for the element we are trying to access:

```html
<i
  aria-hidden="true"
  class="icon icon-eye-hide"
  data-test-id="dt.Outline.internalSheetBadge"
  style="margin: 0.7rem 0"
  title="Internal use sheet"
/>
```

Since this element does not have a role or text content, we have to query by title using: `getByTitle('Internal use sheet')`, so the
resulting RTL test will be:

```dart
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:shared_ui/src/outline/badges/internal_sheet_badge.dart';
import 'package:test/test.dart';

void main() {
  test('Internal Sheet Badge renders badge when internal', () {
    final view = rtl.render((InternalSheetBadge()
      ..badgeMeta = (InternalSheetBadgeMeta()..isInternal = true)
    )());

    // `isInTheDocument` is redundant here since `get*` queries throw when a match is not found, 
    // but it can be a good idea to make the assertion explicit.
    // See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-get-variants-as-assertions
    expect(view.getByTitle('Internal use sheet'), isInTheDocument);
  });
}
```

#### Other Examples

The following examples are abbreviated to only show how the query portion of the test should be updated.
Refer to the [other migration guides][other-migration-guides] for how to update the rest of these tests to RTL.

Example from [`admin_client`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/admin_client@c302b8f7be289ca25e3343339c3d9ffcb549424b/-/blob/test/unit/suite_3/my_profile_module/my_profile_module_test.dart#L116):
```diff
- queryByTestId(testJacket.getDartInstance(), 'wsd.Avatar.initials')
+ view.getByTitle('firstName lastName')
```


### ByTestId

Use [ByTestId queries][by-test-id-queries] to query for elements that cannot be accessed using any of the above queries. 
This should be a last resort because a user would never interact with a page using test ids.

For example, the following test uses `findDOMNode` to access the div element.
To write an RTL test that validates the same behavior, we need to determine which RTL query to use to access that same div element.

```dart
import 'package:react/react_dom.dart' as react_dom;
import 'package:react/react_test_utils.dart' as react_test_utils;
import 'package:test/test.dart';
import 'package:wdesk_sdk/src/truss/workspaces_module/components/sidebar_brand.dart';

main() {
  test('WorkspacesSidebarBrand should render properly with no props', () {
    final component =
    react_test_utils.renderIntoDocument(WorkspacesSidebarBrand()());
    final componentNode = react_dom.findDOMNode(component);

    expect(componentNode.classes, contains('wksp-sidebar-content-block'));
    expect(componentNode.classes, contains('wksp-sidebar-masthead-brand'));
  });
}
```
> Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk@ccaccc053a5fcec4514cac94a9c68394af58739d/-/blob/test/unit/browser/segregated_tests/memory_leakers/truss_2/workspaces_module/components/sidebar_brand_test.dart#L22)

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM for the element we are trying to access:

```html
<div
  class="wksp-sidebar-content-block wksp-sidebar-masthead-brand"
  data-test-id="workspaces.sidebar.brand"
>
    <div
      class="brand-img-wrapper"
    >
        ...
    </div>
    <div
      class="wksp-sidebar-min-max-control-wrapper"
    >
        <button
          class="hitarea sidebar-toggle"
          data-test-id="workspaces.sidebar.toggle"
          type="button"
        >
            ...
        </button>
    </div>
</div>
```

Since this div element does not have a role, label, text content, or title we have to query by its test id using: `getByTestId('workspaces.sidebar.brand')`, so the
resulting RTL test will be:

```dart
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart' show hasClasses;
import 'package:test/test.dart';
import 'package:wdesk_sdk/src/truss/workspaces_module/components/sidebar_brand.dart';

import '../../../../../truss_helpers/utils.dart';

main() {
  initializeTest();

  test('WorkspacesSidebarBrand should render properly with no props', () {
    final view = rtl.render(WorkspacesSidebarBrand()());
    final componentNode = view.getByTestId('workspaces.sidebar.brand');

    expect(componentNode,
        hasClasses('wksp-sidebar-content-block wksp-sidebar-masthead-brand'));
  });
}
```

#### Other Examples

The following examples are abbreviated to only show how the query portion of the test should be updated.
Refer to the [other migration guides][other-migration-guides] for how to update the rest of these tests to RTL.

Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui@2562f5c5d417ee6c1e1d9da28ccb261640af6fb4/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L34-35):
```diff
- queryByTestId(renderedInstance, CommonComponentTestIds.emailConfirmationModalIcon)
+ view.getByTestId(CommonComponentTestIds.emailConfirmationModalIcon)
```


## Migrating from Component/Prop Queries to DOM Element Queries

React testing library does not support querying for a component instance or testing props. We need to replace these queries with
queries for DOM elements. This can be done by looking at what props are being tested and determining which DOM elements we need to 
access to test the same things. This will sometimes mean replacing one query with multiple.

For example, the following test uses `getComponentByTestId` to access the `VerticalButtonComponent` instance.
To write an RTL test that validates the same behavior, we need to use an RTL query to access the elements in `VerticalButtonComponent` that are being tested.

```dart
import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';
import 'package:w_filing/src/filing_module/components/collect_action_toolbar.dart';
import 'package:w_filing/src/test_ids.dart' as test_ids;
import 'package:web_skin_dart/component2/icon.dart';
import 'package:web_skin_dart/component2/toolbars.dart';

void main() {
  test('CollectActionToolbar combine button renders correctly', () {
    final root = renderAttachedToDocument(CollectActionToolbar()
      ..actions = filingDispatcher
      ..store = mockFilingMall
      ..selectedDocuments = []);

    VerticalButtonComponent button = getComponentByTestId(root, test_ids.CollectViewIds.combineDocsButton);
    expect(button.props.isDisabled, isTrue);
    expect(button.props.displayText, 'Combine');
    expect(button.props.glyph, IconGlyph.TWFR_GROUP_ADD);
  });
}
```
> Example from [`w_filing`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/w_filing@ddc298f7ab01762698e227d6709a63695db6067a/-/blob/test/unit/tests/components/collect_action_toolbar_test.dart#L171)

Once we import `react_testing_library` (namespaced as `rtl`) in our test file, we can view the rendered DOM using `rtl.screen.debug()`. This is the DOM for the `VerticalButtonComponent` we are trying to access:

```html
<div
  aria-disabled="true"
  aria-haspopup="false"
  class="btn btn-vertical disabled"
  data-test-id="combine-edgar-overlay combine-docs-button toolbars.AbstractToolbarItem.base wsd.VerticalToolbarButton.button wsd.hitareaComponent wsd.hitarea"
  id="o_trigger_VRmxPJ"
  role="button"
  style="pointer-events: auto !important;"
  title=""
>
    <i
      aria-hidden="true"
      class="icon icon-md icon-two-color icon-twfr-group-add"
      data-test-id="wsd.AbstractVerticalToolbarButton.glyph"
    />
    <small
      class="btn-label-sm"
      data-test-id="wsd.AbstractVerticalToolbarButton.displayText"
    >
        Combine
    </small>
</div>
```

In order to determine which element(s) to query for, we need to look at what props are being tested and which element 
they each correspond to:

* `props.isDisabled`: `disabled` is an attribute of the button, so we need to access the top level `div` with the following query:
    * `final button = view.getByRole('button', name: 'Combine');`
* `props.displayText`: The display text of the button is already being tested using the `name` argument in the `getByRole` query we used to access the button.
* `props.glyph`: The glyph is a part of the `i` element inside the button, so we can use the following query to access it:
    * `final buttonIcon = within(button).getByTestId('wsd.AbstractVerticalToolbarButton.glyph');`

Now that we determined which elements to access, the resulting RTL test will be:

```dart
import 'package:react_testing_library/matchers.dart' show hasClasses, isDisabled;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';
import 'package:w_filing/src/filing_module/components/collect_action_toolbar.dart';

void main() {
  test('CollectActionToolbar combine button renders correctly', () {
    final view = rtl.render((CollectActionToolbar()
      ..actions = filingDispatcher
      ..store = mockFilingMall
      ..selectedDocuments = []
    )());

    final button = view.getByRole('button', name: 'Combine');
    expect(button, isDisabled);

    final buttonIcon = rtl.within(button).getByTestId('wsd.AbstractVerticalToolbarButton.glyph');
    expect(buttonIcon, hasClasses('icon-twfr-group-add'));
  });
}
```

### Other Examples

The following examples are abbreviated to only show how the query portion of the test should be updated.
Refer to the [other migration guides][other-migration-guides] for how to update the rest of these tests to RTL.

Example from [`cerebral-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/cerebral-ui@7156511e9c5b8ee1a6da104605ff73e5039dcc41/-/blob/test/unit/report_builder/field_properties_module/parameter_choices_component_test.dart#L20-21):
```diff
- AutosizeTextarea(getPropsByTestId(instance, 'cdp.parameter.choices'))
+ view.getByLabelText('List Options')
```

Example from [`graph_ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/graph_ui@f22018bf25a129e95cf24d56d3e84a1078613bf6/-/blob/test/unit/ui_components/form/property_inputs/graph_number_property_input_test.dart#L51-54):
```diff
- getComponentByTestId(renderedComponent, 'graph_ui__number-property-input__input')
+ view.getByLabelText('testPropertyName')
```


[query-docs]: https://workiva.github.io/react_testing_library/topics/Queries-topic.html
[guiding-principles]: https://testing-library.com/docs/guiding-principles/
[query-priority]: https://testing-library.com/docs/queries/about/#priority
[query-types]: https://testing-library.com/docs/queries/about#types-of-queries
[by-role-queries]: https://workiva.github.io/react_testing_library/topics/ByRole-topic.html
[log-roles]: https://workiva.github.io/react_testing_library/rtl.dom.accessibility/logRoles.html
[by-label-text-queries]: https://workiva.github.io/react_testing_library/topics/ByLabelText-topic.html
[by-placeholder-text-queries]: https://workiva.github.io/react_testing_library/topics/ByPlaceholderText-topic.html
[by-text-queries]: https://workiva.github.io/react_testing_library/topics/ByText-topic.html
[by-display-value-queries]: https://workiva.github.io/react_testing_library/topics/ByDisplayValue-topic.html
[by-alt-text-queries]: https://workiva.github.io/react_testing_library/topics/ByAltText-topic.html
[by-title-queries]: https://workiva.github.io/react_testing_library/topics/ByTitle-topic.html
[by-test-id-queries]: https://workiva.github.io/react_testing_library/topics/ByTestId-topic.html
[other-migration-guides]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/from_over_react_test.md#migration-guides

# Migration Guide for Queries

* __[Background](#background)__
* __[Best Practices](#best-practices)__
    * __[Priority](#priority)__
* __[Migrating to RTL Queries](#migrating-to-rtl-queries)__
    * __[ByRole](#byrole)__
    * __[ByLabelText](#bylabeltext)__
    * __[ByPlaceholderText](#byplaceholdertext)__
    * __[ByText](#bytext)__
    * __[ByAltText](#byalttext)__
    * __[ByTitle](#bytitle)__
    * __[ByTestId](#bytestid)__
* __[Migrating from Component/Prop Queries to DOM Element Queries](#migrating-from-componentprop-queries-to-dom-element-queries)__

## Background

React Testing Library (RTL) queries will replace all utilities (from `over_react_test` and otherwise) that current tests use
to access elements, component instances, or props.

These utilities include:

* Element Queries
    * `getElementsByTagName()`
    * `getElementsByClassName()`
    * `findDomNode()`
    * `querySelector()` / `querySelectorAll()`
    * `renderAndGetDom()`
    * `getByTestId()` / `getAllByTestId()`
    * `queryByTestId()` / `queryAllByTestId()`
    * `getComponentRootDomByTestId()`
    * `findRenderedDOMComponentWithClass()`
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


## Migrating to RTL Queries

// TODO add additional examples for each

When migrating from `over_react_test` queries to RTL queries, try to use the [highest priority queries](#priority) 
first when possible. The following migration guidance is in order of priority.

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

#### Other Examples

Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L39-40):
```diff
- queryByTestId(renderedInstance, CommonComponentTestIds.emailConfirmationModalButton)
+ renderResult.getByRole('button', name: SharedModalConstants.okButtonText)
```

Examples from [`graph_ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/graph_ui/-/blob/test/unit/ui_components/ss_to_graph/import_table_test.dart#L521-526):
```diff
- getAllByTestId(renderResult, 'a.vertexData.headCell')
+ renderResult.getByRole('rowheader', name: 'a')
```

```diff
- getAllByTestId(renderResult, 'graph_ui.ImportTable.tableBody.vertexData')
+ renderResult.getAllByRole('cell')
```

Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk/-/blob/test/unit/browser/segregated_tests/memory_leakers/truss_2/workspaces_module/components/sidebar_brand_test.dart#L44-45):
```diff
- findRenderedDOMComponentWithClass(component, 'hitarea')
+ renderResult.getByRole('button')
```


### ByLabelText

While ByRole queries are top priority for most elements, you should use [ByLabelText queries][by-label-text-queries] 
when querying for form elements. These queries reflect how the user navigates a form by looking at label text.

For example, the following test uses `getComponentByTestId` and `component.getInputDomNode()` to access the input element. 
We need to migrate this test to use an RTL query instead.

// TODO replace this and move to component testing
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

#### Other Examples




### ByPlaceholderText

If a form field does not have a label, use [ByPlaceholderText queries][by-placeholder-text-queries] to find the element.

> Note: This case should be rare because [a placeholder is not a substitute for a label](https://www.nngroup.com/articles/form-design-placeholders/).

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

#### Other Examples

Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L37-38):
```diff
- queryByTestId(renderedInstance, CommonComponentTestIds.emailConfirmationModalDescription)
+ renderResult.getByText('You\'ll get an email letting you know when the transition is complete.')
```

Example from [`workspaces_components`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/workspaces_components/-/blob/test/unit/workspaces_components/time_ago_test.dart#L34):
```diff
- queryByTestId(renderedInstance, TimeAgoTestIds.timeAgo)
+ renderResult.getByText(TimeAgoComponent.formatTimeAgo(nowTimestamp))
```

Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk/-/blob/test/unit/browser/segregated_tests/memory_leakers/app_infrastructure_1/network_health/network_health_alerts_test.dart#L23):
```diff
- queryByTestId(component, 'network-health-offline')
+ renderResult.getByText('You are not connected to the internet.')
```


### ByAltText

[ByAltText queries][by-alt-text-queries] allow you to search for input, image, or area elements by `alt` text.

> Note: This case should be rare because input, image, and area elements can often be searched for using 
> [ByRole queries](#byrole) or [ByLabelText queries](#bylabeltext) instead.

For example, the following test uses `queryByTestId` to access the input element.
We need to migrate this test to use an RTL query instead.

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

The rendered DOM is printed in the error message of failing `ByAltText` queries. This is the DOM for the input we are trying to access:

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
    final renderResult = rtl.render(Dom.div()(
      (Dom.input()
        ..addTestId('test-id')
        ..type = 'color'
        ..alt = 'color input'
      )(),
    ));

    var input = renderResult.getByAltText('color input');
    expect(input, isInTheDocument);
  });
}
```


### ByTitle

Use [ByTitle queries][by-title-queries] to query for elements that have a `title` attribute, but not text content or role.

For example, the following test uses `renderAndGetDom` to access the icon element.
We need to migrate this test to use an RTL query instead.

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
> Example from [`doc_plat_client`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/doc_plat_client/-/blob/subpackages/shared_ui/test/unit/src/outline/internal_sheet_badge_test.dart#L19-20)

The rendered DOM is printed in the error message of failing `ByTitle` queries. This is the DOM for the element we are trying to access:

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
    var renderResult = rtl.render((InternalSheetBadge()
      ..badgeMeta = (InternalSheetBadgeMeta()..isInternal = true)
    )());

    final badge = renderResult.getByTitle('Internal use sheet');
    expect(badge, isInTheDocument);
  });
}
```

#### Other Examples


### ByTestId

Use [ByTestId queries][by-test-id-queries] to query for elements that cannot be accessed using any of the above queries. 
This should be a last resort because a user would never interact with a page using test ids.

For example, the following test uses `findDOMNode` to access the div element.
We need to migrate this test to use an RTL query instead.

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
> Example from [`wdesk_sdk`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/wdesk_sdk/-/blob/test/unit/browser/segregated_tests/memory_leakers/truss_2/workspaces_module/components/sidebar_brand_test.dart#L22)

The rendered DOM is printed in the error message of failing `ByTestId` queries. This is the DOM for the element we are trying to access:

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
    final renderResult = rtl.render(WorkspacesSidebarBrand()());
    final componentNode =
        renderResult.getByTestId('workspaces.sidebar.brand');

    expect(componentNode,
        hasClasses('wksp-sidebar-content-block wksp-sidebar-masthead-brand'));
  });
}
```

#### Other Examples

Example from [`copy-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/copy-ui/-/blob/test/copy/unit/components/common/email_confirmation_modal_test.dart#L34-35):
```diff
- queryByTestId(renderedInstance, CommonComponentTestIds.emailConfirmationModalIcon)
+ renderResult.getByTestId(CommonComponentTestIds.emailConfirmationModalIcon)
```


## Migrating from Component/Prop Queries to DOM Element Queries

React testing library does not support querying for a component instance or testing props. We need to replace these queries with
queries for DOM elements. This can be done by looking at what props are being tested and determining which DOM elements we need to 
access to test the same things. This will sometimes mean replacing one query with multiple.

For example, the following test uses `getComponentByTestId` to access the `VerticalButtonComponent` instance.
We need to migrate this test to use an RTL query instead.

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
    expect(button.props.glyph, IconGlyph.TWFR_GROUP_ADD);
    expect(button.props.isDisabled, isTrue);
    expect(button.props.displayText, 'Combine');
  });
}
```
> Example from [`w_filing`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/w_filing/-/blob/test/unit/tests/components/collect_action_toolbar_test.dart#L171)

This is the DOM for the `VerticalButtonComponent` we are trying to access:

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

* `props.glyph`: The glyph is a part of the `i` element inside the button, so we can use the following query to access it:
    * `rtl.within(button).getByTestId('wsd.AbstractVerticalToolbarButton.glyph')`
* `props.isDisabled`: `disabled` is an attribute of the button, so we need to access the top level `div` with the following query:
    * `renderResult.getByRole('button', name: 'Combine')`
* `props.displayText`: The display text of the button is already being tested using the `name` argument in the `getByRole` query we used to access the button.

Now that we determined which elements to access, the resulting RTL test will be:

```dart
import 'package:react_testing_library/matchers.dart' show hasClasses;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';
import 'package:w_filing/src/filing_module/components/collect_action_toolbar.dart';

void main() {
  test('CollectActionToolbar combine button renders correctly', () {
    final renderResult = rtl.render((CollectActionToolbar()
      ..actions = filingDispatcher
      ..store = mockFilingMall
      ..selectedDocuments = []
    )());

    final button = renderResult.getByRole('button', name: 'Combine');
    expect(button, hasClasses('disabled'));

    final buttonIcon = rtl.within(button).getByTestId('wsd.AbstractVerticalToolbarButton.glyph');
    expect(buttonIcon, hasClasses('icon-twfr-group-add'));
  });
}
```

### Other Examples

Example from [`cerebral-ui`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/cerebral-ui/-/blob/test/unit/report_builder/field_properties_module/parameter_choices_component_test.dart#L20-21):
```diff
- AutosizeTextarea(getPropsByTestId(instance, 'cdp.parameter.choices'))
+ renderResult.getByLabelText('List Options')
```


[guiding-principles]: https://testing-library.com/docs/guiding-principles/
[query-priority]: https://testing-library.com/docs/queries/about/#priority
[by-role-queries]: https://testing-library.com/docs/queries/byrole
[by-label-text-queries]: https://testing-library.com/docs/queries/bylabeltext
[by-placeholder-text-queries]: https://testing-library.com/docs/queries/byplaceholdertext
[by-text-queries]: https://testing-library.com/docs/queries/bytext
[by-alt-text-queries]: https://testing-library.com/docs/queries/byalttext
[by-title-queries]: https://testing-library.com/docs/queries/bytitle
[by-test-id-queries]: https://testing-library.com/docs/queries/bytestid

# Migration Guide for Component Rendering

- **[Background](#background)**
- **[Best Practices](#best-practices)**
    - **[Avoid Shallow Rendering](#avoid-shallow-rendering)**
    - **[Naming Conventions](#naming-conventions)**
- **[Migrating to React Testing Library Rendering](#migrating-to-react-testing-library-rendering)**
    - **[Rendering](#rendering)**
        - **[Attached to the Document](#attached-to-the-document)**
        - **[Auto Tear Down](#auto-tear-down)**
        - **[Render into Container](#render-into-container)**
    - **[Accessing Rendered DOM](#accessing-rendered-dom)**
    - **[Re-Rendering](#re-rendering)**
    - **[Unmounting](#unmounting)**

## Background

The React Testing Library (RTL) `render` function will replace all methods of rendering or mounting components in OverReact Test.

> To learn about how to use `render` in RTL, see [render documentation][rtl-render-doc].

OverReact Test had two main utilities for rendering components: `render()` and `mount()`.

1. `render` function variations
    * `render()`
    * `renderIntoDocument()` (from `react-dart`)
    * `renderAttachedToDocument()`
    * `renderAndGet...` utilities
        * `renderAndGetComponent()`
        * `renderAndGetDom()`
    * `renderShallow()`
2. `TestJacket` usage with `mount()`
    * `jacket.rerender()`
    * `jacket.get...` utilities
        * `jacket.getInstance()`
        * `jacket.getProps()`
        * `jacket.getNode()`
        * `jacket.getDartInstance()`
    * `jacket.setState()`
    * `jacket.unmount()`

These two methods have a lot in common and will have similar migration paths to RTL.

## Best Practices

### Avoid Shallow Rendering

React Testing Library does not support shallow rendering of components because it does not resemble how users would interact with components.

Instead of using `renderShallow`, just use RTL's `render` function to render the full component and its children.

For more information, see [Kent Dodd's article on why he does not use shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering).

### Naming Conventions

Because OverReact and OverReact Test expose `render` functions, we recommend namespacing your `react_testing_library`
import as `rtl` to avoid collision:

`import 'package:react_testing_library/react_testing_library.dart' as rtl;`

We also recommend naming the return value of the `rtl.render` function `view`:

`final view = rtl.render(...);`

## Migrating to React Testing Library Rendering

### Rendering

The RTL `render` method will be a one-to-one replacement for most of the current rendering methods used in tests.

For example, below are multiple ways a component may be rendered using OverReact Test and other test utilities:

```dart
import 'dart:html';

import 'package:over_react/over_react.dart';
import 'package:over_react_test/over_react_test.dart';
import 'package:react/react_test_utils.dart' as test_utils;
import 'package:test/test.dart';

void main() {
  test('render', () {
    final instance = render((Dom.button()..addTestId('test-id'))('Click me!'))
        as ButtonElement;

    expect(instance.text, equals('Click me!'));
  });

  test('renderIntoDocument', () {
    final button = test_utils.renderIntoDocument(
        (Dom.button()..addTestId('test-id'))('Click me!')) as ButtonElement;

    expect(button.text, equals('Click me!'));
  });

  test('mount', () {
    final jacket = mount((Dom.button()..addTestId('test-id'))('Click me!'));

    expect(jacket.getNode().text, equals('Click me!'));
  });
}
```

To migrate to RTL, simply import `react_testing_library` (namespaced as `rtl`) and replace the current render method with `rtl.render`. 
The three tests above all translate to the same test in RTL:

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

void main() {
  test('rtl.render', () {
    final view = rtl.render((Dom.button()..addTestId('test-id'))('Click me!'));

    expect(view.getByRole('button', name: 'Click me!'), isInTheDocument);
  });
}
```

> Note: For more information on how to migrate the query and expectation portions of the test to RTL,
> see the [other migration guides][all-migration-guides].

#### Attached to the Document

Most current tests render into a detached node while RTL's `render` function always renders attached to `document.body`. 
This does not change the functionality of existing tests, but it does mean that tests no longer need to specify when 
to render attached to the document.

Below are examples of how to migrate these kinds of tests:

```diff
import 'package:over_react/over_react.dart';
- import 'package:over_react_test/over_react_test.dart';
+ import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

void main() {
  test('renderAttachedToDocument', () {
-   renderAttachedToDocument((Dom.button()..addTestId('test-id'))('Click me!'));
+   final view = rtl.render((Dom.button()..addTestId('test-id'))('Click me!'));

    // The rest of the test ...
  });

  test('mount attachedToDocument', () {
-   final jacket = mount(
-     (Dom.button()..addTestId('test-id'))('Click me!'),
-     attachedToDocument: true,
-   );
+   final view = rtl.render((Dom.button()..addTestId('test-id'))('Click me!'));

    // The rest of the test ...
  });
}
```

#### Auto Tear Down

RTL's `render` function provides `autoTearDown` and `onDidTearDown` arguments that work the same way as `autoTearDown` 
and `autoTearDownCallback` arguments do in [OverReact Test's `render` function][over-react-test-render-doc].

These arguments can simply be copy and pasted when the render method is replaced with the RTL version.

For more information on `autoTearDown` and `onDidTearDown`, see [RTL render docs][rtl-render-doc].

#### Render into Container

The `container` argument works very similar to OverReact Test's `container` and `mountNode` arguments for `render()` and `mount()`, respectively.

If the test is setting the `container` / `mountNode` to a `DivElement` with default props, this argument can be removed entirely when converting the test to RTL because `rtl.render` already renders content inside a `DivElement` that is attached to `document.body`. Below is an example of this:

```diff
import 'dart:html';

import 'package:over_react/over_react.dart';
- import 'package:over_react_test/over_react_test.dart';
+ import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  test('Div Container', () {
-   final container = DivElement();
-   final jacket = mount(
+   final view = rtl.render(
      (Dom.p()..addTestId('test-id'))('Hello World!'),
-     mountNode: container,
    );
-   expect(jacket.getNode().text, equals('Hello World!'));
+   expect(view.getByText('Hello World!'), isInTheDocument);
  });
}
```

In most cases, adding a `container` argument should not be necessary, but if you do need to set `container` to something else, make sure to append that node to `document.body` because it will not be done automatically.

For example, to update this test with a `TableElement` container, make sure to also append the `container` to `document.body`:

```diff
import 'dart:html';

import 'package:over_react/over_react.dart';
- import 'package:over_react_test/over_react_test.dart';
+ import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  test('Table Container', () {
    final container = TableElement();
-   final instance = render(
+   final view = rtl.render(
      Dom.tbody()(
        (Dom.tr()..addTestId('table-row'))(
          Dom.td()('January'),
          Dom.td()('\$100'),
        ),
        (Dom.tr()..addTestId('table-row'))(
          Dom.td()('February'),
          Dom.td()('\$80'),
        ),
      ),
-     container: container,
+     container: document.body.append(container),
    );
-   expect(queryAllByTestId(instance, 'table-row'), hasLength(2));
+   expect(view.getAllByRole('row'), equals([isInTheDocument, isInTheDocument]));
  });
}
```

> Note: For more information on how to migrate the query and expectation portions of the test to RTL,
> see the [other migration guides][all-migration-guides].

### Accessing Rendered DOM

Some OverReact Test render utilities both render UI and access rendered components, props, and elements.

These utilities include:

* `renderAndGetComponent()`
* `renderAndGetDom()`
* `testJacket.getInstance()`
* `testJacket.getProps()`
* `testJacket.getNode()`
* `testJacket.getDartInstance()`

To migrate these kinds of utilities to RTL, we need to split the functionality into two parts: rendering the UI and accessing parts of the UI.

For example, the following test uses `renderAndGetDom()` to both render the `DateHeading` and get the `div` element that is being tested.

```dart
import 'package:test/test.dart';
import 'package:w_history/components/date_heading.dart';
import 'package:over_react_test/over_react_test.dart';

main() {
  test('DateHeading renders date', () {
    const String date = 'April 17, 2019';
    var renderedDateHeading = renderAndGetDom(DateHeading()..date = date);
    expect(renderedDateHeading.innerHtml, equals(date));
    expect(renderedDateHeading, hasExactClasses('history-date-header'));
  });
}
```
> Example from [`w_history`](https://sourcegraph.wk-dev.wdesk.org/github.com/Workiva/w_history@8b1fcb2328bb27ed420029064218fd4657de6ae4/-/blob/test/components/date_heading_test.dart#L9-14)

When converting this test to RTL, the `renderAndGetDom()` should be replaced with a render call and followed by a query for the element being tested:

```dart
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart' show hasClasses;
import 'package:test/test.dart';
import 'package:w_history/components/date_heading.dart';

main() {
  test('DateHeading renders date', () {
    const String date = 'April 17, 2019';
    final view = rtl.render((DateHeading()..date = date)());
    final dateHeading = view.getByText(date);
    expect(dateHeading, hasClasses('history-date-header'));
  });
}
```

For more information on how to migrate the query part of these utilities, see the [queries migration guide][queries-migration-guide].

### Re-Rendering

While RTL provides a `view.rerender()` utility that can replace usages of OverReact Test's `jacket.rerender()`, it would
be more in line with the [Testing Library's guiding principles][rtl-guiding-principles] to test the user interaction on 
the component causing the prop updates.

> To learn more about re-rendering in RTL, see [`RenderResult.rerender` documentation][rtl-rerender-doc].

Below is an example of how re-rendering might be replaced with user interactions.

<details>
  <summary>Component Definition (click to expand)</summary>

```dart
import 'package:over_react/over_react.dart';

part 'component_implementation.over_react.g.dart';

UiFactory<FancySubmitButtonProps> FancySubmitButton =
    castUiFactory(_$FancySubmitButton); // ignore: undefined_identifier

class FancySubmitButtonProps = UiProps with DomPropsMixin;

class FancySubmitButtonComponent extends UiComponent2<FancySubmitButtonProps> {
  @override
  get defaultProps => (newProps()..disabled = false);

  @override
  render() => (Dom.button()
    ..addTestId('fancy-button')
    ..type = 'submit'
    ..className = 'fancy-class-name${props.disabled ? ' disabled' : ''}'
    ..addProps(props)
  )('Submit');
}

mixin FancyFormProps on UiProps {}

UiFactory<FancyFormProps> FancyForm = uiFunction(
  (props) {
    final firstName = useState('');
    final lastName = useState('');
    return Dom.form()(
      (Dom.label()..htmlFor = 'first-name')('First Name'),
      (Dom.input()
        ..type = 'text'
        ..onChange = ((SyntheticFormEvent e) => firstName.set(e.target.value))
        ..id = 'first-name'
      )(),
      (Dom.label()..htmlFor = 'last-name')('Last Name'),
      (Dom.input()
        ..type = 'text'
        ..onChange = ((SyntheticFormEvent e) => lastName.set(e.target.value))
        ..id = 'last-name'
      )(),
      (FancySubmitButton()
        ..disabled = firstName.value.isEmpty || lastName.value.isEmpty
      )(),
    );
  },
  _$FancyFormConfig, // ignore: undefined_identifier
);
```

</details>

Using OverReact Test, the disabled and non-disabled styling for `FancySubmitButton` might be tested by 
rendering the component and then re-rendering with the `disabled` prop set to `true`:

```dart
import 'dart:html';

import 'package:over_react_test/over_react_test.dart';
import 'package:test/test.dart';

import 'component_interaction.dart';

main() {
  test('FancySubmitButton applies correct classes based on disabled state', () {
    final jacket = mount(FancySubmitButton()());

    final button =
        getByTestId(jacket.getInstance(), 'fancy-button') as ButtonElement;

    expect(button.disabled, isFalse);
    expect(button.classes, ['fancy-class-name']);

    jacket.rerender((FancySubmitButton()..disabled = true)());

    expect(button.disabled, isTrue);
    expect(button.classes, ['fancy-class-name', 'disabled']);
  });
}
```

To migrate this test to RTL, we could use `view.rerender()` to replace the re-rendering logic in this test, but this is 
something a user would never do when interacting with `FancySubmitButton`. 

A better approach would be to test the user interactions on `FancyForm` that would cause `FancySubmitButton` to re-render
with the `disabled` prop set to `true`. In this case, that means typing into the two input fields, so the RTL version of 
this test would be:

```dart
import 'package:react_testing_library/matchers.dart' show hasExactClasses, isDisabled;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

import 'component_interaction.dart';

main() {
  test('FancySubmitButton applies correct classes based on disabled state', () {
    final view = rtl.render(FancyForm()());

    final button = view.getByRole('button', name: 'Submit');

    expect(button, isDisabled);
    expect(button, hasExactClasses('fancy-class-name disabled'));

    // Perform the user interaction that would cause the button to become enabled.
    UserEvent.type(view.getByLabelText('First Name'), 'Jane');
    UserEvent.type(view.getByLabelText('Last Name'), 'Doe');

    expect(button, isNot(isDisabled));
    expect(button, hasExactClasses('fancy-class-name'));
  });
}
```

> Note: For more information on how to migrate the query, user interaction, and expectation portions of the test to RTL, 
> see the [other migration guides][all-migration-guides].

### Unmounting

It is unnecessary to manually call `view.unmount()` because it is automatically called in the `tearDown` of each test 
that calls `rtl.render` unless you set `autoTearDown` to `false`. Once rendering is migrated to RTL, `unmount` calls can
be removed unless the test is specifically testing what happens when the component is removed from the page.

> To learn more, see [`RenderResult.unmount` documentation][rtl-unmount-doc].


[all-migration-guides]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/from_over_react_test.md#migration-guides
[queries-migration-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/queries.md
[component-interactions-migration-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/component_interactions.md
[expectations-migration-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/expectations.md
[over-react-test-render-doc]: https://pub.dev/documentation/over_react_test/latest/over_react_test/render.html
[rtl-render-doc]: https://workiva.github.io/react_testing_library/rtl.react/render.html
[rtl-unmount-doc]: https://workiva.github.io/react_testing_library/rtl.react/RenderResult/unmount.html
[rtl-rerender-doc]: https://workiva.github.io/react_testing_library/rtl.react/RenderResult/rerender.html
[rtl-guiding-principles]: https://testing-library.com/docs/guiding-principles/

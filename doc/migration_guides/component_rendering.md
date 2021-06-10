# Migration Guide for Component Rendering

- **[Background](#background)**
- **[Best Practices](#best-practices)**
    - **[Naming](#naming)**
- **[Migrating to RTL Rendering](#migrating-to-rtl-rendering)** todo should i rename this?
    - **[Rendering](#rendering)**
        - **[Attached to the Document](#attached-to-the-document)**
        - **[Auto Tear Down](#auto-tear-down)**
        - **[Render into Container](#render-into-container)**
    - **[Shallow Rendering](#shallow-rendering)**
    - **[Accessing Rendered DOM](#accessing-rendered-dom)**
    - **[Re-Rendering](#re-rendering)**
    - **[Unmounting](#unmounting)**

todo fill this table of contents out

## Background

todo add something about how nice render is
It's similar to `TestJacket` where it returns a `RenderResult` object that can be queried from.

It also always renders attached to the document.

The React Testing Library (RTL) `render` function will replace all methods of rendering or mounting components in OverReact Test.

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

todo add best practices

### Naming

We recommend naming the return value of RTL's `render` function `view`.

```dart
import 'package:over_react/over_react.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

void main() {
  test('', () {
    final view = rtl.render((Dom.input()..type = 'checkbox')());
  });
}
```

## Migrating to RTL Rendering

Tentative outline: todo update this

* General rendering
  * `render()`
  * `renderIntoDocument()`
  * `mount()`
* Rendering attached to the document
  * `renderAttachedToDocument()`
  * `mount(..., attachedToDocument: true)`
* Shallow Rendering
  * `renderShallow()`
* Render and getting
  * `renderAndGetComponent()`
  * `renderAndGetDom()`
  * `testJacket.getInstance()`
  * `testJacket.getProps()`
  * `testJacket.getNode()`
  * `testJacket.getDartInstance()`
* Re-rendering or settings state
  * `jacket.rerender()`
  * `jacket.setState()`
* Unmounting
  * `jacket.unmount()`

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
The tests above all translate to the same test in RTL:

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

> Note: The query was also updated here. For information on how to update queries to RTL, see [the queries migration guide][queries-migration-guide].

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

For more information on `autoTearDown` and `onDidTearDown`, see [RTL render docs][react-testing-library-render-doc].

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

> Note: For how to migrate the query and expectation portions of the test to RTL, see the [queries migration guide][queries-migration-guide] and [expectations migration guide][expectations-migration-guide].


### Shallow Rendering

Should not be done todo fill out why and how to change

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

### Unmounting



### Migrate Rendering

something about container being defaulted to document.body

migrate both render and jacket.mount

### Migrate Re-Rendering

todo add example

[queries-migration-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/queries.md
[expectations-migration-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/expectations.md
[over-react-test-render-doc]: https://pub.dev/documentation/over_react_test/latest/over_react_test/render.html
[react-testing-library-render-doc]: https://workiva.github.io/react_testing_library/rtl.react/render.html

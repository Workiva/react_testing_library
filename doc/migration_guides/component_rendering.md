# Migration Guide for Component Rendering

* __[Background](#background)__
* __[Best Practices](#best-practices)__

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

## Migrating from OverReact Test

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

For example, the following test 

### Re-Rendering

### Unmounting



### Migrate Rendering

something about container being defaulted to document.body

migrate both render and jacket.mount

### Migrate Re-Rendering

todo add example

[queries-migration-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/queries.md
[over-react-test-render-doc]: https://pub.dev/documentation/over_react_test/latest/over_react_test/render.html
[react-testing-library-render-doc]: https://workiva.github.io/react_testing_library/rtl.react/render.html

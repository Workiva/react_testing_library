# Migration Guide for Component Rendering

* __[Background](#background)__
* __[Best Practices](#best-practices)__

todo fill this table of contents out

## Background

todo add something about how nice render is
it's similar to `TestJacket` where it returns a `RenderResult` object that can be queried from.

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
  * `jacket.getInstance()`
  * `jacket.getProps()`
  * `jacket.getNode()`
  * `jacket.getDartInstance()`
* Re-rendering or settings state
  * `jacket.rerender()`
  * `jacket.setState()`
* Unmounting
  * `jacket.unmount()`

### Rendering

Most current rendering methods can be easily migrated to RTL simply by adding the `react_testing_library` import
(namespaced as `rtl`) and replacing all render methods with `rtl.render` like so:

```diff
- import 'package:over_react_test/over_react_test.dart';
- import 'package:react/react_test_utils.dart' as test_utils;
+ import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

void main() {
  test('render', () {
-   render(Example()());
+   final view = rtl.render(Example()());

    // The rest of the test...
  });

  test('renderIntoDocument', () {
-   test_utils.renderIntoDocument(Example()());
+   final view = rtl.render(Example()());

    // The rest of the test...
  });

  test('mount', () {
-   final jacket = mount(Example()());
+   final view = rtl.render(Example()());

    // The rest of the test...
  });
}
```

#### Attached to the Document
#### Auto Tear Down
#### Render into Container

### Shallow Rendering

### Accessing Rendered DOM

### Re-Rendering

### Unmounting



### Migrate Rendering

something about container being defaulted to document.body

migrate both render and jacket.mount

### Migrate Re-Rendering

todo add example

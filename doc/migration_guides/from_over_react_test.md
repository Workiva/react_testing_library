# OverReact Test to React Testing Library Migration Guide

* __[Background](#background)__
* __[Best Practices](#best-practices)__
* __[Migration Guides](#migration-guides)__

## Background

By migrating our tests to this React Testing Library, we will be able to:

* Test components in a way that reflects how a user will actually interact with them.
* Avoid [the pitfalls of testing implementation details][implementation-details].
* Write tests for function components ([OverReact Test library][over-react-test] only fully supports class components).
* Encourage the accessibility of our components.

For the purpose of migrating to Material UI, only tests interacting with Web Skin Dart components _have_ to be migrated
because OverReact Test does not support testing function components. However, all component tests can be migrated to 
gain the simplicity and maintainability offered by React Testing Library.

## Best Practices

## Migration Guides

Migration guides are split into four parts that reflect how a test is set up:

```dart
import 'package:react/react.dart' as react;
import 'package:react_testing_library/matchers.dart' show isChecked;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

void main() {
  test('', () {
    // [1] Render the component.
    final result = rtl.render(react.input({'type': 'checkbox'}));

    // [2] Query for relevant nodes to test.
    final checkbox = result.getByRole('checkbox');

    // [3] Interact with the component.
    UserEvent.click(checkbox);

    // [4] Verify the expected result.
    expect(checkbox, isChecked);
  });
}
```

1. [Migration Guide for Component Rendering][rendering-migration-guide]
1. Migration Guide for Queries
1. Migration Guide for Component Interactions
1. Migration Guide for Expectations


[over-react-test]: https://github.com/Workiva/over_react_test
[implementation-details]: https://kentcdodds.com/blog/testing-implementation-details
[rendering-migration-guide]: https://github.com/Workiva/react_testing_library/blob/master/doc/migration_guides/component_rendering.md

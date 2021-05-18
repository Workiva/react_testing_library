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


[over-react-test]: https://github.com/Workiva/over_react_test
[implementation-details]: https://kentcdodds.com/blog/testing-implementation-details

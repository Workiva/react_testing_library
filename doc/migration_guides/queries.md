# Migration Guide for Queries

* __[Background](#background)__
* __[Best Practices](#best-practices)__
    * __[Priority](#priority)__
* __[Migration Process](#migration-process)__
* __[Examples](#examples)__
    * __[ByRole](#by-role)__

## Background

## Best Practices

### Priority

Based on the [Guiding Principles][guiding-principles] of React Testing Library, your test should resemble how users 
interact with your code (component, page, etc.) as much as possible. 

With this in mind, the following is the recommended order of priority for queries:

1. Queries Accessible to Everyone
    1. `getByRole`
    1. `getByLabelText`
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


## Examples


[guiding-principles]:[https://testing-library.com/docs/guiding-principles/]
[query-priority]:[https://testing-library.com/docs/queries/about/#priority]

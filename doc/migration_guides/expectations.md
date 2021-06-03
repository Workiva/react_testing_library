# Migrating Test Expectations

## Philosophy

### Best Practice

When it comes to the expectation statements in a migration, React Testing Library's (RTL) philosophy becomes even more important.

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://testing-library.com/docs/guiding-principles)
>
> \- Kent C. Dodds

A key take away from that quote is [not to test implementation details][implementation-details-blog]. This is important here because RTL is opinionated towards avoiding the implementation details, making the right thing the easy thing. On the flip side, if we need to refactor tests that historically deviated from this path, writing those tests become a lot more challenging.

### Don't Test Implementation Details

When it's said not to test implementation details, what does that mean? Dodds [addresses][implementation-details-blog-implementation-explanation] that question. His short answer is:

> Implementation details are things which users of your code will not typically use, see, or even know about.

That means implementation details can be somewhat insidious. It's not just about avoiding using certain getters or patterns, but also about understanding what an API can give to a user and only testing those possibilities. That being said, within the scope of migrating from OverReact Test, there are some code smells that may indicate implementation details are being tested. Most of them stem from grabbing the component instance itself and utilizing the class APIs to check data on that instance (props, state, children, etc).

If you want to dive deeper into what imeplementation details are, Kent's [blog post][implementation-details-blog] is a great source.

### Use Case Testing

The goal of a test is to increase confidence that your software works like expected. As Dodds [notes][use-case-testing-react], it needs to work like expected for two groups:

- Other programmers who will use the code
- Users of the application

These two groups make up the actual users of the code. RTL is opionated is towards verifying [use cases][use-case-testing] for those two groups, as opposed to traditional line or branch [code coverage][code-coverage]. In Kent's blog post he articulates more, but the tl;dr is that a line of code supports a use case for the API and the lines should be tested by exercising their use cases.

This is important going into migrating test expectations because the question will arise whether a test is asserting something that should even be asserted under this testing mentality. The implications are that if an assertion is only on an implementation detail (not to be confused with the effect of implementation detail), the path forward is not a simple API switch. From that point, there are a few possibilities. Below is a decision tree meant to help determine the best path forward.

<img alt='migration decision tree' src='./images/migration_decision_tree7.png' />

The outcomes are one of the following:

1. **A test is not verifying implementation details.** From there, the migration should be a relatively simple API swap.
1. **A test _is_ verifying implementation details but in an attempt to verify a use case.** From here, the test should be refactored to assert outcomes that a user would notice as opposed to the underlying implementation. For example, checking that a the document shows the UI expected as opposed to checking the state responsible for showing that UI. This is likely the most common case when migrating from OverReact Test.
1. **A test _is_ verifying implementation details for the sake of verifying a specific internal behavior.** In this case, it needs to be decided what value the test is actually adding. It's important to note that testing implemenation details can be considered an anti-pattern, ultimately hurting the codebase. With that in mind, the best path forward is to determine if the test can be reworked to verify a use case. If that use case already has coverage, the test may be able to be removed. There are exceptions to every rule, but those should be rare.

## What this Guide Covers

Given the philosophy of test assertions under RTL, there are two broad sections to this guide:

- Migrating to use case testing. This give examples of tests that are currently testing implementation details and shows how to tweak them to make assertions closer to what a user would experience. Examples of implementation details to be migrated are:
  - checking `.children`
  - verifying prop values
  - asserting a component state
- Migrating to Testing Library matchers. Testing Library has a set of DOM matchers that encourage best practices when asserting a specific condition with the document or DOM nodes.

## Verifying Props

[implementation-details-blog]: https://kentcdodds.com/blog/testing-implementation-details
[implementation-details-blog-implementation-explanation]: https://kentcdodds.com/blog/testing-implementation-details#so-what-are-implementation-details-then
[use-case-testing]: https://kentcdodds.com/blog/how-to-know-what-to-test#code-coverage--use-case-coverage
[use-case-testing-react]: https://kentcdodds.com/blog/how-to-know-what-to-test#how-does-this-apply-to-react
[code-coverage]: https://kentcdodds.com/blog/write-tests#not-too-many

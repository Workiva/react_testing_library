# Migrating Test Expectations

## Verifying Props

## What this Guide Covers

Given the philosophy of test assertions under RTL, there are two broad sections to this guide:

- Migrating to use case testing. This give examples of tests that are currently testing implementation details and shows how to tweak them to make assertions closer to what a user would experience. Examples of implementation details to be migrated are:
  - checking `.children`
  - verifying prop values
  - asserting a component state
- Migrating to Testing Library matchers. Testing Library has a set of DOM matchers that encourage best practices when asserting a specific condition with the document or DOM nodes.

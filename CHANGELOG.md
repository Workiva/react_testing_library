# React Testing Library Changelog

## 2.0.0
* **BREAKING CHANGE**: `UserEvent.*` and `fireEvent[ByName]` will now rethrow uncaught errors that occur in event propagation.
  * This helps surface errors that could otherwise go unnoticed since they aren't printed to the terminal when running tests.
* **BREAKING CHANGE**: Change default query bindings (`get[All]By...`, `find[All]By...`, `query[All]By...`) to be the render result's `baseElement` instead of `container`.
  * This was an unintended deviation from the JS API that prevented access to portals. It is now aligned to match JS behavior.

## 1.1.13
*  (CI-only change) Only check formatting on Dart 2.13.4

## 1.1.12
*  Add default timeout to `waitForElementToBeRemoved`

## 1.1.11
*  Raise the Dart SDK minimum to at least 2.11.0

## 1.1.10
*  Fix state error thrown by calls to `logRoles()` and `.debug()` (bug introduced in 1.1.9)

## 1.1.9
*  Fix `render` swallowing errors on component mount

## 1.1.8
* (CI-only change) Add Dart 2.13.3 to CI matrix

## 1.1.7
*  Fix typing in README example

## 1.1.6
* (CI-only change) Add dependabot

## 1.1.5
* Show a valid minimum version for this library in the README.
* Attempt to fix Dartdoc generation on pub.dev

## 1.1.4
Initial public release of the library.

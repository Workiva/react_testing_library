import {configure, fireEvent} from '@testing-library/react';
import {buildTestingLibraryElementError, buildJsGetElementError} from './_dart-helpers';
import userEvent from '@testing-library/user-event';

// Configure the test id to match what the OverReact ecosystem defaults to.
configure({
  testIdAttribute: 'data-test-id',
  getElementError: buildJsGetElementError,
});

// In order to allow us to interop `fireEvent` as both a function, and an object with function values,
// we need two vars exported so we can `@JS()` annotate each one separately with the type Dart expects.
const fireEventObj = fireEvent;

export * from '@testing-library/react';
export {
  buildTestingLibraryElementError,
  buildJsGetElementError,
  fireEventObj,
  userEvent,
};

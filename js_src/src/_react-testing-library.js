import {configure} from '@testing-library/react';
import {buildTestingLibraryElementError, buildJsGetElementError} from './_dart-helpers';

// Configure the test id to match what the Workiva ecosystem defaults to.
configure({
  testIdAttribute: 'data-test-id',
  getElementError: buildJsGetElementError,
});

export * from '@testing-library/react';
export {
  buildTestingLibraryElementError,
  buildJsGetElementError,
};

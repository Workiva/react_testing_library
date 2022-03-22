// Copyright 2021 Workiva Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import {
  configure,
  fireEvent,
  render as testingLibraryRender,
} from '@testing-library/react';
import { buildJsGetElementError } from './dartHelpers';

import { queries } from './customQueries';

configure({
  getElementError: buildJsGetElementError,
});

// Configure the test id queries to work with OverReact ecosystem's `data-test-id` AND MUI's `data-testid`.

// In order to allow us to interop `fireEvent` as both a function, and an object with function values,
// we need two vars exported so we can `@JS()` annotate each one separately with the type Dart expects.
export const fireEventObj = fireEvent;

export const render = (element, configuration) => {
  return testingLibraryRender(element, {
    queries: { ...queries },
    ...configuration,
  });
};

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { screen, within, queries } from './customQueries';
export { buildJsGetElementError };

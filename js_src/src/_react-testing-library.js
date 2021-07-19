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

import {configure, fireEvent} from '@testing-library/react';
import {buildJsGetElementError} from './_dart-helpers';
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
export {eventMap} from '@testing-library/dom/dist/event-map';
export {
  buildJsGetElementError,
  fireEventObj,
  userEvent,
};

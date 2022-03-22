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
import {render as testingLibraryRender, within as testingLibraryWithin, queries as testingLibraryQueries, buildQueries, queryHelpers} from '@testing-library/react';
import {configure, fireEvent} from '@testing-library/react';
import {buildJsGetElementError} from './_dart-helpers';
import userEvent from '@testing-library/user-event';

configure({
  getElementError: buildJsGetElementError,
});

// Configure the test id queries to work with OverReact ecosystem's `data-test-id` AND MUI's `data-testid`.
const {
  queryAllByTestId: queryAllByTestIdOriginal,
  queryByTestId: queryByTestIdOriginal,
  getAllByTestId: getAllByTestIdOriginal,
  getByTestId: getByTestIdOriginal,
  findAllByTestId: findAllByTestIdOriginal,
  findByTestId: findByTestIdOriginal,
  ...remainingQueries
} = testingLibraryQueries;

const queryAllByTestId = (
  container,
  id,
  options
) => {
  console.log('custom queryAllByTestId');
  return [
    ...queryHelpers.queryAllByAttribute('data-test-id',
      container ?? document.body,
      id,
      options
    ),
    ...queryAllByTestIdOriginal(container ?? document.body, id, options),
  ];
};
const [
  queryByTestIdNew,
  getAllByTestIdNew,
  getByTestIdNew,
  findAllByTestIdNew,
  findByTestIdNew,
] = buildQueries(
  queryAllByTestId,
  function getMultipleError(container, dataTestId) {
    return `Found multiple elements with the data-mui-test attribute of: ${dataTestId}`;
  },
  function getMissingError(container, dataTestId) {
    return `Found no element with the data-mui-test attribute of: ${dataTestId}`;
  }
);

const queryByTestId = (
  container,
  id,
  options
) => {
  const results = [
    queryByTestIdOriginal<T>(container, id, options),
    queryByTestIdNew(container, id),
  ].filter((n) => n);
  return results.length > 1 ? results[0] : null;
};
const getAllByTestId = (
  container,
  id,
  options
) => {
  const results = [];
  const errors = [];

  try {
    results.push(...getAllByTestIdOriginal<T>(container, id, options));
  } catch (e) {
    errors.push(e);
  }

  try {
    results.push(...(getAllByTestIdNew(container, id)));
  } catch (e) {
    errors.push(e);
  }

  if (results.length === 0) {
    throw errors[0];
  }

  return results;
};
const getByTestId = (
  container,
  id,
  options
) => {
  const results = [];
  const errors = [];

  try {
    results.push(getByTestIdOriginal<T>(container, id, options));
  } catch (e) {
    errors.push(e);
  }

  try {
    results.push(getByTestIdNew(container, id));
  } catch (e) {
    errors.push(e);
  }

  if (results.length === 0) {
    throw errors[0];
  }

  return results[0];
};
const findAllByTestId = async (
  container,
  id,
  options
) => {
  const results = [];
  const errors = [];

  try {
    results.push(
      ...(await Promise.any([
        findAllByTestIdOriginal(container, id, options),
        findAllByTestIdNew(container, id),
      ]))
    );
  } catch (e) {
    errors.push(e);
  }

  if (results.length === 0) {
    throw errors[0];
  }

  return results;
};
const findByTestId = async (
  container,
  id,
  options
) => {
  const results = [];
  const errors = [];
  try {
    results.push(await findByTestIdOriginal(container, id, options));
  } catch (e) {
    errors.push(e);
  }

  try {
    results.push(await findByTestIdNew(container, id));
  } catch (e) {
    errors.push(e);
  }

  if (results.length === 0) {
    throw errors[0];
  }

  return results[0];
};

const queries = {
  ...remainingQueries,
  queryAllByTestId,
  queryByTestId,
  getAllByTestId,
  getByTestId,
  findAllByTestId,
  findByTestId,
};

// In order to allow us to interop `fireEvent` as both a function, and an object with function values,
// we need two vars exported so we can `@JS()` annotate each one separately with the type Dart expects.
const fireEventObj = fireEvent;

function render(
  element,
  configuration,
) {
  return testingLibraryRender(element, {
      queries: { ...queries },
      ...configuration
    });
}

const within = (element, queriesToBind) => testingLibraryWithin(element, { ...queries, ...(queriesToBind ?? {}) });

const screen = within(document.body);

export * from '@testing-library/react';
export {eventMap} from '@testing-library/dom/dist/event-map';
export {
  buildJsGetElementError,
  fireEventObj,
  userEvent,
  render,
  screen,
  within,
};

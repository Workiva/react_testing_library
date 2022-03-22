import {
  buildQueries,
  getConfig,
  queries as testingLibraryQueries,
  queryHelpers,
  within as testingLibraryWithin,
} from '@testing-library/react';

const getTestIdAttribute = () => getConfig().testIdAttribute;
const overReactTestIdAttribute = 'data-test-id';
const areTestIdsEqual = () => getTestIdAttribute() === overReactTestIdAttribute;

const getMultipleError = (c, id) => {
  return `Found multiple elements by: [${getTestIdAttribute()}="${id}"]${
    areTestIdsEqual() ? '' : `, [${overReactTestIdAttribute}="${id}"]`
  }`;
};
const getMissingError = (c, id) => {
  return `Unable to find an element by: [${getTestIdAttribute()}="${id}"]${
    areTestIdsEqual() ? '' : `, [${overReactTestIdAttribute}="${id}"]`
  }`;
};

const { queryAllByTestId: testingLibraryQueryAllByTestId } =
  testingLibraryQueries;

const queryAllByTestId = (container, id, options) => {
  return [
    ...(areTestIdsEqual()
      ? []
      : queryHelpers.queryAllByAttribute(
          overReactTestIdAttribute,
          container,
          id,
          options
        )),
    ...testingLibraryQueryAllByTestId(container, id, options),
  ];
};

const [
  queryByTestId,
  getAllByTestId,
  getByTestId,
  findAllByTestId,
  findByTestId,
] = buildQueries(queryAllByTestId, getMultipleError, getMissingError);

export const queries = {
  ...testingLibraryQueries,
  queryAllByTestId,
  queryByTestId,
  getAllByTestId,
  getByTestId,
  findAllByTestId,
  findByTestId,
};

export const within = (element, queriesToBind) =>
  // @ts-ignore
  testingLibraryWithin(element, { ...queries, ...queriesToBind });

let screen = within(document.body);

if (!document.body) {
  // document.body will be `null` before "DOMContentLoaded".
  // wait until `document.body` is available, then set `screen` again.
  document.addEventListener('DOMContentLoaded', function () {
    screen = within(document.body);
  });
}

export { screen };

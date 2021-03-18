// @dart = 2.7

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

/// https://testing-library.com/docs/dom-testing-library/intro
library react_testing_library.src.dom_testing_library;

export 'dom/async/types.dart' show MutationObserverOptions;
export 'dom/async/wait_for.dart' show waitFor, waitForElementToBeRemoved, waitForElementsToBeRemoved;
export 'dom/config/configure.dart' show configure, getConfig;
export 'dom/matches/get_default_normalizer.dart' show getDefaultNormalizer;
export 'dom/pretty_dom.dart' show prettyDOM;
export 'dom/screen.dart' show screen;
export 'dom/within.dart' show within;
// ignore: directives_ordering
export 'dom/top_level_queries.dart'
    show
        getByAltText,
        getAllByAltText,
        queryByAltText,
        queryAllByAltText,
        findByAltText,
        findAllByAltText,
        getByDisplayValue,
        getAllByDisplayValue,
        queryByDisplayValue,
        queryAllByDisplayValue,
        findByDisplayValue,
        findAllByDisplayValue,
        getByLabelText,
        getAllByLabelText,
        queryByLabelText,
        queryAllByLabelText,
        findByLabelText,
        findAllByLabelText,
        getByPlaceholderText,
        getAllByPlaceholderText,
        queryByPlaceholderText,
        queryAllByPlaceholderText,
        findByPlaceholderText,
        findAllByPlaceholderText,
        getByRole,
        getAllByRole,
        queryByRole,
        queryAllByRole,
        findByRole,
        findAllByRole,
        getByText,
        getAllByText,
        queryByText,
        queryAllByText,
        findByText,
        findAllByText,
        getByTestId,
        getAllByTestId,
        queryByTestId,
        queryAllByTestId,
        findByTestId,
        findAllByTestId,
        getByTitle,
        getAllByTitle,
        queryByTitle,
        queryAllByTitle,
        findByTitle,
        findAllByTitle;

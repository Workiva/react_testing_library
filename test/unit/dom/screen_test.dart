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

import 'dart:html';

import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/dom/within.dart' show WithinQueries;
import 'package:test/test.dart';

void main() {
  group('screen', () {
    test('aliases within(document.body)', () {
      final queries = rtl.screen;
      expect(queries, isA<WithinQueries>());
      expect(queries.container, document.body);
    });

    test('exposes all the expected queries', () {
      expect(rtl.screen.getByAltText, isA<Function>(), reason: 'getByAltText');
      expect(rtl.screen.getAllByAltText, isA<Function>(), reason: 'getAllByAltText');
      expect(rtl.screen.queryByAltText, isA<Function>(), reason: 'queryByAltText');
      expect(rtl.screen.queryAllByAltText, isA<Function>(), reason: 'queryAllByAltText');
      expect(rtl.screen.findByAltText, isA<Function>(), reason: 'findByAltText');
      expect(rtl.screen.findAllByAltText, isA<Function>(), reason: 'findAllByAltText');
      expect(rtl.screen.getByDisplayValue, isA<Function>(), reason: 'getByDisplayValue');
      expect(rtl.screen.getAllByDisplayValue, isA<Function>(), reason: 'getAllByDisplayValue');
      expect(rtl.screen.queryByDisplayValue, isA<Function>(), reason: 'queryByDisplayValue');
      expect(rtl.screen.queryAllByDisplayValue, isA<Function>(), reason: 'queryAllByDisplayValue');
      expect(rtl.screen.findByDisplayValue, isA<Function>(), reason: 'findByDisplayValue');
      expect(rtl.screen.findAllByDisplayValue, isA<Function>(), reason: 'findAllByDisplayValue');
      expect(rtl.screen.getByLabelText, isA<Function>(), reason: 'getByLabelText');
      expect(rtl.screen.getAllByLabelText, isA<Function>(), reason: 'getAllByLabelText');
      expect(rtl.screen.queryByLabelText, isA<Function>(), reason: 'queryByLabelText');
      expect(rtl.screen.queryAllByLabelText, isA<Function>(), reason: 'queryAllByLabelText');
      expect(rtl.screen.findByLabelText, isA<Function>(), reason: 'findByLabelText');
      expect(rtl.screen.findAllByLabelText, isA<Function>(), reason: 'findAllByLabelText');
      expect(rtl.screen.getByPlaceholderText, isA<Function>(), reason: 'getByPlaceholderText');
      expect(rtl.screen.getAllByPlaceholderText, isA<Function>(), reason: 'getAllByPlaceholderText');
      expect(rtl.screen.queryByPlaceholderText, isA<Function>(), reason: 'queryByPlaceholderText');
      expect(rtl.screen.queryAllByPlaceholderText, isA<Function>(), reason: 'queryAllByPlaceholderText');
      expect(rtl.screen.findByPlaceholderText, isA<Function>(), reason: 'findByPlaceholderText');
      expect(rtl.screen.findAllByPlaceholderText, isA<Function>(), reason: 'findAllByPlaceholderText');
      expect(rtl.screen.getByRole, isA<Function>(), reason: 'getByRole');
      expect(rtl.screen.getAllByRole, isA<Function>(), reason: 'getAllByRole');
      expect(rtl.screen.queryByRole, isA<Function>(), reason: 'queryByRole');
      expect(rtl.screen.queryAllByRole, isA<Function>(), reason: 'queryAllByRole');
      expect(rtl.screen.findByRole, isA<Function>(), reason: 'findByRole');
      expect(rtl.screen.findAllByRole, isA<Function>(), reason: 'findAllByRole');
      expect(rtl.screen.getByTestId, isA<Function>(), reason: 'getByTestId');
      expect(rtl.screen.getAllByTestId, isA<Function>(), reason: 'getAllByTestId');
      expect(rtl.screen.queryByTestId, isA<Function>(), reason: 'queryByTestId');
      expect(rtl.screen.queryAllByTestId, isA<Function>(), reason: 'queryAllByTestId');
      expect(rtl.screen.findByTestId, isA<Function>(), reason: 'findByTestId');
      expect(rtl.screen.findAllByTestId, isA<Function>(), reason: 'findAllByTestId');
      expect(rtl.screen.getByText, isA<Function>(), reason: 'getByText');
      expect(rtl.screen.getAllByText, isA<Function>(), reason: 'getAllByText');
      expect(rtl.screen.queryByText, isA<Function>(), reason: 'queryByText');
      expect(rtl.screen.queryAllByText, isA<Function>(), reason: 'queryAllByText');
      expect(rtl.screen.findByText, isA<Function>(), reason: 'findByText');
      expect(rtl.screen.findAllByText, isA<Function>(), reason: 'findAllByText');
      expect(rtl.screen.getByTitle, isA<Function>(), reason: 'getByTitle');
      expect(rtl.screen.getAllByTitle, isA<Function>(), reason: 'getAllByTitle');
      expect(rtl.screen.queryByTitle, isA<Function>(), reason: 'queryByTitle');
      expect(rtl.screen.queryAllByTitle, isA<Function>(), reason: 'queryAllByTitle');
      expect(rtl.screen.findByTitle, isA<Function>(), reason: 'findByTitle');
      expect(rtl.screen.findAllByTitle, isA<Function>(), reason: 'findAllByTitle');
    });
  });
}

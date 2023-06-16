
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
import 'package:test/test.dart';

import '../util/enums.dart';
import '../util/init.dart';
import '../util/matchers.dart';
import '../util/over_react_stubs.dart';
import '../util/rendering.dart';
import 'queries/shared/text_match_type_parsing_tests.dart' show testTextMatchTypes;

void main() {
  group('top level API', () {
    initConfigForInternalTesting();

    test('exposes all the expected queries', () {
      expect(rtl.getByAltText, isA<Function>(), reason: 'getByAltText');
      expect(rtl.getAllByAltText, isA<Function>(), reason: 'getAllByAltText');
      expect(rtl.queryByAltText, isA<Function>(), reason: 'queryByAltText');
      expect(rtl.queryAllByAltText, isA<Function>(), reason: 'queryAllByAltText');
      expect(rtl.findByAltText, isA<Function>(), reason: 'findByAltText');
      expect(rtl.findAllByAltText, isA<Function>(), reason: 'findAllByAltText');
      expect(rtl.getByDisplayValue, isA<Function>(), reason: 'getByDisplayValue');
      expect(rtl.getAllByDisplayValue, isA<Function>(), reason: 'getAllByDisplayValue');
      expect(rtl.queryByDisplayValue, isA<Function>(), reason: 'queryByDisplayValue');
      expect(rtl.queryAllByDisplayValue, isA<Function>(), reason: 'queryAllByDisplayValue');
      expect(rtl.findByDisplayValue, isA<Function>(), reason: 'findByDisplayValue');
      expect(rtl.findAllByDisplayValue, isA<Function>(), reason: 'findAllByDisplayValue');
      expect(rtl.getByLabelText, isA<Function>(), reason: 'getByLabelText');
      expect(rtl.getAllByLabelText, isA<Function>(), reason: 'getAllByLabelText');
      expect(rtl.queryByLabelText, isA<Function>(), reason: 'queryByLabelText');
      expect(rtl.queryAllByLabelText, isA<Function>(), reason: 'queryAllByLabelText');
      expect(rtl.findByLabelText, isA<Function>(), reason: 'findByLabelText');
      expect(rtl.findAllByLabelText, isA<Function>(), reason: 'findAllByLabelText');
      expect(rtl.getByPlaceholderText, isA<Function>(), reason: 'getByPlaceholderText');
      expect(rtl.getAllByPlaceholderText, isA<Function>(), reason: 'getAllByPlaceholderText');
      expect(rtl.queryByPlaceholderText, isA<Function>(), reason: 'queryByPlaceholderText');
      expect(rtl.queryAllByPlaceholderText, isA<Function>(), reason: 'queryAllByPlaceholderText');
      expect(rtl.findByPlaceholderText, isA<Function>(), reason: 'findByPlaceholderText');
      expect(rtl.findAllByPlaceholderText, isA<Function>(), reason: 'findAllByPlaceholderText');
      expect(rtl.getByRole, isA<Function>(), reason: 'getByRole');
      expect(rtl.getAllByRole, isA<Function>(), reason: 'getAllByRole');
      expect(rtl.queryByRole, isA<Function>(), reason: 'queryByRole');
      expect(rtl.queryAllByRole, isA<Function>(), reason: 'queryAllByRole');
      expect(rtl.findByRole, isA<Function>(), reason: 'findByRole');
      expect(rtl.findAllByRole, isA<Function>(), reason: 'findAllByRole');
      expect(rtl.getByTestId, isA<Function>(), reason: 'getByTestId');
      expect(rtl.getAllByTestId, isA<Function>(), reason: 'getAllByTestId');
      expect(rtl.queryByTestId, isA<Function>(), reason: 'queryByTestId');
      expect(rtl.queryAllByTestId, isA<Function>(), reason: 'queryAllByTestId');
      expect(rtl.findByTestId, isA<Function>(), reason: 'findByTestId');
      expect(rtl.findAllByTestId, isA<Function>(), reason: 'findAllByTestId');
      expect(rtl.getByText, isA<Function>(), reason: 'getByText');
      expect(rtl.getAllByText, isA<Function>(), reason: 'getAllByText');
      expect(rtl.queryByText, isA<Function>(), reason: 'queryByText');
      expect(rtl.queryAllByText, isA<Function>(), reason: 'queryAllByText');
      expect(rtl.findByText, isA<Function>(), reason: 'findByText');
      expect(rtl.findAllByText, isA<Function>(), reason: 'findAllByText');
      expect(rtl.getByTitle, isA<Function>(), reason: 'getByTitle');
      expect(rtl.getAllByTitle, isA<Function>(), reason: 'getAllByTitle');
      expect(rtl.queryByTitle, isA<Function>(), reason: 'queryByTitle');
      expect(rtl.queryAllByTitle, isA<Function>(), reason: 'queryAllByTitle');
      expect(rtl.findByTitle, isA<Function>(), reason: 'findByTitle');
      expect(rtl.findAllByTitle, isA<Function>(), reason: 'findAllByTitle');
    });

    group('contains queries that can be scoped to the specified container', () {
      const scopeName = 'top level';
      Node container;
      String expectedPrettyDom;

      Function _renderForQuery(
        Function query, {
        bool testAsyncQuery = false,
        bool? renderMultipleElsMatchingQuery,
      }) {
        final elsForQuerying =
            elementsForQuerying(scopeName, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery);
        final els = testAsyncQuery
            ? DelayedRenderOf({'childrenToRenderAfterDelay': elsForQuerying})
            : elsForQuerying;
        final view = rtl.render(els);
        container = view.container;
        expectedPrettyDom = rtl.prettyDOM(container);

        if (testAsyncQuery) {
          final delayedRenderOfRootNode = querySelector('[$defaultTestIdKey="delayed-render-of-root"]')!;
          expect(delayedRenderOfRootNode, isNotNull,
              reason:
                  'Async queries should be tested on DOM wrapped by / controlled by the DelayedRenderOf component.');
          expect(delayedRenderOfRootNode.children, isEmpty,
              reason: 'Async queries should be tested with DOM that appears only after the query is called.');

          // If we're testing an async query, we'll set expectedPrettyDom using the
          // DelayedRenderOf wrapper that async tests use, but with the `delay` hardcoded
          // to zero so we can see what DOM to expect when the future completes in the
          // actual query test.
          final tempRenderResult =
              rtl.render(cloneElement(view.renderedElement, {'delay': Duration.zero}), autoTearDown: false);
          expectedPrettyDom = rtl.prettyDOM(tempRenderResult.container);
          tempRenderResult.unmount();
          tempRenderResult.container?.remove();
        }

        return query;
      }

      testTextMatchTypes(
        QueryType.AltText,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByAltText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByAltText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByAltText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryAllByAltText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByAltText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByAltText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByAltText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByAltText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByAltText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByAltText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByAltText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByAltText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'alt text: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.DisplayValue,
        textMatchArgName: TextMatchArgName.value,
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByDisplayValue, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByDisplayValue': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.queryAllByDisplayValue,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByDisplayValue, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByDisplayValue, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByDisplayValue': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByDisplayValue,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByDisplayValue': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByDisplayValue,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'display value: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.LabelText,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByLabelText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByLabelText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByLabelText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryAllByLabelText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByLabelText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByLabelText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByLabelText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByLabelText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByLabelText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByLabelText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByLabelText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByLabelText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'label with the text of: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.PlaceholderText,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByPlaceholderText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.queryByPlaceholderText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByPlaceholderText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(
              rtl.queryAllByPlaceholderText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByPlaceholderText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByPlaceholderText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByPlaceholderText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.getAllByPlaceholderText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByPlaceholderText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByPlaceholderText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByPlaceholderText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(
              rtl.findAllByPlaceholderText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery,
              testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'placeholder text of: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.Role,
        textMatchArgName: TextMatchArgName.role,
        textMatchArgSupportsFuzzyMatching: false, // exact = false is not supported by role queries
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryAllByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByRole': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByRole,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByRole': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByRole,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'with the role "$valueNotFoundPlaceholder"',
      );

      testTextMatchTypes(
        QueryType.Role,
        textMatchArgName: TextMatchArgName.name,
        textMatchArgSupportsFuzzyMatching: false, // exact = false is not supported by role queries
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryAllByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByRole': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByRole, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByRole': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByRole,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByRole': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByRole,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'with the role "$validRoleInDom" and name "$valueNotFoundPlaceholder"',
      );

      testTextMatchTypes(
        QueryType.TestId,
        textMatchArgName: TextMatchArgName.testId,
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByTestId': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByTestId, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByTestId': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryAllByTestId, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByTestId': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByTestId, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByTestId': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByTestId, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByTestId': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByTestId,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByTestId': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByTestId,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'an element by: [data-test-id="$valueNotFoundPlaceholder"',
      );

      testTextMatchTypes(
        QueryType.Text,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: '$scopeName single byText match',
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryAllByText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByText': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByText, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByText': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByText,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'an element with the text: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.Title,
        textMatchArgName: TextMatchArgName.title,
        queryShouldMatchOn: scopeName,
        getContainerForTopLevelQueries: () => container,
        topLevelQueryQueriesByName: {
          'queryByTitle': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryByTitle, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'queryAllByTitle': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.queryAllByTitle, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelGetQueriesByName: {
          'getByTitle': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getByTitle, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
          'getAllByTitle': ({renderMultipleElsMatchingQuery}) =>
              _renderForQuery(rtl.getAllByTitle, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery),
        },
        topLevelFindQueriesByName: {
          'findByTitle': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findByTitle,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
          'findAllByTitle': ({renderMultipleElsMatchingQuery}) => _renderForQuery(rtl.findAllByTitle,
              renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery, testAsyncQuery: true),
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'title: $valueNotFoundPlaceholder',
      );
    });
  });
}

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

// ignore_for_file: invalid_use_of_protected_member, await_only_futures
import 'dart:html';

import 'package:meta/meta.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import 'package:react_testing_library/src/dom/pretty_dom.dart' show prettyDOM;
import 'package:react_testing_library/src/dom/scoped_queries.dart' show ScopedQueries;

import '../../../util/enums.dart';
import '../../../util/init.dart';
import '../../../util/matchers.dart';
import '../../../util/over_react_stubs.dart';
import '../../../util/rendering.dart';
import 'text_match_type_parsing_tests.dart';

class ScopedQueriesTestWrapper {
  ScopedQueriesTestWrapper(this.queries, [rtl.RenderResult? renderResult])
      : renderResult = renderResult ?? queries as rtl.RenderResult;

  final ScopedQueries queries;
  final rtl.RenderResult renderResult;
}

@isTestGroup
void hasQueriesScopedTo(
    String scopeName,
    ScopedQueriesTestWrapper Function(String scopeName, {bool? testAsyncQuery, bool? renderMultipleElsMatchingQuery})
        getWrapper,
    {bool isGloballyScoped = true}) {
  group('$scopeName:', () {
    late String expectedPrettyDom;

    initConfigForInternalTesting();

    ScopedQueries renderAndGetQueries({
      bool testAsyncQuery = false,
      bool? renderMultipleElsMatchingQuery,
    }) {
      rtl.RenderResult renderResult;
      Node getQueryContainer(rtl.RenderResult result) => isGloballyScoped ? result.baseElement : result.container;

      if (testAsyncQuery) {
        // Create a temp baseline result that can be cloned but removed
        // before capturing the DOM
        final tmpBaselineRenderResult = getWrapper(scopeName,
                testAsyncQuery: testAsyncQuery, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
            .renderResult;

        final delayedRenderOfRootNode = querySelector('[$defaultTestIdKey="delayed-render-of-root"]')!;
        expect(delayedRenderOfRootNode, isNotNull,
            reason: 'Async queries should be tested on DOM wrapped by / controlled by the DelayedRenderOf component.');
        expect(delayedRenderOfRootNode.children, isEmpty,
            reason: 'Async queries should be tested with DOM that appears only after the query is called.');

        // If we're testing an async query, we'll set expectedPrettyDom using the
        // DelayedRenderOf wrapper that async tests use, but with the `delay` hardcoded
        // to zero so we can see what DOM to expect when the future completes in the
        // actual query test.
        final tempRenderResult = rtl.render(
            cloneElement(tmpBaselineRenderResult.renderedElement, {'delay': Duration.zero}),
            autoTearDown: false);

        // Remove the extraneous node because otherwise, there will be an extra
        // render result container when capturing the DOM snapshot
        tmpBaselineRenderResult.unmount();

        expectedPrettyDom = prettyDOM(getQueryContainer(tempRenderResult));
        tempRenderResult.unmount();
        tempRenderResult.container.remove();
      }

      // Only render this after the async snapshot is taken to ensure
      // no extra nodes are in the snapshot
      final wrapper = getWrapper(scopeName,
          testAsyncQuery: testAsyncQuery, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery);

      renderResult = wrapper.renderResult;

      if (!testAsyncQuery) {
        expectedPrettyDom = prettyDOM(getQueryContainer(renderResult));
      }

      return wrapper.queries;
    }

    test('exposes all the expected queries', () {
      final queries = renderAndGetQueries();

      expect(queries.getByAltText, isA<Function>(), reason: 'getByAltText');
      expect(queries.getAllByAltText, isA<Function>(), reason: 'getAllByAltText');
      expect(queries.queryByAltText, isA<Function>(), reason: 'queryByAltText');
      expect(queries.queryAllByAltText, isA<Function>(), reason: 'queryAllByAltText');
      expect(queries.findByAltText, isA<Function>(), reason: 'findByAltText');
      expect(queries.findAllByAltText, isA<Function>(), reason: 'findAllByAltText');
      expect(queries.getByDisplayValue, isA<Function>(), reason: 'getByDisplayValue');
      expect(queries.getAllByDisplayValue, isA<Function>(), reason: 'getAllByDisplayValue');
      expect(queries.queryByDisplayValue, isA<Function>(), reason: 'queryByDisplayValue');
      expect(queries.queryAllByDisplayValue, isA<Function>(), reason: 'queryAllByDisplayValue');
      expect(queries.findByDisplayValue, isA<Function>(), reason: 'findByDisplayValue');
      expect(queries.findAllByDisplayValue, isA<Function>(), reason: 'findAllByDisplayValue');
      expect(queries.getByLabelText, isA<Function>(), reason: 'getByLabelText');
      expect(queries.getAllByLabelText, isA<Function>(), reason: 'getAllByLabelText');
      expect(queries.queryByLabelText, isA<Function>(), reason: 'queryByLabelText');
      expect(queries.queryAllByLabelText, isA<Function>(), reason: 'queryAllByLabelText');
      expect(queries.findByLabelText, isA<Function>(), reason: 'findByLabelText');
      expect(queries.findAllByLabelText, isA<Function>(), reason: 'findAllByLabelText');
      expect(queries.getByPlaceholderText, isA<Function>(), reason: 'getByPlaceholderText');
      expect(queries.getAllByPlaceholderText, isA<Function>(), reason: 'getAllByPlaceholderText');
      expect(queries.queryByPlaceholderText, isA<Function>(), reason: 'queryByPlaceholderText');
      expect(queries.queryAllByPlaceholderText, isA<Function>(), reason: 'queryAllByPlaceholderText');
      expect(queries.findByPlaceholderText, isA<Function>(), reason: 'findByPlaceholderText');
      expect(queries.findAllByPlaceholderText, isA<Function>(), reason: 'findAllByPlaceholderText');
      expect(queries.getByRole, isA<Function>(), reason: 'getByRole');
      expect(queries.getAllByRole, isA<Function>(), reason: 'getAllByRole');
      expect(queries.queryByRole, isA<Function>(), reason: 'queryByRole');
      expect(queries.queryAllByRole, isA<Function>(), reason: 'queryAllByRole');
      expect(queries.findByRole, isA<Function>(), reason: 'findByRole');
      expect(queries.findAllByRole, isA<Function>(), reason: 'findAllByRole');
      expect(queries.getByTestId, isA<Function>(), reason: 'getByTestId');
      expect(queries.getAllByTestId, isA<Function>(), reason: 'getAllByTestId');
      expect(queries.queryByTestId, isA<Function>(), reason: 'queryByTestId');
      expect(queries.queryAllByTestId, isA<Function>(), reason: 'queryAllByTestId');
      expect(queries.findByTestId, isA<Function>(), reason: 'findByTestId');
      expect(queries.findAllByTestId, isA<Function>(), reason: 'findAllByTestId');
      expect(queries.getByText, isA<Function>(), reason: 'getByText');
      expect(queries.getAllByText, isA<Function>(), reason: 'getAllByText');
      expect(queries.queryByText, isA<Function>(), reason: 'queryByText');
      expect(queries.queryAllByText, isA<Function>(), reason: 'queryAllByText');
      expect(queries.findByText, isA<Function>(), reason: 'findByText');
      expect(queries.findAllByText, isA<Function>(), reason: 'findAllByText');
      expect(queries.getByTitle, isA<Function>(), reason: 'getByTitle');
      expect(queries.getAllByTitle, isA<Function>(), reason: 'getAllByTitle');
      expect(queries.queryByTitle, isA<Function>(), reason: 'queryByTitle');
      expect(queries.queryAllByTitle, isA<Function>(), reason: 'queryAllByTitle');
      expect(queries.findByTitle, isA<Function>(), reason: 'findByTitle');
      expect(queries.findAllByTitle, isA<Function>(), reason: 'findAllByTitle');
    });

    group('', () {
      testTextMatchTypes(
        QueryType.AltText,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByAltText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByAltText,
          'queryAllByAltText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryAllByAltText,
        },
        scopedGetQueriesByName: {
          'getByAltText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByAltText,
          'getAllByAltText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByAltText,
        },
        scopedFindQueriesByName: {
          'findByAltText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByAltText,
          'findAllByAltText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByAltText,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'alt text: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.DisplayValue,
        textMatchArgName: TextMatchArgName.value,
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByDisplayValue,
          'queryAllByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .queryAllByDisplayValue,
        },
        scopedGetQueriesByName: {
          'getByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByDisplayValue,
          'getAllByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByDisplayValue,
        },
        scopedFindQueriesByName: {
          'findByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByDisplayValue,
          'findAllByDisplayValue': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByDisplayValue,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'display value: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.LabelText,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByLabelText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByLabelText,
          'queryAllByLabelText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryAllByLabelText,
        },
        scopedGetQueriesByName: {
          'getByLabelText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByLabelText,
          'getAllByLabelText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByLabelText,
        },
        scopedFindQueriesByName: {
          'findByLabelText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByLabelText,
          'findAllByLabelText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByLabelText,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'label with the text of: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.PlaceholderText,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByPlaceholderText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .queryByPlaceholderText,
          'queryAllByPlaceholderText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .queryAllByPlaceholderText,
        },
        scopedGetQueriesByName: {
          'getByPlaceholderText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByPlaceholderText,
          'getAllByPlaceholderText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .getAllByPlaceholderText,
        },
        scopedFindQueriesByName: {
          'findByPlaceholderText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByPlaceholderText,
          'findAllByPlaceholderText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByPlaceholderText,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'placeholder text of: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.Role,
        textMatchArgName: TextMatchArgName.role,
        textMatchArgSupportsFuzzyMatching: false, // exact = false is not supported by role queries
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByRole,
          'queryAllByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryAllByRole,
        },
        scopedGetQueriesByName: {
          'getByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByRole,
          'getAllByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByRole,
        },
        scopedFindQueriesByName: {
          'findByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByRole,
          'findAllByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByRole,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'with the role "$valueNotFoundPlaceholder"',
      );

      testTextMatchTypes(
        QueryType.Role,
        textMatchArgName: TextMatchArgName.name,
        textMatchArgSupportsFuzzyMatching: false, // exact = false is not supported by role queries
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByRole,
          'queryAllByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryAllByRole,
        },
        scopedGetQueriesByName: {
          'getByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByRole,
          'getAllByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByRole,
        },
        scopedFindQueriesByName: {
          'findByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByRole,
          'findAllByRole': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByRole,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'with the role "$validRoleInDom" and name "$valueNotFoundPlaceholder"',
      );

      testTextMatchTypes(
        QueryType.TestId,
        textMatchArgName: TextMatchArgName.testId,
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByTestId': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByTestId,
          'queryAllByTestId': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryAllByTestId,
        },
        scopedGetQueriesByName: {
          'getByTestId': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByTestId,
          'getAllByTestId': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByTestId,
        },
        scopedFindQueriesByName: {
          'findByTestId': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByTestId,
          'findAllByTestId': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByTestId,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'an element by: [data-test-id="$valueNotFoundPlaceholder"',
      );

      testTextMatchTypes(
        QueryType.Text,
        textMatchArgName: TextMatchArgName.text,
        queryShouldMatchOn: '$scopeName single byText match',
        scopedQueryQueriesByName: {
          'queryByText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByText,
          'queryAllByText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryAllByText,
        },
        scopedGetQueriesByName: {
          'getByText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByText,
          'getAllByText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByText,
        },
        scopedFindQueriesByName: {
          'findByText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByText,
          'findAllByText': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByText,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'an element with the text: $valueNotFoundPlaceholder',
      );

      testTextMatchTypes(
        QueryType.Title,
        textMatchArgName: TextMatchArgName.title,
        queryShouldMatchOn: scopeName,
        scopedQueryQueriesByName: {
          'queryByTitle': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryByTitle,
          'queryAllByTitle': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).queryAllByTitle,
        },
        scopedGetQueriesByName: {
          'getByTitle': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getByTitle,
          'getAllByTitle': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery).getAllByTitle,
        },
        scopedFindQueriesByName: {
          'findByTitle': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findByTitle,
          'findAllByTitle': ({renderMultipleElsMatchingQuery}) =>
              renderAndGetQueries(testAsyncQuery: true, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery)
                  .findAllByTitle,
        },
        getExpectedPrettyDom: () => expectedPrettyDom,
        failureSnapshotPattern: 'title: $valueNotFoundPlaceholder',
      );
    });

    test('limiting the scope of the query as expected', () {
      final outOfScopeElement = DivElement()..text = 'out-of-scope';
      document.body!.append(outOfScopeElement);
      addTearDown(outOfScopeElement.remove);

      final queries = renderAndGetQueries();
      if (queries.getContainerForScope() != document.body) {
        expect(queries.queryByText('out-of-scope'), isNull,
            reason: 'The scoped query should not return elements that are not found within the scoped container.');
      } else {
        expect(queries.queryByText('out-of-scope'), isNotNull,
            reason: 'The screen query should return elements that are found within the document.');
      }
    });
  });
}

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

import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import '../dom/queries/shared/scoped_queries_tests.dart';
import '../util/rendering.dart';
import '../util/shadow_dom.dart';

void main() {
  group('within(<container>)', () {
    group('returns an object with queries scoped to', () {
      hasQueriesScopedTo('<container>', (
        scopeName, {
        testAsyncQuery = false,
        renderMultipleElsMatchingQuery,
      }) {
        final elsForQuerying =
            elementsForQuerying(scopeName, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery);
        final els = testAsyncQuery
            // TODO: Remove ignore once we stop supporting Dart SDK 2.7.x
            // ignore: unnecessary_cast
            ? DelayedRenderOf({'childrenToRenderAfterDelay': elsForQuerying}) as ReactElement
            : elsForQuerying;
        final view = rtl.render(els);
        final queries = rtl.within(view.container);
        return ScopedQueriesTestWrapper(queries, view);
      });
    });

    test('supports querying within a shadowRoot', () {
      final elsForQuerying = elementsForQuerying('<container>');
      final view = rtl.render(elsForQuerying);
      final nodeWithShadowRoot = view.getByTestId(nodeWithShadowRootDefaultTestId);
      expect(rtl.within(nodeWithShadowRoot.shadowRoot).getByRole('button'), isA<ButtonElement>());
    });
  });
}

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

import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import '../dom/queries/shared/scoped_queries_tests.dart';
import '../util/rendering.dart';

main() {
  group('within(<container>)', () {
    group('returns an object with queries scoped to', () {
      hasQueriesScopedTo('<container>', (
        scopeName, {
        bool testAsyncQuery = false,
        bool renderMultipleElsMatchingQuery,
      }) {
        final elsForQuerying =
            elementsForQuerying(scopeName, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery);
        final els = testAsyncQuery ? DelayedRenderOf({'childrenToRenderAfterDelay': elsForQuerying}) : elsForQuerying;
        final _renderResult = rtl.render(els);
        final queries = rtl.within(_renderResult.container);
        return ScopedQueriesTestWrapper(queries, _renderResult);
      });
    });
  });
}

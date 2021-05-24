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

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/util/error_message_utils.dart';
import 'package:test/test.dart';

import '../../util/init.dart';
import '../../util/matchers.dart';

// NOTE: All other tests for the ByText queries are covered by the `testTextMatchTypes()` shared tests.
void main() {
  group('', () {
    initConfigForInternalTesting();

    rtl.RenderResult renderResult;
    tearDown(() {
      renderResult = null;
    });

    group(
        'the selector argument can target a matching testid when more than '
        'one testid is present', () {
      setUp(() {
        renderResult = rtl.render(react.section(
            {},
            react.span({
              'data-test-id': 'testId1 testId2',
            }, 'Testing multiple'),
            react.span({
              'data-test-id': 'single',
            }, 'Testing single')) as ReactElement);
      });

      test('[match]', () {
        expect(renderResult.getByTestId('testId1'), isA<SpanElement>());
        expect(renderResult.getByTestId('testId2'), isA<SpanElement>());
        expect(renderResult.getByTestId('single'), isA<SpanElement>());
        expect(
            renderResult.getByTestId(RegExp('single')), isA<SpanElement>());
      });

      test('[no match]', () {
          expect(
              () => renderResult.getByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [data-test-id="RegExp/(\\s|^)fail(\\s|\$)/"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
    });
  });
}

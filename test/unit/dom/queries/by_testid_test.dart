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
import '../../util/over_react_stubs.dart';

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
              'data-test-id': 'testId1 testId2 testId3',
            }, 'Testing multiple'),
            react.span({
              'data-test-id': 'single',
            }, 'Testing single'),
            react.div({
              'data-test-id': 'testId3 testId4',
            }, 'Testing allBy')) as ReactElement);
      });

      group('getByTestId', () {
        test('[string match]', () {
          expect(renderResult.getByTestId('testId1'), isA<SpanElement>());
          expect(renderResult.getByTestId('testId2'), isA<SpanElement>());
          expect(renderResult.getByTestId('testId4'), isA<DivElement>());
          expect(renderResult.getByTestId('estid2', exact: false),
              isA<SpanElement>());
          expect(renderResult.getByTestId('single'), isA<SpanElement>());
        });

        test('[regex match]', () {
          expect(
              renderResult.getByTestId(RegExp('testId2')), isA<SpanElement>());
          expect(
              renderResult.getByTestId(RegExp('single')), isA<SpanElement>());
        });

        test('[no match]', () {
          expect(
              () => renderResult.getByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(
                    contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('getAllByTestId', () {
        test('[string match]', () {
          expect(renderResult.getAllByTestId('testId3'), hasLength(2));
          expect(renderResult.getAllByTestId('estid3', exact: false),
              hasLength(2));
        });

        test('[regex match]', () {
          expect(renderResult.getAllByTestId(RegExp('testId3')), hasLength(2));
        });

        test('[no match]', () {
          expect(
              () => renderResult.getAllByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(
                    contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('queryByTestId', () {
        test('[string match]', () {
          expect(renderResult.queryByTestId('testId1'), isA<SpanElement>());
          expect(renderResult.queryByTestId('testId2'), isA<SpanElement>());
          expect(renderResult.queryByTestId('estid2', exact: false),
              isA<SpanElement>());
          expect(renderResult.queryByTestId('single'), isA<SpanElement>());
        });

        test('[regex match]', () {
          expect(renderResult.queryByTestId(RegExp('testId2')),
              isA<SpanElement>());
          expect(
              renderResult.queryByTestId(RegExp('single')), isA<SpanElement>());
        });

        test('[no match]', () {
          expect(renderResult.queryByTestId('fail'), isNull);
        });
      });

      group('queryAllByTestId', () {
        test('[string match]', () {
          expect(renderResult.queryAllByTestId('testId3'), hasLength(2));
          expect(renderResult.queryAllByTestId('estid3', exact: false),
              hasLength(2));
        });

        test('[regex match]', () {
          expect(
              renderResult.queryAllByTestId(RegExp('testId3')), hasLength(2));
        });

        test('[no match]', () {
          expect(renderResult.queryAllByTestId('fail'), hasLength(0));
        });
      });

      group('findByTestId', () {
        test('[string match]', () async {
          expect(
              await renderResult.findByTestId('testId1'), isA<SpanElement>());
          expect(
              await renderResult.findByTestId('testId2'), isA<SpanElement>());
          expect(await renderResult.findByTestId('testId4'), isA<DivElement>());
          expect(await renderResult.findByTestId('estid2', exact: false),
              isA<SpanElement>());
          expect(await renderResult.findByTestId('single'), isA<SpanElement>());
        });

        test('[regex match]', () async {
          expect(await renderResult.findByTestId(RegExp('testId2')),
              isA<SpanElement>());
          expect(await renderResult.findByTestId(RegExp('single')),
              isA<SpanElement>());
        });

        test('[no match]', () async {
          expect(
              () => renderResult.findByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(
                    contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('findAllByTestId', () {
        test('[string match]', () async {
          expect(await renderResult.findAllByTestId('testId3'), hasLength(2));
          expect(await renderResult.findAllByTestId('estid3', exact: false),
              hasLength(2));
        });

        test('[regex match]', () async {
          expect(await renderResult.findAllByTestId(RegExp('testId3')),
              hasLength(2));
        });

        test('[no match]', () async {
          expect(
              () => renderResult.findAllByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(
                    contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });
    });
  });
}

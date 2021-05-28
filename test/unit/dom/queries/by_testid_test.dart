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

// NOTE: All other tests for the ByTestId queries are covered by the `testTextMatchTypes()` shared tests.
void main() {
  group('', () {
    initConfigForInternalTesting();

    rtl.RenderResult renderResult;
    tearDown(() {
      renderResult = null;
    });

    group('basic functionality', () {
      setUp(() {
        renderResult = rtl.render(react.section(
            {},
            react.span({
              'data-test-id': 'testId-1',
            }, 'Testing single'),
            react.span({
              'data-test-id': 'testId-2',
            }, 'Testing multiple'),
            react.span({
              'data-test-id': 'testId-2',
            }, 'Testing duplicate')) as ReactElement);
      });

      group('getByTestId', () {
        test('[string match]', () {
          expect(renderResult.getByTestId('testId-1'), isA<SpanElement>());
        });

        test('[regex match]', () {
          expect(renderResult.getByTestId(RegExp('testId-1')), isA<SpanElement>());
        });

        test('[multiple elements error]', () {
          expect(
              () => renderResult.getByTestId('testId-2'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="testId-2"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });

        test('[no match error]', () {
          expect(
              () => renderResult.getByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('getAllByTestId', () {
        test('[string match]', () {
          expect(renderResult.getAllByTestId('testId-2'), hasLength(2));
        });

        test('[regex match]', () {
          expect(renderResult.getAllByTestId(RegExp('testId-2')), hasLength(2));
        });

        test('[no match error]', () {
          expect(
              () => renderResult.getAllByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('queryByTestId', () {
        test('[string match]', () {
          expect(renderResult.queryByTestId('testId-1'), isA<SpanElement>());
        });

        test('[regex match]', () {
          expect(renderResult.queryByTestId(RegExp('testId-1')), isA<SpanElement>());
        });

        test('[multiple elements error]', () {
          expect(
              () => renderResult.queryByTestId('testId-2'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="testId-2"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });

        test('[no match]', () {
          expect(renderResult.queryByTestId('fail'), isNull);
        });
      });

      group('queryAllByTestId', () {
        test('[string match]', () {
          expect(renderResult.queryAllByTestId('testId-2'), hasLength(2));
        });

        test('[regex match]', () {
          expect(renderResult.queryAllByTestId(RegExp('testId-2')), hasLength(2));
        });

        test('[no match error]', () {
          expect(renderResult.queryAllByTestId('fail'), hasLength(0));
        });
      });

      group('findByTestId', () {
        test('[string match]', () async {
          expect(await renderResult.findByTestId('testId-1'), isA<SpanElement>());
        });

        test('[regex match]', () async {
          expect(await renderResult.findByTestId(RegExp('testId-1')), isA<SpanElement>());
        });

        test('[multiple elements error]', () async {
          expect(
              () => renderResult.findByTestId('testId-2'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="testId-2"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });

        test('[no match]', () async {
          expect(
              () => renderResult.findByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('findAllByTestId', () {
        test('[string match]', () async {
          expect(await renderResult.findAllByTestId('testId-2'), hasLength(2));
        });

        test('[regex match]', () async {
          expect(await renderResult.findAllByTestId(RegExp('testId-2')), hasLength(2));
        });

        test('[no match]', () async {
          expect(
              () => renderResult.findAllByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('with the "exact: false" argument', () {
        group('getByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.getByTestId('estid-1', exact: false), isA<SpanElement>());
          });

          test('[non-exact multiple elements error]', () {
            expect(
                () => renderResult.getByTestId('estid-2', exact: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="estid-2"]')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('getAllByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.getAllByTestId('estid-2', exact: false), hasLength(2));
          });
        });

        group('queryByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.queryByTestId('estid-1', exact: false), isA<SpanElement>());
          });

          test('[non-exact multiple elements error]', () {
            expect(
                () => renderResult.queryByTestId('estid-2', exact: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="estid-2"]')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('queryAllByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.queryAllByTestId('estid-2', exact: false), hasLength(2));
          });
        });

        group('findByTestId', () {
          test('[non-exact string match]', () async {
            expect(await renderResult.findByTestId('estid-1', exact: false), isA<SpanElement>());
          });

          test('[non-exact multiple elements error]', () async {
            expect(
                () => renderResult.findByTestId('estid-2', exact: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="estid-2"]')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findAllByTestId', () {
          test('[non-exact string match]', () async {
            expect(await renderResult.findAllByTestId('estid-2', exact: false), hasLength(2));
          });
        });
      });
    });

    group(
        'the testId argument can target a matching testid when more than '
        'one testId is present on the data-test-id attribute', () {
      setUp(() {
        renderResult = rtl.render(react.section(
            {},
            react.span({
              'data-test-id': 'testId-3',
            }, 'Testing multiple'),
            react.span({
              'data-test-id': 'testId-3 testId-2',
            }, 'Testing single'),
            react.span({
              'data-test-id': 'testId-3 testId-2 testId-1',
            }, 'Testing single')) as ReactElement);
      });

      group('getByTestId', () {
        test('[string match]', () {
          expect(renderResult.getByTestId('testId-1'), isA<SpanElement>());
        });

        test('[regex match]', () {
          expect(renderResult.getByTestId(RegExp('testId-1')), isA<SpanElement>());
        });

        test('[multiple elements error]', () {
          expect(
              () => renderResult.getByTestId('testId-3'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="testId-3"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });

        test('[no match error]', () {
          expect(
              () => renderResult.getByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('getAllByTestId', () {
        test('[string match]', () {
          expect(renderResult.getAllByTestId('testId-1'), hasLength(1));
          expect(renderResult.getAllByTestId('testId-2'), hasLength(2));
          expect(renderResult.getAllByTestId('testId-3'), hasLength(3));
        });

        test('[regex match]', () {
          expect(renderResult.getAllByTestId(RegExp('testId-1')), hasLength(1));
          expect(renderResult.getAllByTestId(RegExp('testId-2')), hasLength(2));
          expect(renderResult.getAllByTestId(RegExp('testId-3')), hasLength(3));
        });

        test('[no match error]', () {
          expect(
              () => renderResult.getAllByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('queryByTestId', () {
        test('[string match]', () {
          expect(renderResult.queryByTestId('testId-1'), isA<SpanElement>());
        });

        test('[regex match]', () {
          expect(renderResult.queryByTestId(RegExp('testId-1')), isA<SpanElement>());
        });

        test('[multiple elements error]', () {
          expect(
              () => renderResult.queryByTestId('testId-3'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="testId-3"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });

        test('[no match]', () {
          expect(renderResult.queryByTestId('fail'), isNull);
        });
      });

      group('queryAllByTestId', () {
        test('[string match]', () {
          expect(renderResult.queryAllByTestId('testId-1'), hasLength(1));
          expect(renderResult.queryAllByTestId('testId-2'), hasLength(2));
          expect(renderResult.queryAllByTestId('testId-3'), hasLength(3));
        });

        test('[regex match]', () {
          expect(renderResult.queryAllByTestId(RegExp('testId-1')), hasLength(1));
          expect(renderResult.queryAllByTestId(RegExp('testId-2')), hasLength(2));
          expect(renderResult.queryAllByTestId(RegExp('testId-3')), hasLength(3));
        });

        test('[no match]', () {
          expect(renderResult.queryAllByTestId('fail'), hasLength(0));
        });
      });

      group('findByTestId', () {
        test('[string match]', () async {
          expect(await renderResult.findByTestId('testId-1'), isA<SpanElement>());
        });

        test('[regex match]', () async {
          expect(await renderResult.findByTestId(RegExp('testId-1')), isA<SpanElement>());
        });

        test('[multiple elements error]', () async {
          expect(
              () => renderResult.findByTestId('testId-2'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="testId-2"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });

        test('[no match]', () async {
          expect(
              () => renderResult.findByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('findAllByTestId', () {
        test('[string match]', () async {
          expect(await renderResult.findAllByTestId('testId-1'), hasLength(1));
          expect(await renderResult.findAllByTestId('testId-2'), hasLength(2));
          expect(await renderResult.findAllByTestId('testId-3'), hasLength(3));
        });

        test('[regex match]', () async {
          expect(await renderResult.findAllByTestId(RegExp('testId-1')), hasLength(1));
          expect(await renderResult.findAllByTestId(RegExp('testId-2')), hasLength(2));
          expect(await renderResult.findAllByTestId(RegExp('testId-3')), hasLength(3));
        });

        test('[no match]', () async {
          expect(
              () => renderResult.findAllByTestId('fail'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element by: [$defaultTestIdKey="fail"]')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('with the "exact: false" argument', () {
        group('getByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.getByTestId('estid-1', exact: false), isA<SpanElement>());
          });

          test('[non-exact multiple elements error]', () {
            expect(
                () => renderResult.getByTestId('estid-2', exact: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="estid-2"]')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('getAllByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.getAllByTestId('estid-1', exact: false), hasLength(1));
            expect(renderResult.getAllByTestId('estid-2', exact: false), hasLength(2));
            expect(renderResult.getAllByTestId('estid-3', exact: false), hasLength(3));
          });
        });

        group('queryByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.queryByTestId('estid-1', exact: false), isA<SpanElement>());
          });

          test('[non-exact multiple elements error]', () {
            expect(
                () => renderResult.queryByTestId('estid-2', exact: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="estid-2"]')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('queryAllByTestId', () {
          test('[non-exact string match]', () {
            expect(renderResult.getAllByTestId('estid-1', exact: false), hasLength(1));
            expect(renderResult.getAllByTestId('estid-2', exact: false), hasLength(2));
            expect(renderResult.getAllByTestId('estid-3', exact: false), hasLength(3));
          });
        });

        group('findByTestId', () {
          test('[non-exact string match]', () async {
            expect(await renderResult.findByTestId('estid-1', exact: false), isA<SpanElement>());
          });

          test('[non-exact multiple elements error]', () async {
            expect(
                () => renderResult.findByTestId('estid-2', exact: false),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Found multiple elements by: [$defaultTestIdKey="estid-2"]')),
                  hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findAllByTestId', () {
          test('[non-exact string match]', () async {
            expect(await renderResult.findAllByTestId('estid-1', exact: false), hasLength(1));
            expect(await renderResult.findAllByTestId('estid-2', exact: false), hasLength(2));
            expect(await renderResult.findAllByTestId('estid-3', exact: false), hasLength(3));
          });
        });
      });
    });
  });
}

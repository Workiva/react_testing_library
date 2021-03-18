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
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/util/error_message_utils.dart';
import 'package:test/test.dart';

import '../../util/init.dart';
import '../../util/matchers.dart';

// NOTE: All other tests for the ByText queries are covered by the `testTextMatchTypes()` shared tests.
main() {
  group('', () {
    initConfigForInternalTesting();

    rtl.RenderResult renderResult;
    tearDown(() {
      renderResult = null;
    });

    group(
        'the selector argument can be specified to target only matching '
        'element(s) when more than one has matching text:', () {
      setUp(() {
        renderResult = rtl.render(react.div(
          {},
          react.div(
            {},
            'Foo',
          ),
          react.span(
            {},
            'Foo',
          ),
        ));

        expect(renderResult.queryAllByText('Foo'), hasLength(2));
      });

      group('queryByText', () {
        test('[match]', () {
          expect(renderResult.queryByText('Foo', selector: 'span'), isA<SpanElement>());
        });

        test('[no match]', () {
          expect(renderResult.queryByText('Foo', selector: 'p'), isNull);
        });
      });

      group('queryAllByText', () {
        test('[matches]', () {
          final result = renderResult.queryAllByText('Foo', selector: 'span');
          expect(result, hasLength(1));
          expect(result.single, isA<SpanElement>());
        });

        test('[no matches]', () {
          expect(renderResult.queryAllByText('Foo', selector: 'p'), isEmpty);
        });
      });

      group('getByText', () {
        test('[match]', () {
          expect(renderResult.getByText('Foo', selector: 'span'), isA<SpanElement>());
        });

        test('[no match]', () {
          expect(
              () => renderResult.getByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('getAllByText', () {
        test('[matches]', () {
          final result = renderResult.getAllByText('Foo', selector: 'span');
          expect(result, hasLength(1));
          expect(result.single, isA<SpanElement>());
        });

        test('[no matches]', () {
          expect(
              () => renderResult.getAllByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('findByText', () {
        test('[match]', () async {
          expect(await renderResult.findByText('Foo', selector: 'span'), isA<SpanElement>());
        });

        test('[no match]', () async {
          expect(
              () async => await renderResult.findByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('findAllByText', () {
        test('[matches]', () async {
          final result = await renderResult.findAllByText('Foo', selector: 'span');
          expect(result, hasLength(1));
          expect(result.single, isA<SpanElement>());
        });

        test('[no matches]', () async {
          expect(
              () async => await renderResult.findAllByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });
    });

    group('the ignore argument', () {
      setUp(() {
        renderResult = rtl.render(react.div(
          {},
          react.div(
            {},
            'Foo',
          ),
          react.span(
            {},
            'Foo',
          ),
        ));
      });

      group('can be set to a String query to ignore certain elements matching the selector query:', () {
        group('queryByText', () {
          test('[match]', () {
            expect(renderResult.queryByText('Foo', ignore: 'span'), isA<DivElement>());
          });

          test('[no match]', () {
            expect(renderResult.queryByText('Bar', ignore: 'p'), isNull);
          });
        });

        group('queryAllByText', () {
          test('[matches]', () {
            final result = renderResult.queryAllByText('Foo', ignore: 'span');
            expect(result, hasLength(1));
            expect(result.single, isA<DivElement>());
          });

          test('[no matches]', () {
            expect(renderResult.queryAllByText('Bar', ignore: 'p'), isEmpty);
          });
        });

        group('getByText', () {
          test('[match]', () {
            expect(renderResult.getByText('Foo', ignore: 'span'), isA<DivElement>());
          });

          test('[no match]', () {
            expect(
                () => renderResult.getByText('Bar', ignore: 'p'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('getAllByText', () {
          test('[matches]', () {
            final result = renderResult.getAllByText('Foo', ignore: 'span');
            expect(result, hasLength(1));
            expect(result.single, isA<DivElement>());
          });

          test('[no matches]', () {
            expect(
                () => renderResult.getAllByText('Bar', ignore: 'span'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findByText', () {
          test('[match]', () async {
            expect(await renderResult.findByText('Foo', ignore: 'span'), isA<DivElement>());
          });

          test('[no match]', () async {
            expect(
                () async => await renderResult.findByText('Bar', ignore: 'p'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });

        group('findAllByText', () {
          test('[matches]', () async {
            final result = await renderResult.findAllByText('Foo', ignore: 'span');
            expect(result, hasLength(1));
            expect(result.single, isA<DivElement>());
          });

          test('[no matches]', () async {
            expect(
                () async => await renderResult.findAllByText('Bar', ignore: 'p'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(endsWith(rtl.prettyDOM(renderResult.container))),
                )));
          });
        });
      });
    });
  });
}

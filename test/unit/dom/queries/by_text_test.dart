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

    late rtl.RenderResult view;

    group(
        'the selector argument can be specified to target only matching '
        'element(s) when more than one has matching text:', () {
      setUp(() {
        view = rtl.render(react.div(
          {},
          react.div(
            {},
            'Foo',
          ),
          react.span(
            {},
            'Foo',
          ),
        ) as ReactElement);

        expect(view.queryAllByText('Foo'), hasLength(2));
      });

      group('queryByText', () {
        test('[match]', () {
          expect(view.queryByText('Foo', selector: 'span'), isA<SpanElement>());
        });

        test('[no match]', () {
          expect(view.queryByText('Foo', selector: 'p'), isNull);
        });
      });

      group('queryAllByText', () {
        test('[matches]', () {
          final result = view.queryAllByText('Foo', selector: 'span');
          expect(result, [isA<SpanElement>()]);
        });

        test('[no matches]', () {
          expect(view.queryAllByText('Foo', selector: 'p'), isEmpty);
        });
      });

      group('getByText', () {
        test('[match]', () {
          expect(view.getByText('Foo', selector: 'span'), isA<SpanElement>());
        });

        test('[no match]', () {
          expect(
              () => view.getByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });

      group('getAllByText', () {
        test('[matches]', () {
          final result = view.getAllByText('Foo', selector: 'span');
          expect(result, [isA<SpanElement>()]);
        });

        test('[no matches]', () {
          expect(
              () => view.getAllByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });

      group('findByText', () {
        test('[match]', () async {
          expect(await view.findByText('Foo', selector: 'span'), isA<SpanElement>());
        });

        test('[no match]', () async {
          expect(
              () => view.findByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });

      group('findAllByText', () {
        test('[matches]', () async {
          final result = await view.findAllByText('Foo', selector: 'span');
          expect(result, [isA<SpanElement>()]);
        });

        test('[no matches]', () async {
          expect(
              () => view.findAllByText('Foo', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('Unable to find an element with the text: Foo')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });
    });

    group('the ignore argument', () {
      setUp(() {
        view = rtl.render(react.div(
          {},
          react.div(
            {},
            'Foo',
          ),
          react.span(
            {},
            'Foo',
          ),
        ) as ReactElement);
      });

      group('can be set to a String query to ignore certain elements matching the selector query:', () {
        group('queryByText', () {
          test('[match]', () {
            expect(view.queryByText('Foo', ignore: 'span'), isA<DivElement>());
          });

          test('[no match]', () {
            expect(view.queryByText('Bar', ignore: 'p'), isNull);
          });
        });

        group('queryAllByText', () {
          test('[matches]', () {
            final result = view.queryAllByText('Foo', ignore: 'span');
            expect(result, [isA<DivElement>()]);
          });

          test('[no matches]', () {
            expect(view.queryAllByText('Bar', ignore: 'p'), isEmpty);
          });
        });

        group('getByText', () {
          test('[match]', () {
            expect(view.getByText('Foo', ignore: 'span'), isA<DivElement>());
          });

          test('[no match]', () {
            expect(
                () => view.getByText('Bar', ignore: 'p'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('getAllByText', () {
          test('[matches]', () {
            final result = view.getAllByText('Foo', ignore: 'span');
            expect(result, [isA<DivElement>()]);
          });

          test('[no matches]', () {
            expect(
                () => view.getAllByText('Bar', ignore: 'span'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findByText', () {
          test('[match]', () async {
            expect(await view.findByText('Foo', ignore: 'span'), isA<DivElement>());
          });

          test('[no match]', () async {
            expect(
                () => view.findByText('Bar', ignore: 'p'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });

        group('findAllByText', () {
          test('[matches]', () async {
            final result = await view.findAllByText('Foo', ignore: 'span');
            expect(result, [isA<DivElement>()]);
          });

          test('[no matches]', () async {
            expect(
                () => view.findAllByText('Bar', ignore: 'p'),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('Unable to find an element with the text: Bar')),
                  hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
                )));
          });
        });
      });
    });
  });
}

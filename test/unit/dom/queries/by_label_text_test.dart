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

// NOTE: All other tests for the ByLabelText queries are covered by the `testTextMatchTypes()` shared tests.
void main() {
  group('', () {
    initConfigForInternalTesting();

    late rtl.RenderResult view;

    group(
        'the selector argument can be specified to target only matching '
        'element(s) when more than one has matching label text:', () {
      setUp(() {
        view = rtl.render(react.div(
          {},
          react.label(
            {},
            'Username',
            react.input({'type': 'text'}),
          ),
          react.label(
            {},
            'Username',
            react.textarea({}),
          ),
        ) as ReactElement);

        expect(view.queryAllByLabelText('Username'), hasLength(2));
      });

      group('queryByLabelText', () {
        test('[match]', () {
          expect(view.queryByLabelText('Username', selector: 'input'), isA<TextInputElement>());
        });

        test('[no match]', () {
          expect(view.queryByLabelText('Username', selector: 'p'), isNull);
        });
      });

      group('queryAllByLabelText', () {
        test('[matches]', () {
          final result = view.queryAllByLabelText('Username', selector: 'input');
          expect(result, [isA<TextInputElement>()]);
        });

        test('[no matches]', () {
          expect(view.queryAllByLabelText('Username', selector: 'p'), isEmpty);
        });
      });

      group('getByLabelText', () {
        test('[match]', () {
          expect(view.getByLabelText('Username', selector: 'input'), isA<TextInputElement>());
        });

        test('[no match]', () {
          expect(
              () => view.getByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });

      group('getAllByLabelText', () {
        test('[matches]', () {
          final result = view.getAllByLabelText('Username', selector: 'input');
          expect(result, [isA<TextInputElement>()]);
        });

        test('[no matches]', () {
          expect(
              () => view.getAllByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });

      group('findByLabelText', () {
        test('[match]', () async {
          expect(await view.findByLabelText('Username', selector: 'input'), isA<TextInputElement>());
        });

        test('[no match]', () async {
          expect(
              () => view.findByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });

      group('findAllByLabelText', () {
        test('[matches]', () async {
          final result = await view.findAllByLabelText('Username', selector: 'input');
          expect(result, [isA<TextInputElement>()]);
        });

        test('[no matches]', () async {
          expect(
              () => view.findAllByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(view.baseElement))),
              )));
        });
      });
    });
  });
}

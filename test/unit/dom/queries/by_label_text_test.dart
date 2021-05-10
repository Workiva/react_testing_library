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

    rtl.RenderResult renderResult;
    tearDown(() {
      renderResult = null;
    });

    group(
        'the selector argument can be specified to target only matching '
        'element(s) when more than one has matching label text:', () {
      setUp(() {
        renderResult = rtl.render(react.div(
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

        expect(renderResult.queryAllByLabelText('Username'), hasLength(2));
      });

      group('queryByLabelText', () {
        test('[match]', () {
          expect(renderResult.queryByLabelText('Username', selector: 'input'), isA<TextInputElement>());
        });

        test('[no match]', () {
          expect(renderResult.queryByLabelText('Username', selector: 'p'), isNull);
        });
      });

      group('queryAllByLabelText', () {
        test('[matches]', () {
          final result = renderResult.queryAllByLabelText('Username', selector: 'input');
          expect(result, [isA<TextInputElement>()]);
        });

        test('[no matches]', () {
          expect(renderResult.queryAllByLabelText('Username', selector: 'p'), isEmpty);
        });
      });

      group('getByLabelText', () {
        test('[match]', () {
          expect(renderResult.getByLabelText('Username', selector: 'input'), isA<TextInputElement>());
        });

        test('[no match]', () {
          expect(
              () => renderResult.getByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('getAllByLabelText', () {
        test('[matches]', () {
          final result = renderResult.getAllByLabelText('Username', selector: 'input');
          expect(result, [isA<TextInputElement>()]);
        });

        test('[no matches]', () {
          expect(
              () => renderResult.getAllByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('findByLabelText', () {
        test('[match]', () async {
          expect(await renderResult.findByLabelText('Username', selector: 'input'), isA<TextInputElement>());
        });

        test('[no match]', () async {
          expect(
              () => renderResult.findByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });

      group('findAllByLabelText', () {
        test('[matches]', () async {
          final result = await renderResult.findAllByLabelText('Username', selector: 'input');
          expect(result, [isA<TextInputElement>()]);
        });

        test('[no matches]', () async {
          expect(
              () => renderResult.findAllByLabelText('Username', selector: 'p'),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('no form control was found associated to that label')),
                hasToStringValue(contains(rtl.prettyDOM(renderResult.container))),
              )));
        });
      });
    });
  });
}

// @dart=2.7
// ^ Do not remove until migrated to null safety. More info at https://wiki.atl.workiva.net/pages/viewpage.action?pageId=189370832
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

import 'dart:html' show InputElement;

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/matchers.dart' show isDisabled, isEnabled;
import 'package:react_testing_library/react_testing_library.dart' show render;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';
import '../../util/over_react_stubs.dart';

void main() {
  group('isDisabled matcher', () {
    group('passes when provided a valid Element that can be disabled', () {
      test('is disabled', () {
        shouldPass(InputElement()..disabled = true, isDisabled);
        final renderResult = render(
            react.form({'disabled': true, defaultTestIdKey: 'form'}, react.button({'type': 'submit'})) as ReactElement);
        shouldPass(renderResult.getByTestId('form'), isDisabled);
      });

      test('within a disabled FormElement', () {
        final renderResult = render(react.form({'disabled': true}, react.button({'type': 'submit'})) as ReactElement);
        shouldPass(renderResult.getByRole('button'), isDisabled);
      });
    });

    group('provides a useful failure message when', () {
      test('the matched item is not an element', () {
        shouldFail(null, isDisabled, contains('Which: $notAnElementMismatchDescription'));
      });

      group('the matched item is not a type of element that can be disabled', () {
        test('', () {
          final renderResult = render(react.div({defaultTestIdKey: 'div'}) as ReactElement);
          final divNode = renderResult.getByTestId('div');
          shouldFail(divNode, isDisabled, contains('Which: is not a type of HTML Element that can be disabled.'));
        });

        test('even when nested within a FormElement that is disabled', () {
          final renderResult =
              render(react.form({'disabled': true}, react.div({defaultTestIdKey: 'div'})) as ReactElement);
          final divNode = renderResult.getByTestId('div');
          shouldFail(divNode, isDisabled, contains('Which: is not a type of HTML Element that can be disabled.'));
        });
      });

      test('the matched item is not disabled', () {
        shouldFail(InputElement(), isDisabled, contains('Which: is not disabled.'));
      });
    });
  });

  group('isEnabled matcher', () {
    group('passes when', () {
      test('provided a valid Element that is not disabled', () {
        shouldPass(InputElement(), isEnabled);
      });
    });

    group('provides a useful failure message when', () {
      test('the matched item is not an element', () {
        shouldFail(null, isEnabled, contains('Which: $notAnElementMismatchDescription'));
      });

      group('the matched item is not a type of element that can be disabled', () {
        test('', () {
          final renderResult = render(react.div({defaultTestIdKey: 'div'}) as ReactElement);
          final divNode = renderResult.getByTestId('div');
          shouldFail(divNode, isEnabled, contains('Which: is not a type of HTML Element that can be disabled.'));
        });

        test('even when nested within a FormElement that is disabled', () {
          final renderResult =
              render(react.form({'disabled': true}, react.div({defaultTestIdKey: 'div'})) as ReactElement);
          final divNode = renderResult.getByTestId('div');
          shouldFail(divNode, isEnabled, contains('Which: is not a type of HTML Element that can be disabled.'));
        });
      });

      test('the matched item is disabled', () {
        shouldFail(InputElement()..disabled = true, isEnabled, contains('Which: is disabled.'));
      });
    });
  });
}

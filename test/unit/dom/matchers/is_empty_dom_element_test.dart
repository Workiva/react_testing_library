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

import 'package:react/react.dart' as react;
import 'package:react_testing_library/matchers.dart' show isEmptyDomElement;
import 'package:react_testing_library/react_testing_library.dart' show render;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:react_testing_library/src/util/over_react_stubs.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

main() {
  group('isEmptyDomElement matcher', () {
    group('passes when provided a valid Element', () {
      test('that has no children', () {
        final renderResult = render(react.span({defaultTestIdKey: 'empty'}));
        shouldPass(renderResult.getByTestId('empty'), isEmptyDomElement);
      });
    });

    group('provides a useful failure message when', () {
      test('the matched item is not an element', () {
        shouldFail(null, isEmptyDomElement, contains('Which: $notAnElementMismatchDescription'));
      });

      test('the matched item has empty children', () {
        final renderResult =
            render(react.span({defaultTestIdKey: 'not-empty'}, react.span({defaultTestIdKey: 'empty'})));
        shouldFail(
            renderResult.getByTestId('not-empty'), isEmptyDomElement, contains('Which: is not an empty DOM Element.'));
      });

      test('the matched item has text children', () {
        final renderResult = render(react.span({defaultTestIdKey: 'not-empty'}, 'oh hai'));
        shouldFail(
            renderResult.getByTestId('not-empty'), isEmptyDomElement, contains('Which: is not an empty DOM Element.'));
      });
    });
  });
}

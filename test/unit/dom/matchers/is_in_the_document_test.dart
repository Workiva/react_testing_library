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

import 'dart:html' show DivElement;

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/matchers.dart' show isInTheDocument;
import 'package:react_testing_library/react_testing_library.dart' show render, within;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';
import '../../util/over_react_stubs.dart';
import '../../util/shadow_dom.dart';

main() {
  group('isInTheDocument matcher', () {
    test('passes when provided an element found in the document', () {
      final renderResult = render(react.span({defaultTestIdKey: 'empty'}) as ReactElement);
      shouldPass(renderResult.getByTestId('empty'), isInTheDocument);
    });

    test('passes when provided an element found in a ShadowRoot within the document', () {
      // ignore: unnecessary_cast
      final renderResult = render(ShadowNested({}, react.span({defaultTestIdKey: 'empty'})) as ReactElement);
      final nodeWithShadowRoot = renderResult.getByTestId(nodeWithShadowRootDefaultTestId);
      shouldPass(within(nodeWithShadowRoot.shadowRoot).getByTestId('empty'), isInTheDocument);
    });

    group('provides a useful failure message when', () {
      test('the matched item is not an element', () {
        shouldFail(null, isInTheDocument, contains('Which: $notAnElementMismatchDescription'));
      });

      test('the matched item is not in the document', () {
        shouldFail(DivElement(), isInTheDocument, contains('Which: is not an Element in the document.'));
      });
    });
  });
}

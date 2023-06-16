
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
import 'package:react_testing_library/matchers.dart' show containsElement;
import 'package:react_testing_library/react_testing_library.dart' show render;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';
import '../../util/over_react_stubs.dart';

void main() {
  group('containsElement matcher', () {
    test('passes when provided an ancestor with a matching direct descendant', () {
      final view = render(react.span(
        {defaultTestIdKey: 'ancestor'},
        react.span({defaultTestIdKey: 'direct-descendant'}),
      ) as ReactElement);
      shouldPass(view.getByTestId('ancestor'), containsElement(view.getByTestId('direct-descendant')));
    });

    test('passes when provided an ancestor with a matching descendant', () {
      final view = render(react.span(
        {defaultTestIdKey: 'ancestor'},
        react.span(
          {defaultTestIdKey: 'direct-descendant'},
          react.span({defaultTestIdKey: 'descendant'}),
        ),
      ) as ReactElement);
      shouldPass(view.getByTestId('ancestor'), containsElement(view.getByTestId('descendant')));
    });

    group('provides a useful failure message when', () {
      test('the matched item is not an element', () {
        shouldFail(null, containsElement(DivElement()), contains('Which: $notAnElementMismatchDescription'));
      });

      test('the matched item does not have a matching descendant', () {
        final view = render(
            react.span({defaultTestIdKey: 'ancestor'}, react.span({defaultTestIdKey: 'descendant'})) as ReactElement);
        final ancestor = view.getByTestId('ancestor');
        final descendant = view.getByTestId('descendant');
        shouldFail(descendant, containsElement(ancestor), contains('Which: does not contain $ancestor.'));
      });
    });
  });
}

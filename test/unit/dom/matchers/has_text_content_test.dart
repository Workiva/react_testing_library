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

import 'dart:html' show Element;

import 'package:react/react.dart' as react;
import 'package:react_testing_library/react_testing_library.dart' show hasTextContent, render;
import 'package:react_testing_library/src/util/over_react_stubs.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

main() {
  group('hasTextContent matcher', () {
    Element rootElement;

    setUp(() {
      final renderedResult =
          render(react.span({defaultTestIdKey: 'root'}, 'The quick brown fox jumps over the (lazy)    dog'));
      rootElement = renderedResult.getByTestId('root');
    });

    tearDown(() {
      rootElement = null;
    });

    group('passes when provided a', () {
      test('String that the element text content contains', () {
        shouldPass(rootElement, hasTextContent('ick brown fo'));
        shouldPass(rootElement, hasTextContent('The '));
        shouldPass(rootElement, hasTextContent('o'));
        shouldPass(rootElement, hasTextContent('(lazy) dog'), reason: 'White space should be normalized by default');
      });

      test('RegExp', () {
        shouldPass(rootElement, hasTextContent(RegExp(r'^The.*dog$')));
        shouldPass(rootElement, hasTextContent(RegExp(r'^The quick brown fox jumps over the \(lazy\) dog$')),
            reason: 'White space should be normalized by default');
      });
    });

    group('provides a useful failure message when', () {
      test('the String provided is not found within the provided element\'s text content', () {
        shouldFail(
            rootElement,
            hasTextContent('The Dog'),
            allOf(
              contains('An element with text content that contains \'The Dog\''),
              contains('Which: has text content \'The quick brown fox jumps over the (lazy) dog\''),
            ));
      });

      test('the RegExp provided does not have a match within the provided element\'s text content', () {
        final badRegExp = RegExp(r'jumps over the$');
        shouldFail(
            rootElement,
            hasTextContent(badRegExp),
            allOf(
              contains('An element with text content that has a match within \'/${badRegExp.pattern}/\''),
              contains('Which: has text content \'The quick brown fox jumps over the (lazy) dog\''),
            ));
      });

      test('the stringOrRegExp argument is not a String or RegExp', () {
        expect(
            () => hasTextContent(null),
            throwsA(allOf(
              isA<ArgumentError>(),
              hasToStringValue(contains('must be a String or a RegExp')),
            )));
      });
    });
  });
}

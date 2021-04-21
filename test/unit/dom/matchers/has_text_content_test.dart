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
      group('String that is an exact match of the element text content', () {
        test('when normalizeWhitespace = true (default)', () {
          shouldPass(rootElement, hasTextContent('The quick brown fox jumps over the (lazy) dog'));
        });

        test('when normalizeWhitespace = false', () {
          shouldPass(rootElement, hasTextContent('The quick brown fox jumps over the (lazy)    dog', false));
        });
      });

      test('RegExp', () {
        shouldPass(rootElement, hasTextContent(RegExp(r'^The.*dog$')));
        shouldPass(rootElement,
            hasTextContent(RegExp(r'^The quick BROWN fox jumps over the \(lazy\) dog$', caseSensitive: false)));
      });

      test('a matcher that matches the element text content', () {
        shouldPass(rootElement, hasTextContent(),
            reason: 'A null expected value should be treated as `allOf(isA<String>(), isNotEmpty)`');
        shouldPass(rootElement, isNot(hasTextContent('john doe')));
        shouldPass(rootElement, hasTextContent(startsWith('The quick ')));
        shouldPass(rootElement, hasTextContent(matches(RegExp(r'^The.*dog$'))));
      });
    });

    group('provides a useful failure message when', () {
      test('the first argument of `expect()` is not a valid HTML Element', () {
        shouldFail(
            'Not an HTML Element',
            hasTextContent('Not an HTML Element'),
            allOf(
              contains('Expected: An HTML Element with text content value of \'Not an HTML Element\''),
              contains('Actual: \'Not an HTML Element\''),
              contains('Which: is not a valid HTML Element.'),
            ));
      });

      test('the String provided is not found within the provided element\'s text content', () {
        shouldFail(
            rootElement,
            hasTextContent('The Dog'),
            allOf(
              contains('Expected: An HTML Element with text content value of \'The Dog\''),
              contains('Actual: SpanElement:<span>'),
              contains('Which: has text content with value \'The quick brown fox jumps over the (lazy) dog\''),
            ));
      });

      test('the RegExp provided does not have a match within the provided element\'s text content', () {
        shouldFail(
            rootElement,
            hasTextContent(RegExp(r'jumps over the$')),
            allOf(
              contains('Expected: An HTML Element with text content value of match \'jumps over the\$\''),
              contains('Actual: SpanElement:<span>'),
              contains('Which: has text content with value \'The quick brown fox jumps over the (lazy) dog\''),
            ));
      });
    });
  });
}

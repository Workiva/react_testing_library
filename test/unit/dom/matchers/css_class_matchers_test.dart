
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

import 'package:react_testing_library/matchers.dart' show excludesClasses, hasClasses, hasExactClasses;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

void main() {
  group('', () {
    Element testElement;

    setUp(() {
      testElement = Element.div();
    });

    group('hasClasses', () {
      group('passes when', () {
        test('the element has the exact classes', () {
          testElement.className = 'class1 class2';
          shouldPass(testElement, hasClasses('class1 class2'));
        });

        test('the element has the exact classes (specified as an Iterable)', () {
          testElement.className = 'class1 class2';
          shouldPass(testElement, hasClasses(['class1', 'class2']));
        });

        test('the element has the exact classes with duplication', () {
          testElement.className = 'class1 class1 class2';
          shouldPass(testElement, hasClasses('class1 class2'));
        });

        test('the element has extraneous classes', () {
          testElement.className = 'class1 class2 class3';
          shouldPass(testElement, hasClasses('class1 class2'));
        });
      });

      group('fails when', () {
        test('the matched item is not an element', () {
          shouldFail(null, hasClasses('foo'), contains('Which: $notAnElementMismatchDescription'));
        });

        test('the element has only some classes', () {
          testElement.className = 'class1';
          shouldFail(
              testElement,
              hasClasses('class1 class2'),
              allOf(
                contains('Expected: Element that has the classes: {class1, class2}'),
                contains('Which: has className with value \'class1\' which is missing classes: {class2}'),
              ));
        });

        test('the element has no classes', () {
          testElement.className = '';
          shouldFail(
              testElement,
              hasClasses('class1 class2'),
              allOf(
                contains('Expected: Element that has the classes: {class1, class2}'),
                contains('Which: has className with value \'\' which is missing classes: {class1, class2}'),
              ));
        });
      });

      test('throws an error when an invalid, non-class value is passed to the matcher', () {
        expect(() {
          hasClasses(Object());
        }, throwsArgumentError);
      });
    });

    group('hasExactClasses', () {
      group('passes when', () {
        test('the element has the exact classes', () {
          testElement.className = 'class1 class2';
          shouldPass(testElement, hasExactClasses('class1 class2'));
        });

        test('the element has the exact classes (specified as an Iterable)', () {
          testElement.className = 'class1 class2';
          shouldPass(testElement, hasExactClasses(['class1', 'class2']));
        });

        test('the element has the exact classes and is an SvgElement', () {
          testElement = Element.svg()..className = 'class1 class2';
          shouldPass(testElement, hasExactClasses(['class1', 'class2']));
        });
      });

      group('fails when', () {
        test('the matched item is not an element', () {
          shouldFail(null, hasExactClasses('foo'), contains('Which: $notAnElementMismatchDescription'));
        });

        test('the element has the exact classes with duplication', () {
          testElement.className = 'class1 class1 class2';
          shouldFail(
              testElement,
              hasExactClasses('class1 class2'),
              allOf(
                contains('Expected: Element that has ONLY the classes: {class1, class2}'),
                contains(
                    'Which: has className with value \'class1 class1 class2\' which has extraneous classes: [class1]'),
              ));
        });

        test('the element has extraneous classes', () {
          testElement.className = 'class1 class2 class3';
          shouldFail(
              testElement,
              hasExactClasses('class1 class2'),
              allOf(
                contains('Expected: Element that has ONLY the classes: {class1, class2}'),
                contains(
                    'Which: has className with value \'class1 class2 class3\' which has extraneous classes: [class3]'),
              ));
        });

        test('the element has only some classes', () {
          testElement.className = 'class1';
          shouldFail(
              testElement,
              hasExactClasses('class1 class2'),
              allOf(
                contains('Expected: Element that has ONLY the classes: {class1, class2}'),
                contains('Which: has className with value \'class1\' which is missing classes: {class2}'),
              ));
        });

        test('the element has no classes', () {
          testElement.className = '';
          shouldFail(
              testElement,
              hasExactClasses('class1 class2'),
              allOf(
                contains('Expected: Element that has ONLY the classes: {class1, class2}'),
                contains('Which: has className with value \'\' which is missing classes: {class1, class2}'),
              ));
        });
      });

      test('throws an error when an invalid, non-class value is passed to the matcher', () {
        expect(() {
          hasExactClasses(Object());
        }, throwsArgumentError);
      });
    });

    group('excludesClasses', () {
      group('passes when', () {
        test('the element has none of the excluded classes', () {
          testElement.className = 'class1';
          shouldPass(testElement, excludesClasses('class2 class3'));
        });
      });

      group('fails when', () {
        test('the matched item is not an element', () {
          shouldFail(null, excludesClasses('foo'), contains('Which: $notAnElementMismatchDescription'));
        });

        test('the element has some of the excluded classes', () {
          testElement.className = 'class1 class2';
          shouldFail(
              testElement,
              excludesClasses('class2 class3'),
              allOf(
                contains('Expected: Element that does not have the classes: {class2, class3}'),
                contains('Which: has className with value \'class1 class2\' which has unwanted classes: {class2}'),
              ));
        });

        test('the element has some of the excluded classes (specified as an Iterable)', () {
          testElement.className = 'class1 class2';
          shouldFail(
              testElement,
              excludesClasses(['class2', 'class3']),
              allOf(
                contains('Expected: Element that does not have the classes: {class2, class3}'),
                contains('Which: has className with value \'class1 class2\' which has unwanted classes: {class2}'),
              ));
        });

        test('the element has all of the excluded classes', () {
          testElement.className = 'class1 class2 class3';
          shouldFail(
              testElement,
              excludesClasses('class2 class3'),
              allOf(
                contains('Expected: Element that does not have the classes: {class2, class3}'),
                contains(
                    'Which: has className with value \'class1 class2 class3\' which has unwanted classes: {class2, class3}'),
              ));
        });
      });

      test('throws an error when an invalid, non-class value is passed to the matcher', () {
        expect(() {
          excludesClasses(Object());
        }, throwsArgumentError);
      });
    });
  });
}

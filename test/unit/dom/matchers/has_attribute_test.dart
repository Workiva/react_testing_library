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

import 'package:react_testing_library/matchers.dart' show hasAttribute;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

main() {
  group('hasAttribute matcher', () {
    DivElement testElement;

    setUp(() {
      testElement = DivElement();
    });

    test('should pass when the element has the attribute set to the correct value', () {
      testElement.setAttribute('index', '1');
      shouldPass(testElement, hasAttribute('index', '1'));
    });

    test('should pass when the element has the attribute set to anything', () {
      testElement.setAttribute('index', '1');
      shouldPass(testElement, hasAttribute('index'));
    });

    test('should pass when the element has the attribute set to a value that matches the matcher', () {
      testElement.setAttribute('index', 'foo bar baz');
      shouldPass(testElement, hasAttribute('index', contains('foo')));
    });

    group('provides a useful failure message when', () {
      test('the first argument of `expect()` is not a valid HTML Element', () {
        shouldFail(
            'Not an HTML Element',
            hasAttribute('index'),
            allOf(
              contains('Expected: Element with "index" attribute value of not null'),
              contains('Actual: \'Not an HTML Element\''),
              contains('Which: $notAnElementMismatchDescription'),
            ));

        shouldFail(
            'Not an HTML Element',
            hasAttribute('index', '1'),
            allOf(
              contains('Expected: Element with "index" attribute value of \'1\''),
              contains('Actual: \'Not an HTML Element\''),
              contains('Which: $notAnElementMismatchDescription'),
            ));
      });

      test('the element does not have the attribute set', () {
        shouldFail(
          testElement,
          hasAttribute('index', '1'),
          allOf(
            contains('Expected: Element with "index" attribute value of \'1\''),
            contains('Actual: DivElement:<div> Which: does not have an "index" attribute.'),
          ),
        );
      });

      test('the element has the attribute set to the wrong value', () {
        testElement.setAttribute('index', '-1');
        shouldFail(
          testElement,
          hasAttribute('index', '1'),
          allOf(
            contains('Expected: Element with "index" attribute value of \'1\''),
            contains('Actual: DivElement:<div> Which: has "index" attribute with value \'-1\' which is different.'),
          ),
        );
      });
    });
  });
}

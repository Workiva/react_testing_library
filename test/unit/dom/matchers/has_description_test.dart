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

import 'dart:html' show Element, querySelector;

import 'package:react/react.dart' as react;
import 'package:react_testing_library/matchers.dart' show hasDescription;
import 'package:react_testing_library/react_testing_library.dart' show render, RenderResult;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

void main() {
  group('hasDescription matcher', () {
    late RenderResult view;

    setUp(() {
      view = render(react.div(
        {},
        react.button({
          'aria-label': 'Close',
          'aria-describedby': 'description-close',
        }, 'X'),
        react.button({
          'aria-label': 'Has Multiple Descriptions',
          'aria-describedby': 'description-close some-other-description',
        }, 'X'),
        react.button({}, 'Delete'),
        react.button({'aria-describedby': 'not-found'}, 'Has id not found'),
        react.div({'id': 'description-close'}, 'Closing will discard   any changes'),
        react.div({'id': 'some-other-description'}, 'Some other  description'),
      ));
    });

    group('[element with a single id as its aria-describedby attribute value]', () {
      late Element closeButtonElement;
      setUp(() {
        closeButtonElement = view.getByRole('button', name: 'Close');
      });

      group('passes when provided with a', () {
        group('String that is an exact match of the element description', () {
          test('when normalizeWhitespace = true (default)', () {
            shouldPass(closeButtonElement, hasDescription('Closing will discard any changes'));
          });

          test('when normalizeWhitespace = false', () {
            shouldPass(closeButtonElement, hasDescription('Closing will discard   any changes', false));
          });
        });

        test('RegExp', () {
          shouldPass(closeButtonElement, hasDescription(RegExp(r'^closing', caseSensitive: false)));
        });

        test('a matcher that matches the element description', () {
          shouldPass(closeButtonElement, hasDescription(),
              reason: 'A null expected value should be treated as `allOf(isA<String>(), isNotEmpty)`');
          shouldPass(closeButtonElement, hasDescription(contains('will discard')));
        });
      });
    });

    group('[element with multiple, space-separated ids as its aria-describedby attribute value]', () {
      late Element buttonElementWithMultipleDescriptions;
      setUp(() {
        buttonElementWithMultipleDescriptions = view.getByRole('button', name: 'Has Multiple Descriptions');
      });

      group('passes when provided with a', () {
        group('String that is an exact match of the element descriptions', () {
          test('when normalizeWhitespace = true (default)', () {
            shouldPass(buttonElementWithMultipleDescriptions,
                hasDescription('Closing will discard any changes Some other description'));
          });

          test('when normalizeWhitespace = false', () {
            shouldPass(buttonElementWithMultipleDescriptions,
                hasDescription('Closing will discard   any changes Some other  description', false));
          });
        });

        test('RegExp', () {
          shouldPass(buttonElementWithMultipleDescriptions,
              hasDescription(RegExp(r'^closing.*description$', caseSensitive: false)));
        });

        test('a matcher that matches the element description', () {
          shouldPass(buttonElementWithMultipleDescriptions, hasDescription(),
              reason: 'A null expected value should be treated as `allOf(isA<String>(), isNotEmpty)`');
          shouldPass(
              buttonElementWithMultipleDescriptions,
              hasDescription(allOf(
                contains('will discard'),
                contains('other description'),
              )));
        });
      });
    });

    group('provides a useful failure message when', () {
      test('the first argument of `expect()` is not a valid HTML Element', () {
        shouldFail(
            'Not an HTML Element',
            hasDescription('Not an HTML Element'),
            allOf(
              contains('Expected: An HTML Element that is described by HTML Element(s) that have description '
                  'value of \'Not an HTML Element\''),
              contains('Actual: \'Not an HTML Element\''),
              contains('Which: $notAnElementMismatchDescription'),
            ));
      });

      test('the first argument of `expect()` is an HTML Element without an `aria-describedby` attribute', () {
        final buttonWithNoAriaDescribedbyAttr = view.getByRole('button', name: 'Delete');
        expect(buttonWithNoAriaDescribedbyAttr.getAttribute('aria-describedby'), isNull,
            reason: 'Test setup sanity check');
        shouldFail(
            buttonWithNoAriaDescribedbyAttr,
            hasDescription(),
            allOf(
              contains('Expected: An HTML Element that is described by HTML Element(s) that have description value of'),
              contains('Which: does not have an aria-describedby attribute.'),
            ));
      });

      test(
          'the first argument of `expect()` is an HTML Element with an `aria-describedby` attribute '
          'value that does not correspond to the id of any elements found in the DOM', () {
        final buttonWithInvalidAriaDescribedbyAttr = view.getByRole('button', name: 'Has id not found');
        final ariaDescribedByAttrValue = buttonWithInvalidAriaDescribedbyAttr.getAttribute('aria-describedby');
        expect(querySelector('#$ariaDescribedByAttrValue'), isNull, reason: 'Test setup sanity check');
        shouldFail(
            buttonWithInvalidAriaDescribedbyAttr,
            hasDescription(),
            allOf(
              contains('Expected: An HTML Element that is described by HTML Element(s) that have description value of'),
              contains('Which: has an aria-described by attribute value of "$ariaDescribedByAttrValue", which does not '
                  'match the id attribute of any Element in the DOM.'),
            ));
      });

      test('the String provided is not found within the provided element\'s description', () {
        shouldFail(
            view.getByRole('button', name: 'Close'),
            hasDescription('Invalid description'),
            allOf(
              contains('Expected: An HTML Element that is described by HTML Element(s) that have description '
                  'value of \'Invalid description\''),
              contains('Which: has description with value \'Closing will discard any changes\''),
            ));
      });

      test('the RegExp provided does not have a match within the provided element\'s description', () {
        shouldFail(
            view.getByRole('button', name: 'Close'),
            hasDescription(RegExp(r'Invalid description$')),
            allOf(
              contains('Expected: An HTML Element that is described by HTML Element(s) that have description '
                  'value of match \'Invalid description\$\''),
              contains('Which: has description with value \'Closing will discard any changes\''),
            ));
      });
    });
  });
}

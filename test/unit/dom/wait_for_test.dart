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

import 'dart:async';
import 'dart:html';

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/util/error_message_utils.dart';
import 'package:test/test.dart';

import '../util/constants.dart';
import '../util/init.dart';
import '../util/matchers.dart';
import '../util/rendering.dart';

void main() {
  group('', () {
    initConfigForInternalTesting();

    rtl.RenderResult view;
    Element rootElement;

    group('waitFor()', () {
      setUp(() {
        view =
            // TODO: Remove ignore once we stop supporting Dart SDK 2.7.x
            // ignore: unnecessary_cast
            rtl.render(DelayedRenderOf({'childrenToRenderAfterDelay': elementsForQuerying('waitFor')}) as ReactElement);
        rootElement = view.getByTestId('delayed-render-of-root');
      });

      group('when the expectation argument returns', () {
        group('a test `expect` function', () {
          test('that succeeds', () async {
            expect(rootElement.children, isEmpty, reason: 'test setup sanity check');
            await rtl.waitFor(() => expect(rootElement.children, isNotEmpty), container: view.container);
          }, timeout: asyncQueryTestTimeout);

          test('that fails', () async {
            expect(
                () =>
                    rtl.waitFor(() => expect(view.container.contains(rootElement), isFalse), container: view.container),
                throwsA(isA<TestFailure>()));
          }, timeout: asyncQueryTestTimeout);
        });

        test('a function that throws an arbitrary error, rethrows the error thrown by the expectation', () async {
          expect(() => rtl.waitFor(() => throw AssertionError('foo'), container: view.container),
              throwsA(isA<AssertionError>()));
        }, timeout: asyncQueryTestTimeout);

        group('a getBy* query', () {
          test('that succeeds', () async {
            expect(view.queryByAltText('waitFor'), isNull, reason: 'test setup sanity check');
            await rtl.waitFor(() => view.getByAltText('waitFor'), container: view.container);
          }, timeout: asyncQueryTestTimeout);

          test('that fails, throws the error returned from the expectation', () async {
            expect(view.queryByAltText('waitFor'), isNull, reason: 'test setup sanity check');
            expect(
                () => rtl.waitFor(() => view.getByAltText('somethingThatDoesNotExist'), container: view.container),
                throwsA(allOf(
                  isA<TestingLibraryElementError>(),
                  hasToStringValue(contains('alt text: somethingThatDoesNotExist')),
                )));
          }, timeout: asyncQueryTestTimeout);
        });

        group('an async findBy* query', () {
          test('that succeeds', () async {
            expect(view.queryByAltText('waitFor'), isNull, reason: 'test setup sanity check');
            await rtl.waitFor(() => view.findByAltText('waitFor'), container: view.container);
          }, timeout: asyncQueryTestTimeout);

          group('that fails, throws the error returned from the expectation', () {
            test('', () async {
              expect(view.queryByAltText('waitFor'), isNull, reason: 'test setup sanity check');
              expect(
                  () => rtl.waitFor(() => view.findByAltText('somethingThatDoesNotExist'), container: view.container),
                  throwsA(allOf(
                    isA<TestingLibraryElementError>(),
                    hasToStringValue(contains('alt text: somethingThatDoesNotExist')),
                  )));
            }, timeout: asyncQueryTestTimeout);

            test('unless the timeout duration is less than the timeout duration of the query', () async {
              expect(view.queryByAltText('waitFor'), isNull, reason: 'test setup sanity check');
              expect(
                  () => rtl.waitFor(() => view.findByAltText('somethingThatDoesNotExist'),
                      container: view.container, timeout: asyncQueryTimeout ~/ 2),
                  throwsA(allOf(
                    isA<TimeoutException>(),
                    hasToStringValue(contains('Timed out in waitFor after')),
                  )));
            }, timeout: asyncQueryTestTimeout);
          });
        });
      });

      test('when onTimeout is customized', () async {
        expect(
            () => rtl.waitFor(() => expect(view.container.contains(rootElement), isFalse), container: view.container,
                    onTimeout: (error) {
                  return TimeoutException('This is a custom message\n\noriginalError: \n$error');
                }),
            throwsA(allOf(
              isA<TimeoutException>(),
              hasToStringValue(contains('This is a custom message')),
              hasToStringValue(contains('Expected')),
            )));
      });
    });

    group('waitForElementToBeRemoved()', () {
      Node elementThatWillBeRemovedAfterDelay;
      Node elementInDomButOutsideContainer;
      final delayAfterWhichTheElementWillBeRemoved = asyncQueryTimeout ~/ 2;
      final shortTimeout = asyncQueryTimeout ~/ 4;

      setUp(() {
        expect(shortTimeout, lessThan(delayAfterWhichTheElementWillBeRemoved), reason: 'test setup sanity check');

        // TODO: Remove ignore once we stop supporting Dart SDK 2.7.x
        // ignore: unnecessary_cast
        view = rtl.render(DelayedRenderOf(
          {
            'childrenToRenderAfterDelay': elementsForQuerying('waitForElementToBeRemoved'),
          },
          react.div(
            {},
            react.div({}, 'willBeRemoved'),
            elementsForQuerying('waitForElementToBeRemoved'),
          ),
        ) as ReactElement);
        elementThatWillBeRemovedAfterDelay = view.getByText('willBeRemoved');
        elementInDomButOutsideContainer = document.body.append(DivElement()
          ..id = 'notInScope'
          ..text = 'notInScope');
      });

      tearDown(() {
        elementInDomButOutsideContainer.remove();
      });

      group('when the callback argument returns', () {
        group('an element that is present initially', () {
          test('and eventually removed before timeout, completes successfully', () async {
            expect(
                () =>
                    rtl.waitForElementToBeRemoved(() => elementThatWillBeRemovedAfterDelay, container: view.container),
                returnsNormally);
          }, timeout: asyncQueryTestTimeout);

          test('and is not removed before timeout, throws ', () async {
            expect(
                () => rtl.waitForElementToBeRemoved(() => elementThatWillBeRemovedAfterDelay,
                    container: view.container, timeout: shortTimeout),
                throwsA(allOf(
                  isA<TimeoutException>(),
                  hasToStringValue(
                      contains('The element returned from the callback was still present in the container after')),
                  hasToStringValue(contains(rtl.prettyDOM(view.container))),
                )));
          }, timeout: asyncQueryTestTimeout);
        });

        test('an element that is not present in the container initially, throws', () async {
          expect(querySelector('#notInScope'), isNotNull, reason: 'test setup sanity check');
          expect(view.container, isNot(document.body), reason: 'test setup sanity check');
          expect(
              () => rtl.waitForElementToBeRemoved(() => elementInDomButOutsideContainer, container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'The element returned from the callback was not present in the container at the time waitForElementToBeRemoved() was called')),
                hasToStringValue(contains(rtl.prettyDOM(view.container))),
              )));
        }, timeout: asyncQueryTestTimeout);

        test('null, throws', () async {
          expect(
              () => rtl.waitForElementToBeRemoved(() => null, container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('The callback must return a non-null Element.')),
              )));
        }, timeout: asyncQueryTestTimeout);
      });
    });

    group('waitForElementsToBeRemoved()', () {
      Node elementThatWillBeRemovedAfterDelay;
      Node anotherElementThatWillBeRemovedAfterDelay;
      Node elementThatWillNotBeRemovedAfterDelay;
      Node elementInDomButOutsideContainer;
      Node anotherElementInDomButOutsideContainer;
      final delayAfterWhichTheElementWillBeRemoved = asyncQueryTimeout ~/ 2;
      final shortTimeout = asyncQueryTimeout ~/ 4;

      setUp(() {
        expect(shortTimeout, lessThan(delayAfterWhichTheElementWillBeRemoved), reason: 'test setup sanity check');

        // TODO: Remove ignore once we stop supporting Dart SDK 2.7.x
        // ignore: unnecessary_cast
        view = rtl.render(DelayedRenderOf(
          {
            'childrenToRenderAfterDelay': elementsForQuerying('waitForElementToBeRemoved'),
          },
          react.div(
            {},
            react.div({}, 'willBeRemoved'),
            react.div({}, 'willAlsoBeRemoved'),
            react.div({}, 'willNotBeRemoved'),
            elementsForQuerying('waitForElementToBeRemoved'),
          ),
        ) as ReactElement);
        elementThatWillBeRemovedAfterDelay = view.getByText('willBeRemoved');
        anotherElementThatWillBeRemovedAfterDelay = view.getByText('willAlsoBeRemoved');
        elementThatWillNotBeRemovedAfterDelay = view.getByText('willNotBeRemoved');
        elementInDomButOutsideContainer = document.body.append(DivElement()
          ..id = 'notInScope'
          ..text = 'notInScope');
        anotherElementInDomButOutsideContainer = document.body.append(DivElement()
          ..id = 'alsoNotInScope'
          ..text = 'alsoNotInScope');
      });

      tearDown(() {
        elementInDomButOutsideContainer.remove();
        anotherElementInDomButOutsideContainer.remove();
      });

      group('when the callback argument returns', () {
        group('an element that is present initially', () {
          test('and eventually removed before timeout, completes successfully', () async {
            await rtl.waitForElementsToBeRemoved(() => [elementThatWillBeRemovedAfterDelay], container: view.container);
          }, timeout: asyncQueryTestTimeout);

          test('and not removed before timeout, throws ', () async {
            expect(
                () => rtl.waitForElementsToBeRemoved(() => [elementThatWillBeRemovedAfterDelay],
                    container: view.container, timeout: shortTimeout),
                throwsA(allOf(
                  isA<TimeoutException>(),
                  hasToStringValue(
                      contains('The element returned from the callback was still present in the container after')),
                  hasToStringValue(contains(rtl.prettyDOM(view.container))),
                )));
          }, timeout: asyncQueryTestTimeout);
        });

        group('more than one element that is present initially', () {
          test('all of which are eventually removed before timeout, completes successfully', () async {
            expect(
                () => rtl.waitForElementsToBeRemoved(
                    () => [
                          elementThatWillBeRemovedAfterDelay,
                          anotherElementThatWillBeRemovedAfterDelay,
                        ],
                    container: view.container),
                returnsNormally);
          }, timeout: asyncQueryTestTimeout);

          test('one of which is not removed before timeout, throws ', () async {
            expect(
                () => rtl.waitForElementsToBeRemoved(
                    () => [
                          elementThatWillBeRemovedAfterDelay,
                          anotherElementThatWillBeRemovedAfterDelay,
                          elementThatWillNotBeRemovedAfterDelay,
                        ],
                    container: view.container,
                    timeout: shortTimeout),
                throwsA(allOf(
                  isA<TimeoutException>(),
                  hasToStringValue(
                      contains('The element returned from the callback was still present in the container after')),
                  hasToStringValue(contains(rtl.prettyDOM(view.container))),
                )));
          }, timeout: asyncQueryTestTimeout);
        });

        test('a single element that is not present in the container initially, throws', () async {
          expect(
              () => rtl.waitForElementsToBeRemoved(() => [elementInDomButOutsideContainer], container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'One of the elements returned from the callback was not present in the container at the time waitForElementsToBeRemoved() was called')),
                hasToStringValue(contains(rtl.prettyDOM(view.container))),
              )));
        }, timeout: asyncQueryTestTimeout);

        test('more than one element - one of which is not present in the container initially, throws', () async {
          expect(
              () => rtl.waitForElementsToBeRemoved(
                  () => [
                        elementThatWillBeRemovedAfterDelay,
                        elementInDomButOutsideContainer,
                      ],
                  container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'One of the elements returned from the callback was not present in the container at the time waitForElementsToBeRemoved() was called')),
                hasToStringValue(contains(rtl.prettyDOM(view.container))),
              )));
        }, timeout: asyncQueryTestTimeout);

        test('more than one element - more than one of which are not present in the container initially, throws',
            () async {
          expect(
              () => rtl.waitForElementsToBeRemoved(
                  () => [
                        elementThatWillBeRemovedAfterDelay,
                        elementInDomButOutsideContainer,
                        anotherElementInDomButOutsideContainer,
                      ],
                  container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'One of the elements returned from the callback was not present in the container at the time waitForElementsToBeRemoved() was called')),
                hasToStringValue(contains(rtl.prettyDOM(view.container))),
              )));
        }, timeout: asyncQueryTestTimeout);

        test('more than one element - all of which are not present in the container initially, throws', () async {
          expect(
              () => rtl.waitForElementsToBeRemoved(
                  () => [
                        elementInDomButOutsideContainer,
                        anotherElementInDomButOutsideContainer,
                      ],
                  container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains(
                    'One of the elements returned from the callback was not present in the container at the time waitForElementsToBeRemoved() was called')),
                hasToStringValue(contains(rtl.prettyDOM(view.container))),
              )));
        }, timeout: asyncQueryTestTimeout);

        test('null, throws', () async {
          expect(
              () => rtl.waitForElementsToBeRemoved(() => null, container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('The callback must return one or more non-null Elements.')),
              )));
        }, timeout: asyncQueryTestTimeout);

        test('an empty list, throws', () async {
          expect(
              () => rtl.waitForElementsToBeRemoved(() => [], container: view.container),
              throwsA(allOf(
                isA<TestingLibraryElementError>(),
                hasToStringValue(contains('The callback must return one or more non-null Elements.')),
              )));
        }, timeout: asyncQueryTestTimeout);
      });
    });
  });
}

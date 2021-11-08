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

import 'dart:html';

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import 'exception.dart';
import 'over_react_stubs.dart';

void testEventHandlerErrors(
    List<String> events, void Function(Element element) userEventTrigger, dynamic elementTypeToRender,
    {dynamic children, Map<String, dynamic> additionalProps = const {}}) {
  const targetTestId = 'test-subject-11';
  throwingHandler(event) => throw ExceptionForTesting('Mission Failed');
  buildEventHandlers() => {for (final value in events) value: throwingHandler};
  buildProps() => {
        ...buildEventHandlers(),
        ...additionalProps,
        ...{defaultTestIdKey: targetTestId}
      };
  final targetElement =
      react.div({}, children == null ? elementTypeToRender(buildProps()) : elementTypeToRender(buildProps(), children));
  group('will rethrow', () {
    test('event handler error', () {
      final view = rtl.render(targetElement as ReactElement);

      expect(() => userEventTrigger(view.getByTestId(targetTestId)), throwsA(isA<ExceptionForTesting>()));
    });

    test('multiple event handler errors as an exception', () {
      final toRender = react.div(buildEventHandlers(), targetElement);
      final view = rtl.render(toRender as ReactElement);

      expect(
        () => userEventTrigger(view.getByTestId(targetTestId)),
        throwsA(predicate((e) {
          return e is Exception && e.toString().contains('Multiple errors');
        })),
      );
    });
  });
}

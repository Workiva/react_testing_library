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

import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/dom/config/configure.dart';
import 'package:react_testing_library/src/util/error_message_utils.dart';
import 'package:test/test.dart';

import '../util/matchers.dart';
import '../util/over_react_stubs.dart';

void main() {
  group('getConfig()', () {
    group('returns the current configuration object', () {
      test('with the expected fields exposed', () {
        final config = rtl.getConfig();
        expect(config.asyncUtilTimeout, isA<int>());
        expect(config.computedStyleSupportsPseudoElements, isA<bool>());
        expect(config.defaultHidden, isA<bool>());
        expect(config.showOriginalStackTrace, isA<bool>());
        expect(config.throwSuggestions, isA<bool>());
        expect(config.getElementError, isA<Function>());
      });

      test('with the expected testIdAttribute value', () {
        expect(rtl.getConfig().testIdAttribute, defaultTestIdKey,
            reason: 'The value of Config.testIdAttribute should default to what we use in the OverReact ecosystem, '
                'rather than the `data-testid` value that the JS testing-library uses by default.');
      });
    });
  });

  group('configure()', () {
    test('updates the underlying JS config object as expected', () {
      final initialConfig = rtl.getConfig();
      rtl.configure(
          testIdAttribute: 'not-$defaultTestIdKey',
          asyncUtilTimeout: initialConfig.asyncUtilTimeout + 100,
          computedStyleSupportsPseudoElements: !initialConfig.computedStyleSupportsPseudoElements,
          defaultHidden: !initialConfig.defaultHidden,
          showOriginalStackTrace: !initialConfig.showOriginalStackTrace,
          throwSuggestions: !initialConfig.throwSuggestions,
          getElementError: (message, container) {
            final customMessage = [message, 'something custom'].join('\n\n');
            return TestingLibraryElementError(customMessage);
          });

      final newConfig = rtl.getConfig();
      expect(newConfig.testIdAttribute, 'not-$defaultTestIdKey');
      expect(newConfig.asyncUtilTimeout, initialConfig.asyncUtilTimeout + 100);
      expect(newConfig.computedStyleSupportsPseudoElements, !initialConfig.computedStyleSupportsPseudoElements);
      expect(newConfig.defaultHidden, !initialConfig.defaultHidden);
      expect(newConfig.showOriginalStackTrace, !initialConfig.showOriginalStackTrace);
      expect(newConfig.throwSuggestions, !initialConfig.throwSuggestions);
      expect(
          () => rtl.screen.getByText('does-not-exist'),
          throwsA(allOf(
            isA<TestingLibraryElementError>(),
            hasToStringValue(contains('something custom')),
            hasToStringValue(contains('</body>')),
          )));

      // Set things back to the initial value
      jsConfigure(initialConfig);
    });
  });
}

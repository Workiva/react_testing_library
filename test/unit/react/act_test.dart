// Copyright 2025 Workiva Inc.
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

import 'package:react/hooks.dart';
import 'package:react/react.dart' as react;
import 'package:react/react_client.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import '../util/exception.dart';

void main() {
  group('act', () {
    setUp(() => useEffectCalls = 0);

    test('useEffect call is missed when act is not used', () {
      expect(useEffectCalls, 0);
      final view = rtl.render(ActTest({}));
      expect(useEffectCalls, 1);

      final button = view.getByRole('button') as ButtonElement;
      button.click();
      expect(useEffectCalls, 1);
    });

    test('useEffect call is caught when act is used', () async {
      expect(useEffectCalls, 0);
      final view = rtl.render(ActTest({}));
      expect(useEffectCalls, 1);

      await rtl.act(() {
        final button = view.getByRole('button') as ButtonElement;
        button.click();
      });
      expect(useEffectCalls, 2);
    });

    test('also works with an async callback', () async {
      expect(useEffectCalls, 0);
      final view = rtl.render(ActTest({}));
      expect(useEffectCalls, 1);

      Future<void> asyncCallback() async {
        final button = await view.findByRole('button') as ButtonElement;
        button.click();
      }

      await rtl.act(asyncCallback);
      expect(useEffectCalls, 2);
    });

    test('errors thrown in sync callback propagate', () {
      expect(() async => await rtl.act(() => throw ExceptionForTesting()), throwsA(isA<ExceptionForTesting>()));
    });

    test('errors thrown in async callback propagate', () {
      expect(() async => await rtl.act(() async => throw ExceptionForTesting()), throwsA(isA<ExceptionForTesting>()));
    });
  });
}

var useEffectCalls = 0;

ReactDartFunctionComponentFactoryProxy ActTest = react.registerFunctionComponent((props) {
  final text = useState('123');
  useEffect(() => useEffectCalls++);
  return react.button({
    'onClick': (e) {
      text.set('abc');
    },
  }, [
    'Click me!'
  ]);
});

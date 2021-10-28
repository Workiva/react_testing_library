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

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart';
import 'package:test/test.dart';

void main() {
  group('hasIconGlyph matcher', () {
    RenderResult view;
    
    setUp(() {
      view = render(react.i({
        'aria-hidden': 'true',
        'class': 'icon icon-lightbulb'
      }, 'Test') as ReactElement);
    });
    
    tearDown(() {
      view = null;
    });

    test('passes when the provided value is an icon glyph', () {
      final icon = view.getByText('Test');

      expect(icon, hasClasses('icon icon-lightbulb'));
    });
  });
}
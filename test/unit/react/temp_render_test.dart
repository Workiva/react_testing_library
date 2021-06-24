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

import 'dart:developer';

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/util/console_log_utils.dart';
import 'package:test/test.dart';

class _HelloComponent extends react.Component2 {
  @override
  Map<String, react.PropValidator<void>> get propTypes => {
        'name': (props, info) {
          final propValue = (props as Map)[info.propName] as String;
          if (propValue.length > 20) {
            return ArgumentError('($propValue) is too long. $propValue has a max length of 20 characters.');
          }
          return null;
        },
      };

  @override
  dynamic render() {
    return react.span({}, ["Hello ${props['name']}!"]);
  }
}

// ignore: type_annotate_public_apis
final helloComponent = react.registerComponent2(() => _HelloComponent());

void main() {
  group('UserEvent.clear', () {
    rtl.RenderResult view;

    test('on an InputElement', () {
      var ui;

      // This prints a key warning.
      recordConsoleLogs(() => ui = react.div({}, [
        react.div({}),
        react.div({'data-test-id': 'a'}, 'abc'),
        react.div({}),
        react.div({}),
        helloComponent({'name': '123456789012345678901'}),
      ])).forEach(print);

      // This just prints the prop type warning.
      view = rtl.render(ui as ReactElement);
      debugger();
      expect(view.getByText('abc'), isInTheDocument);
    });
  });
}

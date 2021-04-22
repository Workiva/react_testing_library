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
import 'package:react_testing_library/matchers.dart' show hasStyles;
import 'package:react_testing_library/react_testing_library.dart' show render, RenderResult;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

main() {
  group('hasStyles matcher', () {
    RenderResult renderedResult;
    StyleElement externalStyleSheet;

    tearDown(() {
      renderedResult = null;
      externalStyleSheet?.remove();
      externalStyleSheet = null;
    });

    setUp(() {
      externalStyleSheet = StyleElement()
        ..innerText = '''
        .foo {
          font-size: 27px;
          font-weight: bold;
          flex-grow: 2;
          content: attr(title);
        }
      ''';
      document.head.append(externalStyleSheet);

      renderedResult = render(react.button({
        'className': 'foo',
        'style': {
          'backgroundColor': 'red',
          'borderColor': 'rgba(0,0,0,.5)',
          'color': '#cc0000',
          'display': 'block',
          'zIndex': 2,
        },
        'title': 'this is the title'
      }));
    });

    group('passes', () {
      group('when checking a single property', () {
        group('set using an inline style', () {
          test('matched to a string', () {
            shouldPass(renderedResult.getByRole('button'), hasStyles('background-color: red'));
            shouldPass(renderedResult.getByRole('button'), hasStyles('color: #cc0000'));
            shouldPass(renderedResult.getByRole('button'), hasStyles('border-color: rgba(0, 0, 0, .5)'));
          });

          test('matched to a Map', () {
            shouldPass(renderedResult.getByRole('button'), hasStyles({'z-index': '2'}),
                reason: 'string values that can be converted to nums should match their num equivalent');
            shouldPass(renderedResult.getByRole('button'), hasStyles({'z-index': 2}),
                reason: 'num values should match their string equivalent');
          });
        });

        group('set using an external stylesheet', () {
          test('matched to a string', () {
            shouldPass(renderedResult.getByRole('button'), hasStyles('font-size: 27px'));
            shouldPass(renderedResult.getByRole('button'), hasStyles('content: "this is the title"'));
          });

          test('matched to a Map', () {
            shouldPass(renderedResult.getByRole('button'), hasStyles({'flex-grow': '2'}),
                reason: 'string values that can be converted to nums should match their num equivalent');
            shouldPass(renderedResult.getByRole('button'), hasStyles({'flex-grow': 2}),
                reason: 'num values should match their string equivalent');
            shouldPass(renderedResult.getByRole('button'), hasStyles({'content': '"this is the title"'}),
                reason: 'num values should match their string equivalent');
          });
        });
      });

      group('when checking multiple properties', () {
        group('set using an inline style', () {
          test('matched to a string', () {
            shouldPass(renderedResult.getByRole('button'), hasStyles('''
              background-color: red;
              color: #cc0000;
              border-color: rgba(0, 0, 0, .5);
              display: block;
              z-index: 2;
            '''));
          });

          test('matched to a Map', () {
            shouldPass(
                renderedResult.getByRole('button'),
                hasStyles({
                  'background-color': 'red',
                  'color': '#cc0000',
                  'border-color': 'rgba(0,0,0,0.5)',
                  'display': 'block',
                  'z-index': '2',
                }),
                reason: 'string values that can be converted to nums should match their num equivalent');
            shouldPass(
                renderedResult.getByRole('button'),
                hasStyles({
                  'z-index': 2,
                }),
                reason: 'num values should match their string equivalent');
          });
        });

        group('set using an external stylesheet', () {
          test('matched to a string', () {
            shouldPass(renderedResult.getByRole('button'), hasStyles('''
              font-size: 27px;
              font-weight: bold;
              flex-grow: 2;
              content: "this is the title";
            '''));
          });

          test('matched to a Map', () {
            shouldPass(
                renderedResult.getByRole('button'),
                hasStyles({
                  'font-size': '27px',
                  'font-weight': 'bold',
                  'flex-grow': '2',
                  'content': '"this is the title"',
                }),
                reason: 'string values that can be converted to nums should match their num equivalent');
            shouldPass(
                renderedResult.getByRole('button'),
                hasStyles({
                  'flex-grow': 2,
                }),
                reason: 'num values should match their string equivalent');
          });
        });
      });
    });

    group('provides a useful failure message when', () {
      test('the first argument of `expect()` is not a valid HTML Element', () {
        shouldFail('Not an HTML Element', hasStyles('background-color: red'),
            contains('Which: $notAnElementMismatchDescription'));
      });

      group('a single value does not match', () {
        test('and the expected value is a string', () {
          shouldFail(
              renderedResult.getByRole('button'),
              hasStyles('display: inline'),
              allOf(
                contains('Expected: A element with styles {\'display\': \'inline\'}'),
                contains('Actual: ButtonElement:<button> Which: has styles with value {\'display\': \'block\'}'),
                contains('which at location [\'display\'] is \'block\' instead of \'inline\''),
              ));
        });

        test('and the expected value is a map', () {
          shouldFail(
              renderedResult.getByRole('button'),
              hasStyles({
                'font-size': '27px',
                'display': 'inline',
              }),
              allOf(
                contains('Expected: A element with styles '
                    '{\'font-size\': \'27px\', \'display\': \'inline\'}'),
                contains('Actual: ButtonElement:<button> Which: has styles with value '
                    '{\'font-size\': \'27px\', \'display\': \'block\'}'),
                contains('which at location [\'display\'] is \'block\' instead of \'inline\''),
              ));
        });
      });

      test('multiple values do not match', () {
        shouldFail(
            renderedResult.getByRole('button'),
            hasStyles({
              'font-size': '26px',
              'display': 'inline',
            }),
            allOf(
              contains('Expected: A element with styles '
                  '{\'font-size\': \'26px\', \'display\': \'inline\'}'),
              contains('Actual: ButtonElement:<button> Which: has styles with value '
                  '{\'font-size\': \'27px\', \'display\': \'block\'}'),
              contains('which at location [\'font-size\'] is \'27px\' instead of \'26px\''),
            ));
      });
    });
  });
}

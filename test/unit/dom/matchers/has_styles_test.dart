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
import 'package:test/test.dart';

main() {
  group('hasStyles matcher', () {
    RenderResult renderedResult;
    StyleElement externalStyleSheet;

    tearDown(() {
      renderedResult = null;
      externalStyleSheet.remove();
      externalStyleSheet = null;
    });

    group('passes', () {
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

      group('when checking a single property', () {
        group('set using an inline style', () {
          test('matched to a string', () {
            expect(renderedResult.getByRole('button'), hasStyles('background-color: red'));
            expect(renderedResult.getByRole('button'), hasStyles('color: #cc0000'));
            expect(renderedResult.getByRole('button'), hasStyles('border-color: rgba(0, 0, 0, .5)'));
          });

          test('matched to a Map', () {
            expect(renderedResult.getByRole('button'), hasStyles({'z-index': '2'}),
                reason: 'string values that can be converted to nums should match their num equivalent');
            expect(renderedResult.getByRole('button'), hasStyles({'z-index': 2}),
                reason: 'num values should match their string equivalent');
          });
        });

        group('set using an external stylesheet', () {
          test('matched to a string', () {
            expect(renderedResult.getByRole('button'), hasStyles('font-size: 27px'));
            expect(renderedResult.getByRole('button'), hasStyles('content: "this is the title"'));
          });

          test('matched to a Map', () {
            expect(renderedResult.getByRole('button'), hasStyles({'flex-grow': '2'}),
                reason: 'string values that can be converted to nums should match their num equivalent');
            expect(renderedResult.getByRole('button'), hasStyles({'flex-grow': 2}),
                reason: 'num values should match their string equivalent');
            expect(renderedResult.getByRole('button'), hasStyles({'content': '"this is the title"'}),
                reason: 'num values should match their string equivalent');
          });
        });
      });

      group('when checking multiple properties', () {
        group('set using an inline style', () {
          test('matched to a string', () {
            expect(renderedResult.getByRole('button'), hasStyles('''
              background-color: red;
              color: #cc0000;
              border-color: rgba(0, 0, 0, .5);
              display: block;
              z-index: 2;
            '''));
          });

          test('matched to a Map', () {
            expect(
                renderedResult.getByRole('button'),
                hasStyles({
                  'background-color': 'red',
                  'color': '#cc0000',
                  'border-color': 'rgba(0,0,0,0.5)',
                  'display': 'block',
                  'z-index': '2',
                }),
                reason: 'string values that can be converted to nums should match their num equivalent');
            expect(
                renderedResult.getByRole('button'),
                hasStyles({
                  'z-index': 2,
                }),
                reason: 'num values should match their string equivalent');
          });
        });

        group('set using an external stylesheet', () {
          test('matched to a string', () {
            expect(renderedResult.getByRole('button'), hasStyles('''
              font-size: 27px;
              font-weight: bold;
              flex-grow: 2;
              content: "this is the title";
            '''));
          });

          test('matched to a Map', () {
            expect(
                renderedResult.getByRole('button'),
                hasStyles({
                  'font-size': '27px',
                  'font-weight': 'bold',
                  'flex-grow': '2',
                  'content': '"this is the title"',
                }),
                reason: 'string values that can be converted to nums should match their num equivalent');
            expect(
                renderedResult.getByRole('button'),
                hasStyles({
                  'flex-grow': 2,
                }),
                reason: 'num values should match their string equivalent');
          });
        });
      });
    });
  });
}

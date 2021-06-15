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

import '../dom/queries/shared/scoped_queries_tests.dart';
import '../util/rendering.dart';

void main() {
  group('render', () {
    final calls = <String>[];

    group('returns a RenderResult', () {
      test('', () {
        final elementToRender = react.div({'id': 'root'}, 'oh hai') as ReactElement;
        final view = rtl.render(elementToRender);
        expect(view.container, isA<Element>());
        expect(view.baseElement, isA<Element>());
        expect(view.rerender, isA<Function>());
        expect(view.unmount, isA<Function>());
        expect(view.asFragment, isA<Function>());
        expect(view.renderedElement, same(elementToRender));
      });

      group('that contains queries scoped to', () {
        hasQueriesScopedTo('RenderResult.container', (
          scopeName, {
          testAsyncQuery = false,
          renderMultipleElsMatchingQuery,
        }) {
          final elsForQuerying =
              elementsForQuerying(scopeName, renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery);
          final els = testAsyncQuery
              // TODO: Remove ignore once we stop supporting Dart SDK 2.7.x
              // ignore: unnecessary_cast
              ? DelayedRenderOf({'childrenToRenderAfterDelay': elsForQuerying}) as ReactElement
              : elsForQuerying;
          return ScopedQueriesTestWrapper(rtl.render(els));
        });
      });
    });

    group('renders the provided element in a default container', () {
      test('', () {
        final view = rtl.render(react.div({'id': 'root'}, 'oh hai') as ReactElement);
        expect(document.body.contains(view.container), isTrue);
        expect(view.container.childNodes, hasLength(1));
        expect(view.container.childNodes.single.text, 'oh hai');
      });

      test('wrapped in a wrapper when specified', () {
        rtl.render(react.div({'id': 'root'}, 'oh hai') as ReactElement, wrapper: react.aside);
        final wrapperElement = querySelector('aside');
        expect(wrapperElement, isNotNull);
        expect(wrapperElement.querySelector('#root'), isNotNull);
      });

      test('and then updates the DOM when rerender is called', () {
        final view = rtl.render(react.div({'id': 'root'}, 'oh hai') as ReactElement);
        final elementForRerender = react.div({'id': 'root'}, 'different') as ReactElement;
        view.rerender(elementForRerender);
        expect(view.container.childNodes, hasLength(1));
        expect(view.container.childNodes.single.text, 'different');
        expect(view.renderedElement, same(elementForRerender));
      });

      group('and then unmounts / removes it by default, also calling the provided autoTearDownCallback', () {
        test('', () {
          addTearDown(() {
            expect(document.body.children, isEmpty);
            expect(calls, ['autoTearDownCallback']);
            calls.clear();
          });

          rtl.render(react.div({'id': 'root'}, 'oh hai') as ReactElement, onDidTearDown: () {
            calls.add('autoTearDownCallback');
          });
        });

        group('unless autoTearDown is false', () {
          rtl.RenderResult view;

          tearDownAll(() {
            view.unmount();
            view.container.remove();
          });

          test('', () {
            view = rtl.render(react.div({'id': 'root'}, 'oh hai') as ReactElement, autoTearDown: false);
          });

          test('', () {
            expect(document.body.children.contains(view.container), isTrue);
          });
        });
      });
    });

    group('renders the provided element in the provided container', () {
      Node customContainer;

      test('', () {
        customContainer = document.body.append(DivElement()..id = 'custom-container');
        final renderedResult =
            rtl.render(react.div({'id': 'root'}, 'oh hai') as ReactElement, container: customContainer);
        expect(renderedResult.container, same(customContainer));
        expect(document.body.contains(renderedResult.container), isTrue);
        expect(renderedResult.container.childNodes, hasLength(1));
        expect(renderedResult.container.childNodes.single.text, 'oh hai');
      });

      group('and then unmounts / removes it by default', () {
        test('', () {
          expect(document.body.children, isEmpty);
        });

        group('unless autoTearDown is false', () {
          rtl.RenderResult view;

          tearDown(() {
            expect(document.body.children.contains(view.container), isTrue);
            view.unmount();
            view.container.remove();
            customContainer = null;
          });

          test('', () {
            customContainer = document.body.append(DivElement()..id = 'custom-container');
            view = rtl.render(react.div({'id': 'root'}, 'oh hai') as ReactElement,
                container: customContainer, autoTearDown: false);
          });
        });
      });
    });
  });
}

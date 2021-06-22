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
import 'package:react/react_client.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/dom/accessibility_helpers.dart';
import 'package:test/test.dart';

void main() {
  group('Accessibility Helpers', () {
    group('getRoles', () {
      group('returns a map of roles with elements sorted', () {
        test('for view.container', () {
          final view = rtl.render(react.div({}, [
            react.input({}),
            react.img({}),
            react.a({'href': '/'}),
          ]) as ReactElement);
          expect(
            getRoles(view.container),
            equals({
              // There are two div elements because the container is also a div element.
              'generic': [isA<DivElement>(), isA<DivElement>()],
              'textbox': [isA<InputElement>()],
              'link': [isA<AnchorElement>()],
              'img': [isA<ImageElement>()],
            }),
          );
        });

        test('for screen.container', () {
          rtl.render(react.div({}, [
            react.input({'type': 'number'}),
            react.table({}),
            react.h1({}),
          ]) as ReactElement);
          expect(
            getRoles(rtl.screen.container),
            equals({
              'document': [isA<BodyElement>()],
              // There are two div elements because the container is also a div element.
              'generic': [isA<DivElement>(), isA<DivElement>()],
              'spinbutton': [isA<InputElement>()],
              'table': [isA<TableElement>()],
              'heading': [isA<HeadingElement>()],
            }),
          );
        });

        test('for an individual element', () {
          final view = rtl.render(react.div({}, [
            react.button({}),
            react.img({}),
          ]) as ReactElement);
          final button = view.getByRole('button');
          expect(
            getRoles(button),
            equals({
              'button': [isA<ButtonElement>()],
            }),
          );
        });
      });

      group('with hidden elements', () {
        rtl.RenderResult view;

        setUp(() {
          view = rtl.render(react.div({}, [
            react.div({'aria-hidden': true}, react.img({})),
            react.div({}, react.button({})),
          ]) as ReactElement);
        });

        test('when `hidden` option is false (default)', () {
          expect(
            getRoles(view.container),
            equals({
              // There are three div elements because the container is also a div element.
              'generic': [isA<DivElement>(), isA<DivElement>(), isA<DivElement>()],
              'button': [isA<ButtonElement>()],
            }),
          );
        });

        test('when `hidden` option is true', () {
          expect(
            getRoles(view.container, hidden: true),
            equals({
              // There are four div elements because the container is also a div element.
              'generic': [isA<DivElement>(), isA<DivElement>(), isA<DivElement>(), isA<DivElement>()],
              'button': [isA<ButtonElement>()],
              'img': [isA<ImageElement>()],
            }),
          );
        });
      });

      test('does not include elements with no role', () {
        final view = rtl.render(react.div({}, [
          react.input({'type': 'color'}),
          react.i({}),
          react.a({}),
        ]) as ReactElement);
        expect(
          getRoles(view.container),
          equals({
            // There are two div elements because the container is also a div element.
            'generic': [isA<DivElement>(), isA<DivElement>()],
          }),
        );
      });
    });

    group('isInaccessible', () {
      rtl.RenderResult view;

      setUp(() {
        view = rtl.render(react.div({}, [
          // Accessible elements
          react.img({}),
          react.button({}, 'Click me!'),
          react.p({}, 'Hello World!'),
          react.i({'data-test-id': 'i-element'}),
          // Inaccessible elements
          react.div({
            'style': {'display': 'none'},
            'data-test-id': 'no-display'
          }, react.input({})),
          react.div({
            'style': {'visibility': 'hidden'},
            'data-test-id': 'visibility-hidden'
          }, react.select({})),
          react.div({'hidden': true, 'data-test-id': 'hidden'}, react.button({}, 'Hidden Button')),
          react.div({'aria-hidden': true, 'data-test-id': 'aria-hidden'}, react.p({}, 'Hidden Text')),
        ]) as ReactElement);
      });

      test('for inaccessible elements', () {
        expect(isInaccessible(view.getByTestId('no-display')), isTrue,
            reason: 'the `display` style attribute is set to `none`');
        expect(isInaccessible(view.getByRole('textbox', hidden: true)), isTrue, reason: 'dependent of a hidden div');

        expect(isInaccessible(view.getByTestId('visibility-hidden')), isTrue,
            reason: 'the `visibility` style attribute is set to `hidden`');
        expect(isInaccessible(view.getByRole('combobox', hidden: true)), isTrue, reason: 'dependent of a hidden div');

        expect(isInaccessible(view.getByTestId('hidden')), isTrue, reason: 'the `hidden` prop is set to true');
        expect(isInaccessible(view.getByRole('button', name: 'Hidden Button', hidden: true)), isTrue,
            reason: 'dependent of a hidden div');

        expect(isInaccessible(view.getByTestId('aria-hidden')), isTrue,
            reason: 'the `aria-hidden` prop is set to true');
        expect(isInaccessible(view.getByText('Hidden Text')), isTrue, reason: 'dependent of a hidden div');
      });

      test('for accessible elements', () {
        expect(isInaccessible(view.getByRole('img')), isFalse);
        expect(isInaccessible(view.getByRole('button', name: 'Click me!')), isFalse);
        expect(isInaccessible(view.getByText('Hello World!')), isFalse);
        expect(
          isInaccessible(view.getByTestId('i-element')),
          isFalse,
          reason: 'still returns false even though the element has no role '
              'because isInaccessible does not check the role attribute',
        );
      });
    });
  });
}

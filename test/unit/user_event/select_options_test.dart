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

main() {
  group('User select/deselect events:', () {
    group('UserEvent.selectOptions', () {
      void _selectOptionsTestHelper({bool isMultiSelect = false}) {
        List<MouseEvent> calls;
        SelectElement select;
        rtl.RenderResult renderedResult;

        setUp(() {
          calls = [];

          renderedResult = rtl.render(react.select({
            'id': 'root',
            'onClick': (react.SyntheticMouseEvent event) {
              calls.add(event.nativeEvent as MouseEvent);
            },
            'multiple': isMultiSelect,
          }, [
            react.option({'value': '1'}, 'A'),
            react.option({'value': '2'}, 'B'),
            react.option({'value': '3'}, 'C'),
          ]) as ReactElement);

          select =
              renderedResult.getByRole(isMultiSelect ? 'listbox' : 'combobox');

          // Sanity checks.
          expect(
            (renderedResult.getByText('A') as OptionElement).selected,
            !isMultiSelect,
            reason:
                'the first option will be selected by default for non-multi-select',
          );
          expect((renderedResult.getByText('B') as OptionElement).selected,
              isFalse);
          expect((renderedResult.getByText('C') as OptionElement).selected,
              isFalse);
        });

        void _verifySelectEvent({
          bool hasClickInit = false,
        }) {
          expect((renderedResult.getByText('A') as OptionElement).selected,
              isMultiSelect);
          expect((renderedResult.getByText('B') as OptionElement).selected,
              isFalse);
          expect((renderedResult.getByText('C') as OptionElement).selected,
              isTrue);

          // Verify click event.
          expect(calls, hasLength(2));
          calls.forEach((call) => expect(call.shiftKey, hasClickInit));
        }

        test('listing values', () {
          rtl.UserEvent.selectOptions(
              select, isMultiSelect ? ['1', '3'] : ['3']);
          _verifySelectEvent();
        });

        test('listing elements', () {
          rtl.UserEvent.selectOptions(
            select,
            isMultiSelect
                ? [renderedResult.getByText('A'), renderedResult.getByText('C')]
                : [renderedResult.getByText('C')],
          );
          _verifySelectEvent();
        });

        test('clickInit', () {
          rtl.UserEvent.selectOptions(
            select,
            isMultiSelect ? ['1', '3'] : ['3'],
            clickInit: {'shiftKey': true},
          );
          _verifySelectEvent(hasClickInit: true);
        });
      }

      group('single select', () {
        _selectOptionsTestHelper();
      });

      group('multi-select', () {
        _selectOptionsTestHelper(isMultiSelect: true);
      });
    });

    group('UserEvent.deselectOptions', () {
      List<MouseEvent> calls;
      SelectElement select;
      rtl.RenderResult renderedResult;

      setUp(() {
        calls = [];

        renderedResult = rtl.render(react.select({
          'id': 'root',
          'onClick': (react.SyntheticMouseEvent event) {
            calls.add(event.nativeEvent as MouseEvent);
          },
          'multiple': true,
        }, [
          react.option({'value': '1', 'selected': true}, 'A'),
          react.option({'value': '2', 'selected': true}, 'B'),
          react.option({'value': '3', 'selected': true}, 'C'),
        ]) as ReactElement);

        select = renderedResult.getByRole('listbox');

        // Sanity checks.
        expect(
            (renderedResult.getByText('A') as OptionElement).selected, isTrue);
        expect(
            (renderedResult.getByText('B') as OptionElement).selected, isTrue);
        expect(
            (renderedResult.getByText('C') as OptionElement).selected, isTrue);
      });

      void _verifyDeselectEvent({
        bool hasClickInit = false,
      }) {
        expect(
            (renderedResult.getByText('A') as OptionElement).selected, isFalse);
        expect(
            (renderedResult.getByText('B') as OptionElement).selected, isTrue);
        expect(
            (renderedResult.getByText('C') as OptionElement).selected, isFalse);

        // Verify click event.
        expect(calls, hasLength(2));
        calls.forEach((call) => expect(call.shiftKey, hasClickInit));
      }

      test('listing values', () {
        rtl.UserEvent.deselectOptions(select, ['1', '3']);
        _verifyDeselectEvent();
      });

      test('listing elements', () {
        rtl.UserEvent.deselectOptions(
          select,
          [renderedResult.getByText('A'), renderedResult.getByText('C')],
        );
        _verifyDeselectEvent();
      });

      test('clickInit', () {
        rtl.UserEvent.deselectOptions(
          select,
          ['1', '3'],
          clickInit: {'shiftKey': true},
        );
        _verifyDeselectEvent(hasClickInit: true);
      });
    });
  });
}

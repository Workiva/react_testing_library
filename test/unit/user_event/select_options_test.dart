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
import 'package:react_testing_library/user_event.dart';
import 'package:test/test.dart';

void main() {
  group('User select/deselect events:', () {
    group('UserEvent.selectOptions', () {
      void _selectOptionsTestHelper({bool isMultiSelect = false}) {
        List<MouseEvent> calls;
        SelectElement select;
        rtl.RenderResult view;

        setUp(() {
          calls = [];

          view = rtl.render(react.select({
            'id': 'root',
            'onClick': (event) {
              calls.add((event as react.SyntheticMouseEvent).nativeEvent as MouseEvent);
            },
            'multiple': isMultiSelect,
          }, [
            react.option({'value': '1'}, 'A'),
            react.option({'value': '2'}, 'B'),
            react.option({'value': '3'}, 'C'),
          ]) as ReactElement);

          select = view.getByRole(isMultiSelect ? 'listbox' : 'combobox');

          // Sanity checks.
          expect(
            (view.getByText('A') as OptionElement).selected,
            !isMultiSelect,
            reason: 'the first option will be selected by default for non-multi-select',
          );
          expect((view.getByText('B') as OptionElement).selected, isFalse);
          expect((view.getByText('C') as OptionElement).selected, isFalse);
        });

        void _verifySelectEvent({
          bool hasClickInit = false,
        }) {
          expect((view.getByText('A') as OptionElement).selected, isMultiSelect);
          expect((view.getByText('B') as OptionElement).selected, isFalse);
          expect((view.getByText('C') as OptionElement).selected, isTrue);

          // Verify click event.
          expect(calls, hasLength(2));
          for (final event in calls) {
            expect(event.shiftKey, hasClickInit);
          }
        }

        test('listing values', () {
          UserEvent.selectOptions(select, isMultiSelect ? ['1', '3'] : ['3']);
          _verifySelectEvent();
        });

        test('listing elements', () {
          UserEvent.selectOptions(
            select,
            isMultiSelect ? [view.getByText('A'), view.getByText('C')] : [view.getByText('C')],
          );
          _verifySelectEvent();
        });

        test('clickInit', () {
          UserEvent.selectOptions(
            select,
            isMultiSelect ? ['1', '3'] : ['3'],
            clickInit: {'shiftKey': true},
          );
          _verifySelectEvent(hasClickInit: true);
        });
      }

      group('single select', _selectOptionsTestHelper);

      group('multi-select', () {
        _selectOptionsTestHelper(isMultiSelect: true);
      });
    });

    group('UserEvent.deselectOptions', () {
      List<MouseEvent> calls;
      SelectElement select;
      rtl.RenderResult view;

      setUp(() {
        calls = [];

        view = rtl.render(react.select({
          'id': 'root',
          'onClick': (event) {
            calls.add((event as react.SyntheticMouseEvent).nativeEvent as MouseEvent);
          },
          'multiple': true,
          'defaultValue': ['1', '2', '3'],
        }, [
          react.option({'value': '1'}, 'A'),
          react.option({'value': '2'}, 'B'),
          react.option({'value': '3'}, 'C'),
        ]) as ReactElement);

        select = view.getByRole('listbox');

        // Sanity checks.
        expect((view.getByText('A') as OptionElement).selected, isTrue);
        expect((view.getByText('B') as OptionElement).selected, isTrue);
        expect((view.getByText('C') as OptionElement).selected, isTrue);
      });

      void _verifyDeselectEvent({
        bool hasClickInit = false,
      }) {
        expect((view.getByText('A') as OptionElement).selected, isFalse);
        expect((view.getByText('B') as OptionElement).selected, isTrue);
        expect((view.getByText('C') as OptionElement).selected, isFalse);

        // Verify click event.
        expect(calls, hasLength(2));
        for (final event in calls) {
          expect(event.shiftKey, hasClickInit);
        }
      }

      test('listing values', () {
        UserEvent.deselectOptions(select, ['1', '3']);
        _verifyDeselectEvent();
      });

      test('listing elements', () {
        UserEvent.deselectOptions(
          select,
          [view.getByText('A'), view.getByText('C')],
        );
        _verifyDeselectEvent();
      });

      test('clickInit', () {
        UserEvent.deselectOptions(
          select,
          ['1', '3'],
          clickInit: {'shiftKey': true},
        );
        _verifyDeselectEvent(hasClickInit: true);
      });
    });
  });
}

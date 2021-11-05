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

import '../util/event_handler_error.dart';

void main() {
  group('UserEvent.upload', () {
    void _uploadTestHelper({bool isMultiple = false}) {
      List<MouseEvent> clickEventCalls;
      List<Event> changeEventCalls;
      FileUploadInputElement input;
      LabelElement label;
      List<File> files;

      setUp(() {
        files = isMultiple
            ? [
                File([], 'file1.mp3'),
                File([], 'file2.png'),
                File([], 'file3.jpeg'),
              ]
            : [File([], 'file1.mp3')];
        clickEventCalls = [];
        changeEventCalls = [];

        final elementToRender = react.div({}, [
          react.label({'htmlFor': 'file-uploader'}, 'Upload file:'),
          react.input({
            'id': 'file-uploader',
            'type': 'file',
            'onClick': (e) {
              clickEventCalls.add((e as react.SyntheticMouseEvent).nativeEvent as MouseEvent);
            },
            'onChange': (e) {
              changeEventCalls.add((e as react.SyntheticFormEvent).nativeEvent as Event);
            },
            'multiple': isMultiple,
            'accept': '.png,.jpeg',
          }),
        ]);

        final view = rtl.render(elementToRender as ReactElement);
        input = view.getByLabelText('Upload file:');
        label = view.getByText('Upload file:');
        expect(input.files, hasLength(0), reason: 'sanity check');
      });

      void _verifyUploadEvent({
        bool hasClickInit = false,
        bool hasChangeInit = false,
        bool applyAccept = false,
      }) {
        if (isMultiple && applyAccept) {
          expect(input.files, hasLength(2), reason: 'file1 is not an image');
          expect(input.files.first.name, 'file2.png');
          expect(input.files[1].name, 'file3.jpeg');
        } else if (isMultiple) {
          expect(input.files, hasLength(3));
          expect(input.files.first.name, 'file1.mp3');
          expect(input.files[1].name, 'file2.png');
          expect(input.files[2].name, 'file3.jpeg');
        } else if (applyAccept) {
          expect(input.files, hasLength(0), reason: 'file1 is not an image');
        } else {
          expect(input.files, hasLength(1));
          expect(input.files.first.name, 'file1.mp3');
        }

        // Don't check click/change events if `accept` is applied for single file
        // because no file will be added.
        if (isMultiple || !applyAccept) {
          // Verify initial click event.
          expect(clickEventCalls, hasLength(1));
          final clickEvent = clickEventCalls.single;
          expect(clickEvent.shiftKey, hasClickInit);

          // Verify initial change event.
          expect(changeEventCalls, hasLength(1));
          final changeEvent = changeEventCalls.single;
          expect(changeEvent.cancelable, hasChangeInit ? isTrue : isFalse);
        }
      }

      test('', () {
        UserEvent.upload(input, files);
        _verifyUploadEvent();
      });

      test('clickInit', () {
        UserEvent.upload(input, files, clickInit: {'shiftKey': true});
        _verifyUploadEvent(hasClickInit: true);
      });

      test('changeInit', () {
        UserEvent.upload(input, files, changeInit: {'cancelable': true});
        _verifyUploadEvent(hasChangeInit: true);
      });

      test('applyAccept', () {
        UserEvent.upload(input, files, applyAccept: true);
        _verifyUploadEvent(applyAccept: true);
      });

      test('when element is a LabelElement', () {
        UserEvent.upload(label, files);
        _verifyUploadEvent();
      });

      test('when input element is disabled', () {
        input.disabled = true;
        UserEvent.upload(input, files);
        expect(input.files, hasLength(0), reason: 'files not added on disabled element');
      });

      testEventHandlerErrors(
        ['onChange'],
        (el) => UserEvent.upload(el, files),
        react.input,
        additionalProps: {
          'type': 'file',
          'multiple': isMultiple,
          'accept': '.png,.jpeg',
        },
      );
    }

    group('on single file input', _uploadTestHelper);

    group('on multiple file input', () {
      _uploadTestHelper(isMultiple: true);
    });
  });
}

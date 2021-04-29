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
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  group('User upload events:', () {
    void _uploadTestHelper({bool isMultiple = false}) {
      List<MouseEvent> clickEventCalls;
      List<Event> changeEventCalls;
      InputElement input;
      LabelElement label;
      File file;
      List<File> files;

      setUp(() {
        file = File([], 'file1.mp3');
        files = [
          File([], 'file1.mp3'),
          File([], 'file2.png'),
          File([], 'file3.jpeg'),
        ];
        clickEventCalls = [];
        changeEventCalls = [];

        final elementToRender = react.div({}, [
          react.label({'htmlFor': 'file-uploader'}, 'Upload file:'),
          react.input({
            'id': 'file-uploader',
            'type': 'file',
            'onClick': (react.SyntheticMouseEvent e) {
              clickEventCalls.add(e.nativeEvent);
            },
            'onChange': (react.SyntheticFormEvent e) {
              changeEventCalls.add(e.nativeEvent);
            },
            'multiple': isMultiple,
            'accept': '.png,.jpeg',
          }),
        ]);

        final renderedResult = rtl.render(elementToRender);
        input = renderedResult.getByLabelText('Upload file:');
        label = renderedResult.getByText('Upload file:');
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
          expect(clickEvent.shiftKey, hasClickInit ? isTrue : isFalse);

          // Verify initial change event.
          expect(changeEventCalls, hasLength(1));
          final changeEvent = changeEventCalls.single;
          expect(changeEvent.cancelable, hasChangeInit ? isTrue : isFalse);
        }
      }

      void _callUpload({
        Map clickInit,
        Map changeInit,
        bool applyAccept = false,
      }) {
        isMultiple
            ? rtl.UserEvent.uploadMultiple(
                input,
                files,
                clickInit: clickInit,
                changeInit: changeInit,
                applyAccept: applyAccept,
              )
            : rtl.UserEvent.upload(
                input,
                file,
                clickInit: clickInit,
                changeInit: changeInit,
                applyAccept: applyAccept,
              );
      }

      test('', () {
        _callUpload();
        _verifyUploadEvent();
      });

      test('clickInit', () {
        _callUpload(clickInit: {'shiftKey': true});
        _verifyUploadEvent(hasClickInit: true);
      });

      test('changeInit', () {
        _callUpload(changeInit: {'cancelable': true});
        _verifyUploadEvent(hasChangeInit: true);
      });

      test('applyAccept', () {
        _callUpload(applyAccept: true);
        _verifyUploadEvent(applyAccept: true);
      });

      test('when element is a LabelElement', () {
        isMultiple
            ? rtl.UserEvent.uploadMultiple(label, files)
            : rtl.UserEvent.upload(label, file);
        _verifyUploadEvent();
      });

      test('when input element is disabled', () {
        input.disabled = true;
        _callUpload();
        expect(input.files, hasLength(0),
            reason: 'files not added on disabled element');
      });
    }

    group('UserEvent.upload', () {
      _uploadTestHelper();
    });

    group('UserEvent.uploadMultiple', () {
      _uploadTestHelper(isMultiple: true);
    });
  });
}

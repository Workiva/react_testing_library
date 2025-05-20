@JS()
library react_version_test;

import 'package:js/js.dart';
import 'package:react/react.dart' as react;
import 'package:react_testing_library/matchers.dart';
import 'package:react_testing_library/react_testing_library.dart';
import 'package:test/test.dart';

void main() {
  // These tests help us verify our test setup, ensuring
  // we're running on the React version we expect to be.
  group('Setup check: window.React is', () {
    test('Setup check: window.React is React 17', () {
      expect(reactVersion, startsWith('17.'));
    }, tags: 'react-17');

    test('Setup check: window.React is React 18', () {
      expect(reactVersion, startsWith('18.'));
    }, tags: 'react-18');
  });

  // Verify that React 17 stays on an RTL version before this issue: https://github.com/eps1lon/dom-accessibility-api/issues/1075
  // `js_src/src/rtl-17.esm.js` should not be updated until it is deleted in the
  // next major when React 17 support is dropped and this test can be deleted.
  test('Verify that RTL version breaking change does not exist for React 17 version', () {
    final view = render(react.button({}, ['abc', react.span({}, ' - '), 'abc']));
    expect(view.getByRole('button', name: 'abc - abc'), isInTheDocument);
  }, tags: 'react-17');
}

@JS('React.version')
external String get reactVersion;

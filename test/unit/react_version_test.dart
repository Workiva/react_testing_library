@JS()
library react_version_test;

import 'package:js/js.dart';
import 'package:test/test.dart';

void main() {
  // These tests help us verify our test setup, ensuring
  // we're running on the React version we expect to be.
  test('Setup check: window.React is React 17', () {
    expect(reactVersion, startsWith('17.'));
  }, tags: 'react-17');

  test('Setup check: window.React is React 18', () {
    expect(reactVersion, startsWith('18.'));
  }, tags: 'react-18');
}

@JS('React.version')
external String get reactVersion;

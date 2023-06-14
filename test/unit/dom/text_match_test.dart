// ignore_for_file: prefer_interpolation_to_compose_strings

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

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

import '../util/matchers.dart';
import '../util/over_react_stubs.dart';

void main() {
  group('TextMatch.toJs()', () {
    group('De-obfuscates / replaces the Dart interop function signature string within the failure message for a', () {
      const dart2JsFunctionSignatureStr = "Closure 'textMatchQueryFn_closure'";
      const stackTraceHeading = '''


          ------------------------------
          Query Failure Stack Trace:''';
      rtl.RenderResult view;

      group('ByAltText query', () {
        const actualText = 'Johnny Be Good';
        const expectedText = 'William';
        const byAltTextSharedFailureExplanation = '''
<body>


  <div>
    <img
      alt="$actualText"
    />
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.img({'alt': actualText}) as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find an element with the alt text: RegExp/^$expectedText/
              
              $byAltTextSharedFailureExplanation''';

          expect(
            () => view.getByAltText(RegExp(r'^' + expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence =
              'Unable to find an element with the alt text: that would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  $dart2JsFunctionSignatureStr
              
              $byAltTextSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)
              
              $byAltTextSharedFailureExplanation''';

          expect(
            () => view.getByAltText(textMatchQueryFn(expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByDisplayValue query', () {
        const actualValue = 'Johnny Be Good';
        const expectedValue = 'William';
        const byDisplayValueSharedFailureExplanation = '''
<body>


  <div>
    <input
      value="$actualValue"
    />
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.input({'defaultValue': actualValue}) as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find an element with the display value: RegExp/^$expectedValue/.
              
              $byDisplayValueSharedFailureExplanation''';

          expect(
            () => view.getByDisplayValue(RegExp(r'^' + expectedValue)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence =
              'Unable to find an element with the display value: that would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  $dart2JsFunctionSignatureStr
              
              $byDisplayValueSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)
              
              $byDisplayValueSharedFailureExplanation''';

          expect(
            () => view.getByDisplayValue(textMatchQueryFn(expectedValue)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByLabelText query', () {
        const actualText = 'Johnny Be Good';
        const expectedText = 'William';
        const byLabelTextFailureExplanation = '''
<body>


  <div>
    <label>
      $actualText
      <input />
    </label>
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(
            react.label(
              {},
              actualText,
              react.input({}),
            ) as ReactElement,
          );
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find a label with the text of: RegExp/^$expectedText/
              
              $byLabelTextFailureExplanation''';

          expect(
            () => view.getByLabelText(RegExp(r'^' + expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence =
              'Unable to find a label with the text of: that would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  $dart2JsFunctionSignatureStr
              
              $byLabelTextFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)
              
              $byLabelTextFailureExplanation''';

          expect(
            () => view.getByLabelText(textMatchQueryFn(expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByPlaceholderText query', () {
        const actualText = 'Johnny Be Good';
        const expectedText = 'William';
        const byPlaceholderTextSharedFailureExplanation = '''
<body>


  <div>
    <input
      placeholder="$actualText"
      type="text"
    />
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.input({'type': 'text', 'placeholder': actualText}) as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find an element with the placeholder text of: RegExp/^$expectedText/
              
              $byPlaceholderTextSharedFailureExplanation''';

          expect(
            () => view.getByPlaceholderText(RegExp(r'^' + expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence =
              'Unable to find an element with the placeholder text of: that would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  $dart2JsFunctionSignatureStr
              
              $byPlaceholderTextSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)
              
              $byPlaceholderTextSharedFailureExplanation''';

          expect(
            () => view.getByPlaceholderText(textMatchQueryFn(expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByRole query (role)', () {
        const expectedRole = 'search';
        const byRoleSharedFailureExplanation = '''
<body>


  <div>
    <button>
      Hello
    </button>
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.button({}, 'Hello') as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find an accessible element with the role "RegExp/^$expectedRole/"
              
              $byRoleSharedFailureExplanation''';

          expect(
            () => view.getByRole(RegExp(r'^' + expectedRole)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence = 'Unable to find an accessible element with the role that would result '
              'in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  "$dart2JsFunctionSignatureStr"
              
              $byRoleSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  "Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)"
              
              $byRoleSharedFailureExplanation''';

          expect(
            () => view.getByRole(textMatchQueryFn(expectedRole)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByRole query (name)', () {
        const actualName = 'Johnny Be Good';
        const expectedName = 'William';
        const byRoleSharedFailureExplanation = '''
<body>


  <div>
    <button>
      $actualName
    </button>
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.button({}, actualName) as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find an accessible element with the role "button" and name "RegExp/^$expectedName/"
              
              $byRoleSharedFailureExplanation''';

          expect(
            () => view.getByRole('button', name: RegExp(r'^' + expectedName)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence = 'Unable to find an accessible element with the role "button" and name that '
              'would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  "$dart2JsFunctionSignatureStr"
              
              $byRoleSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  "Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)"
              
              $byRoleSharedFailureExplanation''';

          expect(
            () => view.getByRole('button', name: textMatchQueryFn(expectedName)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByTestId query', () {
        const actualTestId = 'JohnnyBeGood';
        const expectedTestId = 'William';
        const byTestIdSharedFailureExplanation = '''
<body>


  <div>
    <div
      $defaultTestIdKey="$actualTestId"
    >
      Hello
    </div>
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.div({defaultTestIdKey: actualTestId}, 'Hello') as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find an element by: [$defaultTestIdKey="RegExp/^$expectedTestId/"]
              
              $byTestIdSharedFailureExplanation''';

          expect(
            () => view.getByTestId(RegExp(r'^' + expectedTestId)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence =
              'Unable to find an element by: [$defaultTestIdKey=that would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  "$dart2JsFunctionSignatureStr"
                  
              ]
              
              $byTestIdSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  "Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)"
                  
              ]
              
              $byTestIdSharedFailureExplanation''';

          expect(
            () => view.getByTestId(textMatchQueryFn(expectedTestId)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByText query', () {
        const actualText = 'Johnny Be Good';
        const expectedText = 'William';
        const byTextSharedFailureExplanation = '''
This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

<body>


  <div>
    <div>
      $actualText
    </div>
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.div({}, actualText) as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage =
              'Unable to find an element with the text: RegExp/^$expectedText/. $byTextSharedFailureExplanation';

          expect(
            () => view.getByText(RegExp(r'^' + expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence =
              'Unable to find an element with the text: that would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  $dart2JsFunctionSignatureStr
              
              $byTextSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)
              
              $byTextSharedFailureExplanation''';

          expect(
            () => view.getByText(textMatchQueryFn(expectedText)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });

      group('ByTitle query', () {
        const actualTitle = 'Johnny Be Good';
        const expectedTitle = 'William';
        const byTitleSharedFailureExplanation = '''
<body>


  <div>
    <div
      title="$actualTitle"
    >
      Hello
    </div>
  </div>
</body>$stackTraceHeading''';

        setUp(() {
          view = rtl.render(react.div({'title': actualTitle}, 'Hello') as ReactElement);
        });

        test('with a RegExp TextMatch arg value', () {
          const expectedFailureMessage = '''
              Unable to find an element with the title: RegExp/^$expectedTitle/.
              
              $byTitleSharedFailureExplanation''';

          expect(
            () => view.getByTitle(RegExp(r'^' + expectedTitle)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                hasToStringValue(containsMultilineString(expectedFailureMessage)),
              ),
            ),
          );
        });

        test('with a Function TextMatch arg value', () {
          const firstSentence =
              'Unable to find an element with the title: that would result in the following conditional returning true:';
          const expectedDart2JsFailureMessage = '''
              $firstSentence
              
                  $dart2JsFunctionSignatureStr
              
              $byTitleSharedFailureExplanation''';
          const expectedDDCFailureMessage = '''
              $firstSentence
              
                  Closure: (dynamic, dynamic) => bool from: (content, el) => dart.equals(content, expectedValue)
              
              $byTitleSharedFailureExplanation''';

          expect(
            () => view.getByTitle(textMatchQueryFn(expectedTitle)),
            throwsA(
              allOf(
                isA<rtl.TestingLibraryElementError>(),
                anyOf(
                  hasToStringValue(containsMultilineString(expectedDart2JsFailureMessage)),
                  hasToStringValue(containsMultilineString(expectedDDCFailureMessage)),
                ),
              ),
            ),
          );
        });
      });
    });
  });
}

bool Function(dynamic, dynamic) textMatchQueryFn(String expectedValue) => (content, el) => content == expectedValue;

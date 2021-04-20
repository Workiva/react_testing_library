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

import 'package:react/react.dart' as react;
import 'package:react_testing_library/react_testing_library.dart' show hasValue, render, RenderResult;
import 'package:test/test.dart';

import '../../util/matchers.dart';

main() {
  group('hasValue matcher', () {
    RenderResult renderedResult;
    tearDown(() {
      renderedResult = null;
    });

    group('passes when the provided value matches the value found in a', () {
      group('TextInputElement', () {
        setUp(() {
          renderedResult = render(react.input({
            'type': 'text',
            'name': 'firstName',
            'value': 'John',
          }));
        });

        test('exact match', () {
          shouldPass(renderedResult.getByRole('textbox'), hasValue('John'));
        });

        test('fuzzy string matcher(s)', () {
          shouldPass(
              renderedResult.getByRole('textbox'),
              hasValue(allOf(
                startsWith('Jo'),
                endsWith('hn'),
              )));
        });
      });

      group('TextAreaElement', () {
        setUp(() {
          renderedResult = render(react.textarea({
            'name': 'comment',
            'value': 'I am here to say something nice about you',
          }));
        });

        test('exact match', () {
          shouldPass(renderedResult.getByRole('textbox'), hasValue('I am here to say something nice about you'));
        });

        test('fuzzy string matcher(s)', () {
          shouldPass(renderedResult.getByRole('textbox'), hasValue(contains('something nice')));
        });
      });

      group('NumberInputElement', () {
        setUp(() {
          renderedResult = render(react.input({
            'type': 'number',
            'name': 'age',
            'value': 35,
          }));
        });

        test('exact match', () {
          shouldPass(renderedResult.getByRole('spinbutton'), hasValue(35));
        });

        test('number matcher', () {
          shouldPass(renderedResult.getByRole('spinbutton'), hasValue(greaterThan(18)));
        });
      });

      group('SelectElement', () {
        group('when only a single option can be selected', () {
          group('and a single option is selected', () {
            test('exact match', () {
              renderedResult = render(react.select(
                {'name': 'account-type'},
                react.option({
                  'value': 'personal',
                }, 'personal'),
                react.option({
                  'value': 'business',
                  'selected': true,
                }, 'business'),
              ));

              shouldPass(renderedResult.getByRole('combobox'), hasValue('business'));
            });

            test('using a matcher', () {
              renderedResult = render(react.select(
                {'name': 'account-type'},
                react.option({
                  'value': 'personal',
                }, 'personal'),
                react.option({
                  'value': 'business',
                }, 'business'),
              ));

              shouldPass(
                  renderedResult.getByRole('combobox'),
                  hasValue(allOf(
                    isNotNull,
                    isNot('business'),
                  )));
            });
          });

          test('and no option is selected', () {
            renderedResult = render(react.select(
              {'name': 'account-type'},
              react.option({
                'value': 'personal',
                'disabled': true,
              }, 'personal'),
              react.option({
                'value': 'business',
                'disabled': true,
              }, 'business'),
            ));

            shouldPass(renderedResult.getByRole('combobox'), hasValue());
          });
        });

        group('when multiple options can be selected', () {
          group('and a single option is selected', () {
            setUp(() {
              renderedResult = render(react.select(
                {
                  'name': 'pizza-toppings',
                  'multiple': 'true',
                },
                react.option({
                  'value': 'pepperoni',
                }, 'pepperoni'),
                react.option({
                  'value': 'sausage',
                  'selected': true,
                }, 'sausage'),
                react.option({
                  'value': 'pineapple',
                  'disabled': true,
                }, 'pineapple'),
              ));
            });

            test('exact match', () {
              shouldPass(renderedResult.getByRole('listbox'), hasValue(['sausage']));
            });

            test('using a matcher', () {
              shouldPass(
                  renderedResult.getByRole('listbox'),
                  hasValue(allOf(
                    isNotEmpty,
                    isNot(contains('pineapple')),
                  )));
            });
          });

          group('and multiple options are selected', () {
            setUp(() {
              renderedResult = render(react.select(
                {
                  'name': 'pizza-toppings',
                  'multiple': 'true',
                },
                react.option({
                  'value': 'pepperoni',
                  'selected': true,
                }, 'pepperoni'),
                react.option({
                  'value': 'sausage',
                  'selected': true,
                }, 'sausage'),
                react.option({
                  'value': 'pineapple',
                  'disabled': true,
                }, 'pineapple'),
              ));
            });

            test('exact match', () {
              shouldPass(renderedResult.getByRole('listbox'), hasValue(['pepperoni', 'sausage']));
            });

            test('using a matcher', () {
              shouldPass(renderedResult.getByRole('listbox'), hasValue(isNot(contains('pineapple'))));
            });
          });

          test('and no option is selected', () {
            renderedResult = render(react.select(
              {
                'name': 'pizza-toppings',
                'multiple': 'true',
              },
              react.option({
                'value': 'white sauce',
                'disabled': true,
              }, 'white sauce'),
              react.option({
                'value': 'bbq chicken',
                'disabled': true,
              }, 'bbq chicken'),
              react.option({
                'value': 'pineapple',
                'disabled': true,
              }, 'pineapple'),
            ));

            shouldPass(renderedResult.getByRole('listbox'), hasValue());
          });
        });
      });
    });

    group('provides a useful failure message when', () {
      group('the provided value does not match the value found in a', () {
        test('TextInputElement', () {
          renderedResult = render(react.input({
            'type': 'text',
            'name': 'firstName',
            'value': 'John',
          }));

          shouldFail(
            renderedResult.getByRole('textbox'),
            hasValue('Jane'),
            allOf(
              contains('Expected: An element with a value of \'Jane\''),
              contains('Which: has element with value \'John\''),
            ),
          );
        });

        test('TextAreaElement', () {
          renderedResult = render(react.textarea({
            'name': 'comments',
            'value': 'I have nothing nice to say',
          }));

          shouldFail(
            renderedResult.getByRole('textbox'),
            hasValue('I have something nice to say'),
            allOf(
              contains('Expected: An element with a value of \'I have something nice to say\''),
              contains('Which: has element with value \'I have nothing nice to say\''),
            ),
          );
        });

        test('NumberInputElement', () {
          renderedResult = render(react.input({
            'type': 'number',
            'name': 'age',
            'value': 35,
          }));

          shouldFail(
            renderedResult.getByRole('spinbutton'),
            hasValue(36),
            allOf(
              contains('Expected: An element with a value of <36>'),
              contains('Which: has element with value <35>'),
            ),
          );
        });

        group('SelectElement', () {
          test('when only a single option can be selected', () {
            renderedResult = render(react.select(
              {
                'name': 'account-type',
              },
              react.option({
                'value': 'personal',
              }, 'personal'),
              react.option({
                'value': 'business',
                'selected': true,
              }, 'business'),
            ));

            shouldFail(
              renderedResult.getByRole('combobox'),
              hasValue('personal'),
              allOf(
                contains('Expected: An element with a value of \'personal\''),
                contains('Which: has element with value \'business\''),
              ),
            );
          });

          test('when multiple options can be selected', () {
            renderedResult = render(react.select(
              {
                'name': 'pizza-toppings',
                'multiple': 'true',
              },
              react.option({
                'value': 'pepperoni',
                'selected': true,
              }, 'pepperoni'),
              react.option({
                'value': 'sausage',
                'selected': true,
              }, 'sausage'),
              react.option({
                'value': 'pineapple',
                'disabled': true,
              }, 'pineapple'),
            ));

            shouldFail(
              renderedResult.getByRole('listbox'),
              hasValue(['pineapple', 'pepperoni']),
              allOf(
                contains('Expected: An element with a value of [\'pineapple\', \'pepperoni\']'),
                contains('Which: has element with value [\'pepperoni\', \'sausage\'] which at '
                    'location [0] is \'pepperoni\' instead of \'pineapple\''),
              ),
            );
          });
        });
      });

      group('the element is', () {
        test('a CheckboxInputElement', () {
          renderedResult = render(react.input({
            'type': 'checkbox',
            'name': 'business-in-front',
            'checked': true,
          }));

          shouldFail(
            renderedResult.getByRole('checkbox'),
            hasValue('true'),
            contains('The hasValue matcher does not support checkbox / radio inputs. '
                'Use either the isChecked or hasFormValues matcher instead.'),
          );
        });

        test('a RadioInputElement', () {
          renderedResult = render(react.input({
            'type': 'radio',
            'name': 'business-in-front',
            'checked': true,
          }));

          shouldFail(
            renderedResult.getByRole('radio'),
            hasValue('true'),
            contains('The hasValue matcher does not support checkbox / radio inputs. '
                'Use either the isChecked or hasFormValues matcher instead.'),
          );
        });
      });
    });
  });
}

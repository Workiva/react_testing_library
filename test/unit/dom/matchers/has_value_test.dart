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

import 'package:meta/meta.dart';
import 'package:react/react.dart' as react;
import 'package:react_testing_library/matchers.dart' show hasDisplayValue, hasValue;
import 'package:react_testing_library/react_testing_library.dart' show render, RenderResult;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

void main() {
  sharedHasValueTests('hasValue matcher', matcherFn: hasValue);
  sharedHasValueTests('hasDisplayValue matcher', matcherFn: hasDisplayValue, valueDescription: 'display value');
}

@isTestGroup
void sharedHasValueTests(String description,
    {required Matcher Function([dynamic]) matcherFn, String valueDescription = 'value'}) {
  group(description, () {
    late RenderResult view;

    group('passes when the provided value matches the value found in a', () {
      group('TextInputElement', () {
        setUp(() {
          view = render(react.input({
            'type': 'text',
            'name': 'firstName',
            'defaultValue': 'John',
          }));
        });

        test('exact match', () {
          shouldPass(view.getByRole('textbox'), matcherFn('John'));
        });

        test('fuzzy string matcher(s)', () {
          shouldPass(
              view.getByRole('textbox'),
              matcherFn(allOf(
                startsWith('Jo'),
                endsWith('hn'),
              )));
        });
      });

      group('TextAreaElement', () {
        setUp(() {
          view = render(react.textarea({
            'name': 'comment',
            'defaultValue': 'I am here to say something nice about you',
          }));
        });

        test('exact match', () {
          shouldPass(view.getByRole('textbox'), matcherFn('I am here to say something nice about you'));
        });

        test('fuzzy string matcher(s)', () {
          shouldPass(view.getByRole('textbox'), matcherFn(contains('something nice')));
        });
      });

      group('NumberInputElement', () {
        setUp(() {
          view = render(react.input({
            'type': 'number',
            'name': 'age',
            'defaultValue': 35,
          }));
        });

        test('exact match', () {
          shouldPass(view.getByRole('spinbutton'), matcherFn(35));
        });

        test('number matcher', () {
          shouldPass(view.getByRole('spinbutton'), matcherFn(greaterThan(18)));
        });
      });

      group('SelectElement', () {
        group('when only a single option can be selected', () {
          group('and a single option is selected', () {
            test('exact match', () {
              view = render(react.select(
                {
                  'name': 'account-type',
                  'defaultValue': 'business',
                },
                react.option({
                  'value': 'personal',
                }, 'personal description'),
                react.option({
                  'value': 'business',
                }, 'business description'),
              ));

              if (matcherFn == hasValue) {
                shouldPass(view.getByRole('combobox'), matcherFn('business'));
              } else if (matcherFn == hasDisplayValue) {
                shouldPass(view.getByRole('combobox'), matcherFn('business description'));
              }
            });

            test('using a matcher', () {
              view = render(react.select(
                {'name': 'account-type'},
                react.option({
                  'value': 'personal',
                }, 'personal description'),
                react.option({
                  'value': 'business',
                }, 'business description'),
              ));

              if (matcherFn == hasValue) {
                shouldPass(
                    view.getByRole('combobox'),
                    matcherFn(allOf(
                      isNotNull,
                      isNot('business'),
                    )));
              } else if (matcherFn == hasDisplayValue) {
                shouldPass(
                    view.getByRole('combobox'),
                    matcherFn(allOf(
                      isNotNull,
                      isNot('business description'),
                    )));
              }
            });
          });

          test('and no option is selected', () {
            view = render(react.select(
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

            shouldPass(view.getByRole('combobox'), matcherFn());
          });
        });

        group('when multiple options can be selected', () {
          group('and a single option is selected', () {
            setUp(() {
              view = render(react.select(
                {
                  'name': 'pizza-toppings',
                  'multiple': true,
                  'defaultValue': ['sausage'],
                },
                react.option({
                  'value': 'pepperoni',
                }, 'Delicious Pepperoni'),
                react.option({
                  'value': 'sausage',
                }, 'Italian Sausage'),
                react.option({
                  'value': 'pineapple',
                  'disabled': true,
                }, 'Processed Sweetened Pineapple'),
              ));
            });

            test('exact match', () {
              if (matcherFn == hasValue) {
                shouldPass(view.getByRole('listbox'), matcherFn(['sausage']));
              } else if (matcherFn == hasDisplayValue) {
                shouldPass(view.getByRole('listbox'), matcherFn(['Italian Sausage']));
              }
            });

            test('using a matcher', () {
              if (matcherFn == hasValue) {
                shouldPass(
                    view.getByRole('listbox'),
                    matcherFn(allOf(
                      isNotEmpty,
                      isNot(contains('pineapple')),
                    )));
              } else if (matcherFn == hasDisplayValue) {
                shouldPass(
                    view.getByRole('listbox'),
                    matcherFn(allOf(
                      isNotEmpty,
                      isNot(contains('Processed Sweetened Pineapple')),
                    )));
              }
            });
          });

          group('and multiple options are selected', () {
            setUp(() {
              view = render(react.select(
                {
                  'name': 'pizza-toppings',
                  'multiple': true,
                  'defaultValue': ['pepperoni', 'sausage'],
                },
                react.option({
                  'value': 'pepperoni',
                }, 'Delicious Pepperoni'),
                react.option({
                  'value': 'sausage',
                }, 'Italian Sausage'),
                react.option({
                  'value': 'pineapple',
                  'disabled': true,
                }, 'Processed Sweetened Pineapple'),
              ));
            });

            test('exact match', () {
              if (matcherFn == hasValue) {
                shouldPass(view.getByRole('listbox'), matcherFn(['pepperoni', 'sausage']));
              } else if (matcherFn == hasDisplayValue) {
                shouldPass(view.getByRole('listbox'), matcherFn(['Delicious Pepperoni', 'Italian Sausage']));
              }
            });

            test('using a matcher', () {
              if (matcherFn == hasValue) {
                shouldPass(view.getByRole('listbox'), matcherFn(isNot(contains('pineapple'))));
              } else if (matcherFn == hasDisplayValue) {
                shouldPass(view.getByRole('listbox'), matcherFn(isNot(contains('Processed Sweetened Pineapple'))));
              }
            });
          });

          test('and no option is selected', () {
            view = render(react.select(
              {
                'name': 'pizza-toppings',
                'multiple': true,
              },
              react.option({
                'value': 'white sauce',
                'disabled': true,
              }, 'white sauce description'),
              react.option({
                'value': 'bbq chicken',
                'disabled': true,
              }, 'bbq chicken description'),
              react.option({
                'value': 'pineapple',
                'disabled': true,
              }, 'pineapple description'),
            ));

            shouldPass(view.getByRole('listbox'), matcherFn());
          });
        });
      });
    });

    group('provides a useful failure message when', () {
      test('the first argument of `expect()` is not a valid HTML Element', () {
        shouldFail('Not an HTML Element', hasValue('yo'), contains('Which: $notAnElementMismatchDescription'));
      });

      group('the element is', () {
        test('a CheckboxInputElement', () {
          view = render(react.input({
            'type': 'checkbox',
            'name': 'business-in-front',
            'defaultChecked': true,
          }));

          shouldFail(
              view.getByRole('checkbox'),
              matcherFn('true'),
              contains('Which: is a checkbox/radio input, which cannot be used with a hasValue / hasDisplayValue '
                  'matcher. Use either the isChecked or hasFormValues matcher instead.'));
        });

        test('an element with role="checkbox"', () {
          view = render(react.div({
            'role': 'checkbox',
            'aria-checked': 'true',
          }));

          shouldFail(
              view.getByRole('checkbox'),
              matcherFn('true'),
              contains('Which: is a checkbox/radio input, which cannot be used with a hasValue / hasDisplayValue '
                  'matcher. Use either the isChecked or hasFormValues matcher instead.'));
        });

        test('a RadioInputElement', () {
          view = render(react.input({
            'type': 'radio',
            'name': 'business-in-front',
            'defaultChecked': true,
          }));

          shouldFail(
              view.getByRole('radio'),
              matcherFn('true'),
              contains('Which: is a checkbox/radio input, which cannot be used with a hasValue / hasDisplayValue '
                  'matcher. Use either the isChecked or hasFormValues matcher instead.'));
        });

        test('an element with role="radio"', () {
          view = render(react.div({
            'role': 'radio',
            'aria-checked': 'true',
          }));

          shouldFail(
              view.getByRole('radio'),
              matcherFn('true'),
              contains('Which: is a checkbox/radio input, which cannot be used with a hasValue / hasDisplayValue '
                  'matcher. Use either the isChecked or hasFormValues matcher instead.'));
        });
      });

      group('the provided value does not match the value found in a', () {
        test('TextInputElement', () {
          view = render(react.input({
            'type': 'text',
            'name': 'firstName',
            'defaultValue': 'John',
          }));

          shouldFail(
            view.getByRole('textbox'),
            matcherFn('Jane'),
            allOf(
              contains('Expected: An element with a $valueDescription of \'Jane\''),
              contains('Which: has element with value \'John\''),
            ),
          );
        });

        test('TextAreaElement', () {
          view = render(react.textarea({
            'name': 'comments',
            'defaultValue': 'I have nothing nice to say',
          }));

          shouldFail(
            view.getByRole('textbox'),
            matcherFn('I have something nice to say'),
            allOf(
              contains('Expected: An element with a $valueDescription of \'I have something nice to say\''),
              contains('Which: has element with value \'I have nothing nice to say\''),
            ),
          );
        });

        test('NumberInputElement', () {
          view = render(react.input({
            'type': 'number',
            'name': 'age',
            'defaultValue': 35,
          }));

          shouldFail(
            view.getByRole('spinbutton'),
            matcherFn(36),
            allOf(
              contains('Expected: An element with a $valueDescription of <36>'),
              contains('Which: has element with value <35>'),
            ),
          );
        });

        group('SelectElement', () {
          test('when only a single option can be selected', () {
            view = render(react.select(
              {
                'name': 'account-type',
                'defaultValue': 'business',
              },
              react.option({
                'value': 'personal',
              }, 'personal description'),
              react.option({
                'value': 'business',
              }, 'business description'),
            ));

            if (matcherFn == hasValue) {
              shouldFail(
                view.getByRole('combobox'),
                matcherFn('personal'),
                allOf(
                  contains('Expected: An element with a $valueDescription of \'personal\''),
                  contains('Which: has element with value \'business\''),
                ),
              );
            } else if (matcherFn == hasDisplayValue) {
              shouldFail(
                view.getByRole('combobox'),
                matcherFn('personal description'),
                allOf(
                  contains('Expected: An element with a $valueDescription of \'personal description\''),
                  contains('Which: has element with value \'business description\''),
                ),
              );
            }
          });

          test('when multiple options can be selected', () {
            view = render(react.select(
              {
                'name': 'pizza-toppings',
                'multiple': true,
                'defaultValue': ['pepperoni', 'sausage'],
              },
              react.option({
                'value': 'pepperoni',
              }, 'Delicious Pepperoni'),
              react.option({
                'value': 'sausage',
              }, 'Italian Sausage'),
              react.option({
                'value': 'pineapple',
                'disabled': true,
              }, 'Processed Sweetened Pineapple'),
            ));

            if (matcherFn == hasValue) {
              shouldFail(
                view.getByRole('listbox'),
                matcherFn(['pineapple', 'pepperoni']),
                allOf(
                  contains('Expected: An element with a $valueDescription of [\'pineapple\', \'pepperoni\']'),
                  contains('Which: has element with value [\'pepperoni\', \'sausage\'] which at '
                      'location [0] is \'pepperoni\' instead of \'pineapple\''),
                ),
              );
            } else if (matcherFn == hasDisplayValue) {
              shouldFail(
                view.getByRole('listbox'),
                matcherFn(['Processed Sweetened Pineapple', 'Delicious Pepperoni']),
                allOf(
                  contains('Expected: An element with a $valueDescription of '
                      '[\'Processed Sweetened Pineapple\', \'Delicious Pepperoni\']'),
                  contains('Which: has element with value [\'Delicious Pepperoni\', \'Italian Sausage\'] which at '
                      'location [0] is \'Delicious Pepperoni\' instead of \'Processed Sweetened Pineapple\''),
                ),
              );
            }
          });
        });
      });
    });
  });
}

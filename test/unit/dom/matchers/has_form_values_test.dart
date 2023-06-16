// @dart = 2.12

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

import 'dart:convert';

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement;
import 'package:react_testing_library/matchers.dart' show hasFormValues;
import 'package:react_testing_library/react_testing_library.dart' show render, RenderResult;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';
import '../../util/over_react_stubs.dart';

class _FormElemDefinition {
  final /*ReactDomComponentFactoryProxy*/ dynamic formElem;
  final Map<String, dynamic> props;
  dynamic children;

  _FormElemDefinition(this.formElem, [this.props = const {}, this.children]);
}

void main() {
  group('hasFormValues matcher', () {
    const rootElemTestId = 'root-of-test-form';
    RenderResult renderFormWithValues(
        /*ReactDomComponentFactoryProxy*/ dynamic rootElem,
        List<_FormElemDefinition> els) {
      assert(rootElem == react.form || rootElem == react.fieldset);

      final vDom = rootElem(
        {defaultTestIdKey: rootElemTestId},
        els.map((definition) {
          if (definition.children == null) {
            return definition.formElem(definition.props);
          }

          return definition.formElem(definition.props, definition.children);
        }),
      ) as ReactElement;

      return render(vDom);
    }

    late RenderResult view;

    group('passes when provided with a valid name/value combination for a', () {
      final unTestedChildFormElemThatShouldNotCauseFailure = _FormElemDefinition(react.input, {
        'type': 'text',
        'name': 'notTested',
        'defaultValue': 'does not matter',
        'key': 0,
      });

      group('TextInputElement', () {
        setUp(() {
          view = renderFormWithValues(react.form, [
            _FormElemDefinition(react.input, {
              'type': 'text',
              'name': 'firstName',
              'defaultValue': 'John',
            }),
            unTestedChildFormElemThatShouldNotCauseFailure,
          ]);
        });

        test('exact match', () {
          shouldPass(view.getByTestId(rootElemTestId), hasFormValues({'firstName': 'John'}));
        });

        test('fuzzy string matcher(s)', () {
          shouldPass(
              view.getByTestId(rootElemTestId),
              hasFormValues({
                'firstName': allOf(
                  startsWith('Jo'),
                  endsWith('hn'),
                )
              }));
        });
      });

      group('TextAreaElement', () {
        setUp(() {
          view = renderFormWithValues(react.form, [
            _FormElemDefinition(
              react.textarea,
              {
                'name': 'comment',
                'defaultValue': 'I am here to say something nice about you',
              },
            ),
            unTestedChildFormElemThatShouldNotCauseFailure,
          ]);
        });

        test('exact match', () {
          shouldPass(view.getByTestId(rootElemTestId),
              hasFormValues({'comment': 'I am here to say something nice about you'}));
        });

        test('fuzzy string matcher(s)', () {
          shouldPass(view.getByTestId(rootElemTestId), hasFormValues({'comment': contains('something nice')}));
        });
      });

      group('NumberInputElement', () {
        setUp(() {
          view = renderFormWithValues(react.form, [
            _FormElemDefinition(react.input, {
              'type': 'number',
              'name': 'age',
              'defaultValue': 35,
            }),
            unTestedChildFormElemThatShouldNotCauseFailure,
          ]);
        });

        test('exact match', () {
          shouldPass(view.getByTestId(rootElemTestId), hasFormValues({'age': 35}));
        });

        test('number matcher', () {
          shouldPass(view.getByTestId(rootElemTestId), hasFormValues({'age': greaterThan(18)}));
        });
      });

      group('CheckboxInputElement', () {
        test('when each has a unique name', () {
          view = renderFormWithValues(react.form, [
            _FormElemDefinition(react.input, {
              'type': 'checkbox',
              'name': 'business-in-front',
              'defaultChecked': true,
            }),
            _FormElemDefinition(react.input, {
              'type': 'checkbox',
              'name': 'party-in-the-back',
              'defaultChecked': false,
            }),
            _FormElemDefinition(react.input, {
              'type': 'checkbox',
              'name': 'has-mullet',
              'disabled': true,
              'defaultChecked': false,
            }),
            unTestedChildFormElemThatShouldNotCauseFailure,
          ]);

          shouldPass(
              view.getByTestId(rootElemTestId),
              hasFormValues({
                'business-in-front': isTrue,
                'party-in-the-back': isFalse,
                'has-mullet': isFalse,
              }));
        });

        group('when they have the same names', () {
          setUp(() {
            view = renderFormWithValues(react.form, [
              _FormElemDefinition(react.input, {
                'type': 'checkbox',
                'name': 'pizza-toppings',
                'value': 'pepperoni',
                'defaultChecked': true,
              }),
              _FormElemDefinition(react.input, {
                'type': 'checkbox',
                'name': 'pizza-toppings',
                'value': 'sausage',
                'defaultChecked': true,
              }),
              _FormElemDefinition(react.input, {
                'type': 'checkbox',
                'name': 'pizza-toppings',
                'value': 'black olives',
                'defaultChecked': true,
              }),
              _FormElemDefinition(react.input, {
                'type': 'checkbox',
                'name': 'pizza-toppings',
                'value': 'mushroom',
              }),
              _FormElemDefinition(react.input, {
                'type': 'checkbox',
                'name': 'pizza-toppings',
                'value': 'pineapple',
                'disabled': true,
              }),
              _FormElemDefinition(react.input, {
                'type': 'checkbox',
                'name': 'pizza-toppings',
                'value': 'bbq chicken',
                'disabled': true,
              }),
              unTestedChildFormElemThatShouldNotCauseFailure,
            ]);
          });

          test('exact match', () {
            shouldPass(
                view.getByTestId(rootElemTestId),
                hasFormValues({
                  'pizza-toppings': [
                    'pepperoni',
                    'sausage',
                    'black olives',
                  ],
                }));
          });

          test('fuzzy iterable matcher', () {
            shouldPass(
                view.getByTestId(rootElemTestId),
                hasFormValues({
                  'pizza-toppings': isNot(contains('pineapple')),
                }));
          });
        });
      });

      group('RadioInputElement', () {
        setUp(() {
          view = renderFormWithValues(react.form, [
            _FormElemDefinition(react.input, {
              'type': 'radio',
              'name': 'account-type',
              'value': 'personal',
              'defaultChecked': true,
            }),
            _FormElemDefinition(react.input, {
              'type': 'radio',
              'name': 'account-type',
              'value': 'business',
            }),
            unTestedChildFormElemThatShouldNotCauseFailure,
          ]);
        });

        test('exact match', () {
          shouldPass(
              view.getByTestId(rootElemTestId),
              hasFormValues({
                'account-type': 'personal',
              }));
        });
      });

      group('SelectElement', () {
        group('when only a single option can be selected', () {
          group('and a single option is selected', () {
            test('exact match', () {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.select, {
                  'name': 'account-type',
                  'defaultValue': 'business',
                }, [
                  react.option({
                    'key': 1,
                    'value': 'personal',
                  }, 'personal'),
                  react.option({
                    'key': 2,
                    'value': 'business',
                  }, 'business'),
                ]),
                unTestedChildFormElemThatShouldNotCauseFailure,
              ]);

              shouldPass(
                  view.getByTestId(rootElemTestId),
                  hasFormValues({
                    'account-type': 'business',
                  }));
            });

            test('using a matcher', () {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.select, {
                  'name': 'account-type',
                }, [
                  react.option({
                    'key': 1,
                    'value': 'personal',
                  }, 'personal'),
                  react.option({
                    'key': 2,
                    'value': 'business',
                  }, 'business'),
                ]),
                unTestedChildFormElemThatShouldNotCauseFailure,
              ]);

              shouldPass(
                  view.getByTestId(rootElemTestId),
                  hasFormValues({
                    'account-type': allOf(isNotNull, isNot('business')),
                  }));
            });
          });

          test('and no option is selected', () {
            view = renderFormWithValues(react.form, [
              _FormElemDefinition(react.select, {
                'name': 'account-type',
              }, [
                react.option({
                  'key': 1,
                  'value': 'personal',
                  'disabled': true,
                }, 'personal'),
                react.option({
                  'key': 2,
                  'value': 'business',
                  'disabled': true,
                }, 'business'),
              ]),
              unTestedChildFormElemThatShouldNotCauseFailure,
            ]);

            shouldPass(
                view.getByTestId(rootElemTestId),
                hasFormValues({
                  'account-type': isNull,
                }));
          });
        });

        group('when multiple options can be selected', () {
          group('and a single option is selected', () {
            setUp(() {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.select, {
                  'name': 'pizza-toppings',
                  'multiple': true,
                  'defaultValue': ['sausage'],
                  'key': 4,
                }, [
                  react.option({
                    'key': 1,
                    'value': 'pepperoni',
                  }, 'pepperoni'),
                  react.option({
                    'key': 2,
                    'value': 'sausage',
                  }, 'sausage'),
                  react.option({
                    'key': 13,
                    'value': 'pineapple',
                    'disabled': true,
                  }, 'pineapple'),
                ]),
                unTestedChildFormElemThatShouldNotCauseFailure,
              ]);
            });

            test('exact match', () {
              shouldPass(
                  view.getByTestId(rootElemTestId),
                  hasFormValues({
                    'pizza-toppings': ['sausage'],
                  }));
            });

            test('using a matcher', () {
              shouldPass(
                  view.getByTestId(rootElemTestId),
                  hasFormValues({
                    'pizza-toppings': allOf(isNotEmpty, isNot('pineapple')),
                  }));
            });
          });

          group('and multiple options are selected', () {
            setUp(() {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.select, {
                  'name': 'pizza-toppings',
                  'multiple': true,
                  'defaultValue': ['pepperoni', 'sausage'],
                  'key': 4,
                }, [
                  react.option({
                    'key': 1,
                    'value': 'pepperoni',
                  }, 'pepperoni'),
                  react.option({
                    'key': 2,
                    'value': 'sausage',
                  }, 'sausage'),
                  react.option({
                    'key': 13,
                    'value': 'pineapple',
                    'disabled': true,
                  }, 'pineapple'),
                ]),
                unTestedChildFormElemThatShouldNotCauseFailure,
              ]);
            });

            test('exact match', () {
              shouldPass(
                  view.getByTestId(rootElemTestId),
                  hasFormValues({
                    'pizza-toppings': ['pepperoni', 'sausage'],
                  }));
            });

            test('using a matcher', () {
              shouldPass(
                  view.getByTestId(rootElemTestId),
                  hasFormValues({
                    'pizza-toppings': unorderedEquals(['sausage', 'pepperoni']),
                  }));
            });
          });

          test('and no option is selected', () {
            view = renderFormWithValues(react.form, [
              _FormElemDefinition(react.select, {
                'name': 'pizza-toppings',
                'multiple': true,
              }, [
                react.option({
                  'key': 1,
                  'value': 'white sauce',
                  'disabled': true,
                }, 'white sauce'),
                react.option({
                  'key': 2,
                  'value': 'bbq chicken',
                  'disabled': true,
                }, 'bbq chicken'),
                react.option({
                  'key': 13,
                  'value': 'pineapple',
                  'disabled': true,
                }, 'pineapple'),
              ]),
              unTestedChildFormElemThatShouldNotCauseFailure,
            ]);

            shouldPass(
                view.getByTestId(rootElemTestId),
                hasFormValues({
                  'pizza-toppings': isEmpty,
                }));
          });
        });
      });
    });

    group('provides a useful failure message when', () {
      test('the first argument of `expect()` is not a valid HTML Element', () {
        shouldFail('Not an HTML Element', hasFormValues({'something': 'anything'}),
            contains('Which: $notAnElementMismatchDescription'));
      });

      group('provided with a valid name/value combination for a', () {
        Matcher getMatcherForExpectedCustomMatcherMessage({required Map expected, required Map actual}) {
          final expectedFormValuesAsMatcherToStringValue = json
              .encode(expected)
              .replaceAll(',', ', ')
              .replaceAllMapped(
                  RegExp(r':("*)(\D+)("*)\}'), (match) => ': <${match.group(1)}${match.group(2)}${match.group(3)}>}')
              .replaceAllMapped(RegExp(r':(\d+)'), (match) => ': <<${match.group(1)}>>');
          final actualFormValuesAsMatcherToStringValue =
              json.encode(actual).replaceAll(':', ': ').replaceAll(',', ', ');
          return allOf(
            contains(
              'Expected: A form or fieldset with elements matching $expectedFormValuesAsMatcherToStringValue '
              'Actual: FormElement:<form> Which: has elements with value $actualFormValuesAsMatcherToStringValue',
            ),
            contains('The DOM at time of failure is shown below:'),
            contains('<form $defaultTestIdKey="$rootElemTestId"'),
            actual.isEmpty ? contains('No elements were found with names matching ${expected.keys}.') : null,
          );
        }

        test('element which has a name not used as a key in the provided map', () {
          view = renderFormWithValues(react.form, [
            _FormElemDefinition(react.input, {
              'type': 'text',
              'name': 'firstName',
              'defaultValue': 'John',
            }),
          ]);

          shouldFail(
            view.getByTestId(rootElemTestId),
            hasFormValues({'lastName': 'Doe'}),
            getMatcherForExpectedCustomMatcherMessage(expected: {'lastName': 'Doe'}, actual: {}),
            useDoubleQuotes: true,
          );
        });

        group('which has a name found in the provided map, but different value(s):', () {
          test('TextInputElement', () {
            view = renderFormWithValues(react.form, [
              _FormElemDefinition(react.input, {
                'type': 'text',
                'name': 'firstName',
                'defaultValue': 'John',
              }),
            ]);

            shouldFail(
              view.getByTestId(rootElemTestId),
              hasFormValues({'firstName': 'Jane'}),
              getMatcherForExpectedCustomMatcherMessage(expected: {'firstName': 'Jane'}, actual: {'firstName': 'John'}),
              useDoubleQuotes: true,
            );
          });

          test('TextAreaElement', () {
            view = renderFormWithValues(react.form, [
              _FormElemDefinition(react.textarea, {
                'name': 'comments',
                'defaultValue': 'I have nothing nice to say',
              }),
            ]);

            shouldFail(
              view.getByTestId(rootElemTestId),
              hasFormValues({'comments': 'I have something nice to say'}),
              getMatcherForExpectedCustomMatcherMessage(
                  expected: {'comments': 'I have something nice to say'},
                  actual: {'comments': 'I have nothing nice to say'}),
              useDoubleQuotes: true,
            );
          });

          test('NumberInputElement', () {
            view = renderFormWithValues(react.form, [
              _FormElemDefinition(react.input, {
                'type': 'number',
                'name': 'age',
                'defaultValue': 35,
              }),
            ]);

            shouldFail(
              view.getByTestId(rootElemTestId),
              hasFormValues({'age': 36}),
              getMatcherForExpectedCustomMatcherMessage(expected: {'age': 36}, actual: {'age': 35}),
              useDoubleQuotes: true,
            );
          });

          group('CheckboxInputElement', () {
            test('when each has a unique name', () {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'business-in-front',
                  'defaultChecked': true,
                }),
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'party-in-the-back',
                  'defaultChecked': false,
                }),
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'has-mullet',
                  'disabled': true,
                  'defaultChecked': false,
                }),
              ]);

              shouldFail(
                view.getByTestId(rootElemTestId),
                hasFormValues({'business-in-front': isFalse}),
                getMatcherForExpectedCustomMatcherMessage(
                    expected: {'business-in-front': false}, actual: {'business-in-front': true}),
                useDoubleQuotes: true,
              );
            });

            test('when they have the same names', () {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'pizza-toppings',
                  'value': 'pepperoni',
                  'defaultChecked': true,
                }),
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'pizza-toppings',
                  'value': 'sausage',
                  'defaultChecked': true,
                }),
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'pizza-toppings',
                  'value': 'black olives',
                  'defaultChecked': true,
                }),
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'pizza-toppings',
                  'value': 'mushroom',
                }),
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'pizza-toppings',
                  'value': 'pineapple',
                  'disabled': true,
                }),
                _FormElemDefinition(react.input, {
                  'type': 'checkbox',
                  'name': 'pizza-toppings',
                  'value': 'bbq chicken',
                  'disabled': true,
                }),
              ]);

              shouldFail(
                view.getByTestId(rootElemTestId),
                hasFormValues({
                  'pizza-toppings': ['pineapple', 'bbq chicken']
                }),
                getMatcherForExpectedCustomMatcherMessage(
                  expected: {
                    'pizza-toppings': [
                      'pineapple',
                      'bbq chicken',
                    ],
                  },
                  actual: {
                    'pizza-toppings': [
                      'pepperoni',
                      'sausage',
                      'black olives',
                    ],
                  },
                ),
                useDoubleQuotes: true,
              );
            });
          });

          test('RadioInputElement', () {
            view = renderFormWithValues(react.form, [
              _FormElemDefinition(react.input, {
                'type': 'radio',
                'name': 'account-type',
                'value': 'personal',
                'defaultChecked': true,
              }),
              _FormElemDefinition(react.input, {
                'type': 'radio',
                'name': 'account-type',
                'value': 'business',
              }),
            ]);

            shouldFail(
              view.getByTestId(rootElemTestId),
              hasFormValues({'account-type': 'business'}),
              getMatcherForExpectedCustomMatcherMessage(
                  expected: {'account-type': 'business'}, actual: {'account-type': 'personal'}),
              useDoubleQuotes: true,
            );
          });

          group('SelectElement', () {
            test('when only a single option can be selected', () {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.select, {
                  'name': 'account-type',
                  'defaultValue': 'business',
                }, [
                  react.option({
                    'key': 1,
                    'value': 'personal',
                  }, 'personal'),
                  react.option({
                    'key': 2,
                    'value': 'business',
                  }, 'business'),
                ]),
              ]);

              shouldFail(
                view.getByTestId(rootElemTestId),
                hasFormValues({'account-type': 'personal'}),
                getMatcherForExpectedCustomMatcherMessage(
                    expected: {'account-type': 'personal'}, actual: {'account-type': 'business'}),
                useDoubleQuotes: true,
              );
            });

            test('when multiple options can be selected', () {
              view = renderFormWithValues(react.form, [
                _FormElemDefinition(react.select, {
                  'name': 'pizza-toppings',
                  'multiple': true,
                  'defaultValue': ['pepperoni', 'sausage'],
                }, [
                  react.option({
                    'key': 1,
                    'value': 'pepperoni',
                  }, 'pepperoni'),
                  react.option({
                    'key': 2,
                    'value': 'sausage',
                  }, 'sausage'),
                  react.option({
                    'key': 13,
                    'value': 'pineapple',
                    'disabled': true,
                  }, 'pineapple'),
                ]),
              ]);

              shouldFail(
                view.getByTestId(rootElemTestId),
                hasFormValues({
                  'pizza-toppings': ['pineapple', 'pepperoni']
                }),
                getMatcherForExpectedCustomMatcherMessage(
                  expected: {
                    'pizza-toppings': [
                      'pineapple',
                      'pepperoni',
                    ],
                  },
                  actual: {
                    'pizza-toppings': [
                      'pepperoni',
                      'sausage',
                    ],
                  },
                ),
                useDoubleQuotes: true,
              );
            });
          });
        });
      });
    });
  });
}

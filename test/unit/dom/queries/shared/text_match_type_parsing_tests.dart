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

import 'package:meta/meta.dart';
import 'package:react_testing_library/react_testing_library.dart'
    show NormalizerFn, NormalizerOptions, getDefaultNormalizer;
import 'package:react_testing_library/src/dom/matches/types.dart' show TextMatch;
import 'package:test/test.dart';

import '../../../util/constants.dart';
import '../../../util/enums.dart';
import '../../../util/matchers.dart';
import '../../../util/rendering.dart';

String getStringThatFuzzyMatches(String exactValue) => exactValue.substring(2);

/// Tests both success and failure scenarios for queries with [textMatchArgName] that utilize
/// [TextMatch.toJs] to allow `String`, `RegExp` and `Function`s as values to find one or more
/// matches of type [E] for [queryShouldMatchOn].
///
/// Exercises the 3 types of queries (queryBy, getBy and findBy) - which should be returned from
/// the value of each key in [scopedQueryQueriesByName], [scopedGetQueriesByName] and [scopedFindQueriesByName],
/// respectively. When testing the top level API / queries instead of "scoped" queries like
/// `within()` or `RenderResult` - use [topLevelQueryQueriesByName], [topLevelGetQueriesByName]
/// and [topLevelFindQueriesByName] instead, and set [getContainerForTopLevelQueries] as well.
///
/// [getExpectedPrettyDom] should return the return value of calling `prettyDOM` with
/// the `container` of a `RenderResult` like so:
///
/// ```dart
/// getExpectedPrettyDom: () => prettyDOM(someRenderResult.container)
/// ```
///
/// For tests that exercise failure scenarios, provide a [failureSnapshotPattern] that
/// represents what the error message displayed to the user should contain, using
/// the [valueNotFoundPlaceholder] within the pattern to represent where the value of
/// the argument named [textMatchArgName] should be in the message. Check out some
/// uses of `testTextMatchTypes` in places like `hasQueriesScopedTo()` for practical examples.
///
/// If the query does not support `MatcherOptions.exact`, set [textMatchArgSupportsFuzzyMatching] to `false`.
@isTestGroup
void testTextMatchTypes<E extends Element>(
  QueryType queryType, {
  @required TextMatchArgName textMatchArgName,
  @required String queryShouldMatchOn,
  @required String Function() getExpectedPrettyDom,
  Map<String, Function Function({bool renderMultipleElsMatchingQuery})> scopedQueryQueriesByName = const {},
  Map<String, Function Function({bool renderMultipleElsMatchingQuery})> scopedGetQueriesByName = const {},
  Map<String, Function Function({bool renderMultipleElsMatchingQuery})> scopedFindQueriesByName = const {},
  Map<String, Function Function({bool renderMultipleElsMatchingQuery})> topLevelQueryQueriesByName = const {},
  Map<String, Function Function({bool renderMultipleElsMatchingQuery})> topLevelGetQueriesByName = const {},
  Map<String, Function Function({bool renderMultipleElsMatchingQuery})> topLevelFindQueriesByName = const {},
  Node Function() getContainerForTopLevelQueries,
  bool textMatchArgSupportsFuzzyMatching = true,
  String failureSnapshotPattern,
}) {
  const queryShouldNotMatchOn = 'somethingDifferentThatDoesNotMatch';

  final scopedQueriesByName = {
    ...scopedQueryQueriesByName,
    ...scopedGetQueriesByName,
    ...scopedFindQueriesByName,
  };

  final topLevelQueriesByName = {
    ...topLevelQueryQueriesByName,
    ...topLevelGetQueriesByName,
    ...topLevelFindQueriesByName,
  };

  if (scopedQueriesByName.isNotEmpty) {
    assert(topLevelQueriesByName.isEmpty);
  }

  if (topLevelQueriesByName.isNotEmpty) {
    assert(scopedQueriesByName.isEmpty);
    assert(getContainerForTopLevelQueries != null);
  }

  Matcher toThrowErrorMatchingInlineSnapshotPattern(String valueExpectedButNotFound) {
    Matcher containsMatcher;
    if (failureSnapshotPattern != null) {
      containsMatcher = buildContainsPatternUsing(failureSnapshotPattern, valueExpectedButNotFound);
    } else {
      containsMatcher = contains(valueExpectedButNotFound);
    }

    // When running only a single test, if the query is an async one,
    // RenderResult.container will not be accurate when called - so `expectedPrettyDom` will be null.
    final expectedPrettyDom = getExpectedPrettyDom();
    final stringPrettyDomMatcher = expectedPrettyDom != null ? contains(expectedPrettyDom) : null;
    return toThrowErrorMatchingInlineSnapshot(
        containsMatcher, stringPrettyDomMatcher, isNot(contains('return dart.dcall')));
  }

  Matcher getExpectedMatcherForFailedQuery(String queryName) {
    return queryName.contains('All') ? isEmpty : isNull;
  }

  Matcher getExpectedMatcherForSuccessfulQuery(String queryName, {bool multipleMatchesExpected = false}) {
    if (queryName.contains('All')) {
      if (multipleMatchesExpected) {
        return allOf(isA<List<E>>(), hasLength(2));
      }
      return isA<List<E>>();
    }

    return isA<E>();
  }

  @isTest
  void textMatchShouldFailFor< /*TextMatch*/ T>(
    String queryName,
    Function Function({bool renderMultipleElsMatchingQuery}) queryGetter, {
    @required T valueThatShouldCauseFailure,
    bool exact = true,
    bool containerArgRequired = false,
    String snapshotPatternForFailureMatcher,
    Matcher failureMatcher,
  }) {
    if (valueThatShouldCauseFailure is String) {
      snapshotPatternForFailureMatcher ??= valueThatShouldCauseFailure;
    } else if (snapshotPatternForFailureMatcher == null && failureMatcher == null) {
      throw ArgumentError(
          'snapshotPatternForFailureMatcher must be specified when valueThatShouldCauseFailure is not a String and the failureMatcher argument is not set.');
    }

    test('$queryName query', () async {
      String queryFnString;
      final queryFn = queryGetter();
      final container = getContainerForTopLevelQueries?.call();
      dynamic Function() getQueryResult;

      if (queryType != QueryType.Role) {
        getQueryResult = () => containerArgRequired
            ? queryFn(container, valueThatShouldCauseFailure, exact: exact)
            : queryFn(valueThatShouldCauseFailure, exact: exact);
        queryFnString = '$queryName($valueThatShouldCauseFailure, exact: $exact)';
      } else {
        if (textMatchArgName == TextMatchArgName.name) {
          getQueryResult = () => containerArgRequired
              ? queryFn(container, validRoleInDom, name: valueThatShouldCauseFailure, exact: exact)
              : queryFn(validRoleInDom, name: valueThatShouldCauseFailure, exact: exact);
          queryFnString = '$queryName($validRoleInDom, name: $valueThatShouldCauseFailure, exact: $exact)';
        } else if (textMatchArgName == TextMatchArgName.role) {
          // The ByRole queries return slightly different error messages if the value passed
          // for the role argument is not a valid role at all, so we'll split out the tests here
          // to test both cases:
          //
          //   [1] when a valid role that is not found in the document is provided
          //   [2] when an invalid role is provided (tested in the individual test suite for role queries)
          dynamic roleValueThatShouldCauseFailure;
          if (valueThatShouldCauseFailure is String) {
            roleValueThatShouldCauseFailure = validRoleNotInDom;
            snapshotPatternForFailureMatcher = validRoleNotInDom;
          } else if (valueThatShouldCauseFailure is RegExp) {
            roleValueThatShouldCauseFailure = RegExp('^$validRoleNotInDom\$');
            snapshotPatternForFailureMatcher = 'RegExp/^$validRoleNotInDom\$/';
          } else if (valueThatShouldCauseFailure is Function) {
            roleValueThatShouldCauseFailure = (content, el) => content == validRoleNotInDom;
          }

          getQueryResult = () => containerArgRequired
              ? queryFn(container, roleValueThatShouldCauseFailure, exact: exact)
              : queryFn(roleValueThatShouldCauseFailure, exact: exact);
          queryFnString = '$queryName($roleValueThatShouldCauseFailure, exact: $exact)';
        }
      }

      if (queryName.startsWith('query')) {
        // queryBy* queries should return null / an empty list in a failure scenario
        expect(getQueryResult(), getExpectedMatcherForFailedQuery(queryName),
            reason: '\nCalling the following query should not have returned any elements:\n\n$queryFnString');
      } else {
        // getBy* / findBy* queries should throw in a failure scenario
        expect(() => getQueryResult(),
            failureMatcher ?? toThrowErrorMatchingInlineSnapshotPattern(snapshotPatternForFailureMatcher),
            reason: '\nCalling the following query should have thrown:\n\n$queryFnString');
      }
    }, timeout: asyncQueryTestTimeout);
  }

  @isTest
  void textMatchShouldSucceedFor< /*TextMatch*/ T>(
    String queryName,
    Function Function({bool renderMultipleElsMatchingQuery}) queryGetter, {
    @required T valueThatShouldCauseSuccess,
    bool exact = true,
    NormalizerFn Function([NormalizerOptions]) normalizer,
    bool containerArgRequired = false,
  }) {
    String queryFnString;
    Function queryFn;
    Node container;
    dynamic Function() getQueryResult;

    void sharedSetup({bool renderMultipleElsMatchingQuery = false}) {
      queryFn = queryGetter(renderMultipleElsMatchingQuery: renderMultipleElsMatchingQuery);
      container = getContainerForTopLevelQueries?.call();
      if (queryType != QueryType.Role) {
        getQueryResult = () => containerArgRequired
            ? queryFn(container, valueThatShouldCauseSuccess, exact: exact, normalizer: normalizer)
            : queryFn(valueThatShouldCauseSuccess, exact: exact, normalizer: normalizer);
        queryFnString = '$queryName($valueThatShouldCauseSuccess, exact: $exact)';
      } else {
        if (textMatchArgName == TextMatchArgName.name) {
          getQueryResult = () => containerArgRequired
              ? queryFn(
                  container,
                  validRoleInDom,
                  name: valueThatShouldCauseSuccess,
                  exact: exact,
                  normalizer: normalizer,
                )
              : queryFn(
                  validRoleInDom,
                  name: valueThatShouldCauseSuccess,
                  exact: exact,
                  normalizer: normalizer,
                );
          queryFnString = '$queryName($validRoleInDom, name: $valueThatShouldCauseSuccess, exact: $exact)';
        } else if (textMatchArgName == TextMatchArgName.role) {
          dynamic roleValueThatShouldCauseSuccess;
          if (valueThatShouldCauseSuccess is String) {
            roleValueThatShouldCauseSuccess = validRoleInDom;
          } else if (valueThatShouldCauseSuccess is RegExp) {
            roleValueThatShouldCauseSuccess = RegExp('^$validRoleInDom\$');
          } else if (valueThatShouldCauseSuccess is Function) {
            roleValueThatShouldCauseSuccess = (content, el) => content == validRoleInDom;
          }

          getQueryResult = () => containerArgRequired
              ? queryFn(container, roleValueThatShouldCauseSuccess, exact: exact, normalizer: normalizer)
              : queryFn(roleValueThatShouldCauseSuccess, exact: exact, normalizer: normalizer);
          queryFnString = '$queryName($roleValueThatShouldCauseSuccess, exact: $exact)';
        }
      }
    }

    tearDown(() {
      queryFnString = null;
      queryFn = null;
      container = null;
      getQueryResult = null;
    });

    test('$queryName query [single element matched]', () async {
      sharedSetup(renderMultipleElsMatchingQuery: false);

      expect(await getQueryResult(), getExpectedMatcherForSuccessfulQuery(queryName),
          reason: '\nCalling the following query should have returned a single element:\n\n$queryFnString');
    }, timeout: asyncQueryTestTimeout);

    if (!exact) {
      group('$queryName query [multiple elements matched]', () {
        setUp(() {
          sharedSetup(renderMultipleElsMatchingQuery: true);
        });

        if (queryName.contains('AllBy')) {
          test('', () async {
            expect(
                await getQueryResult(), getExpectedMatcherForSuccessfulQuery(queryName, multipleMatchesExpected: true),
                reason: '\nCalling the following query should have returned more than one element:\n\n$queryFnString');
          }, timeout: asyncQueryTestTimeout);
        } else {
          test('unless only a single element is expected', () async {
            expect(
                () => getQueryResult(),
                throwsA(allOf(
                  hasToStringValue(contains('Found multiple elements')),
                  hasToStringValue(contains(getExpectedPrettyDom())),
                )),
                reason:
                    '\nCalling the following query should have thrown as a result of more than one matching element being found:\n\n$queryFnString');
          }, timeout: asyncQueryTestTimeout);
        }
      });
    }
  }

  group('when the $textMatchArgName argument is a', () {
    group('String (TextMatch.toJs),', () {
      final fuzzyValue = getStringThatFuzzyMatches(queryShouldMatchOn);

      group('and exact = true (default),', () {
        group('and a failure/null or empty return value is expected for the', () {
          scopedQueriesByName.forEach((queryName, queryGetter) {
            textMatchShouldFailFor(queryName, queryGetter, valueThatShouldCauseFailure: fuzzyValue);
          });

          topLevelQueriesByName.forEach((queryName, queryGetter) {
            textMatchShouldFailFor(queryName, queryGetter,
                valueThatShouldCauseFailure: fuzzyValue, containerArgRequired: true);
          });
        });

        group('returning the matching element(s) from the', () {
          scopedQueriesByName.forEach((queryName, queryGetter) {
            textMatchShouldSucceedFor(queryName, queryGetter, valueThatShouldCauseSuccess: queryShouldMatchOn);
          });

          topLevelQueriesByName.forEach((queryName, queryGetter) {
            textMatchShouldSucceedFor(queryName, queryGetter,
                valueThatShouldCauseSuccess: queryShouldMatchOn, containerArgRequired: true);
          });
        });
      });

      if (textMatchArgSupportsFuzzyMatching) {
        group('and exact = false,', () {
          group('and a failure/null return value is expected when calling the', () {
            scopedQueriesByName.forEach((queryName, queryGetter) {
              textMatchShouldFailFor(queryName, queryGetter,
                  valueThatShouldCauseFailure: 'somethingDifferentThatDoesNotMatch', exact: false);
            });

            topLevelQueriesByName.forEach((queryName, queryGetter) {
              textMatchShouldFailFor(queryName, queryGetter,
                  valueThatShouldCauseFailure: 'somethingDifferentThatDoesNotMatch',
                  exact: false,
                  containerArgRequired: true);
            });
          });

          group('returning the matching element(s) from the', () {
            scopedQueriesByName.forEach((queryName, queryGetter) {
              textMatchShouldSucceedFor(queryName, queryGetter, valueThatShouldCauseSuccess: fuzzyValue, exact: false);
            });

            topLevelQueriesByName.forEach((queryName, queryGetter) {
              textMatchShouldSucceedFor(queryName, queryGetter,
                  valueThatShouldCauseSuccess: fuzzyValue, exact: false, containerArgRequired: true);
            });
          });
        });
      }

      group('and normalizer is customized', () {
        group('returning the matching element(s) from the', () {
          scopedQueriesByName.forEach((queryName, queryGetter) {
            textMatchShouldSucceedFor(
              queryName,
              queryGetter,
              valueThatShouldCauseSuccess: queryShouldMatchOn,
              normalizer: getDefaultNormalizer(),
            );
          });

          topLevelQueriesByName.forEach((queryName, queryGetter) {
            textMatchShouldSucceedFor(
              queryName,
              queryGetter,
              valueThatShouldCauseSuccess: queryShouldMatchOn,
              normalizer: getDefaultNormalizer(),
              containerArgRequired: true,
            );
          });
        });
      });
    });

    group('RegExp (TextMatch.toJs),', () {
      group('and a failure/null return value is expected for the', () {
        const badRegExPattern = '^$queryShouldNotMatchOn\$';

        scopedQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldFailFor(queryName, queryGetter,
              valueThatShouldCauseFailure: RegExp(badRegExPattern),
              snapshotPatternForFailureMatcher: 'RegExp/$badRegExPattern/');
        });

        topLevelQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldFailFor(queryName, queryGetter,
              valueThatShouldCauseFailure: RegExp(badRegExPattern),
              snapshotPatternForFailureMatcher: 'RegExp/$badRegExPattern/',
              containerArgRequired: true);
        });
      });

      group('returning the matching element(s) from the', () {
        scopedQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldSucceedFor(queryName, queryGetter,
              valueThatShouldCauseSuccess: RegExp('^$queryShouldMatchOn\$'));
        });

        topLevelQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldSucceedFor(queryName, queryGetter,
              valueThatShouldCauseSuccess: RegExp('^$queryShouldMatchOn\$'), containerArgRequired: true);
        });
      });
    });

    group('Function (TextMatch.toJs),', () {
      group('and a failure/null return value is expected for the', () {
        scopedQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldFailFor(queryName, queryGetter,
              valueThatShouldCauseFailure: (content, el) => content == queryShouldNotMatchOn,
              snapshotPatternForFailureMatcher: TextMatch.functionValueErrorMessage);
        });

        topLevelQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldFailFor(queryName, queryGetter,
              valueThatShouldCauseFailure: (content, el) => content == queryShouldNotMatchOn,
              snapshotPatternForFailureMatcher: TextMatch.functionValueErrorMessage,
              containerArgRequired: true);
        });
      });

      group('returning the matching element(s) from the', () {
        scopedQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldSucceedFor(queryName, queryGetter,
              valueThatShouldCauseSuccess: (content, el) => content == queryShouldMatchOn);
        });

        topLevelQueriesByName.forEach((queryName, queryGetter) {
          textMatchShouldSucceedFor(queryName, queryGetter,
              valueThatShouldCauseSuccess: (content, el) => content == queryShouldMatchOn, containerArgRequired: true);
        });
      });
    });
  });
}

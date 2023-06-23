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

@JS()
library react_testing_library.src.dom.accessibility;

import 'dart:html' show Node, Element;

import 'package:js/js.dart';
import 'package:react/react_client/js_backed_map.dart';
import 'package:react/react_client/js_interop_helpers.dart';
import 'package:react_testing_library/src/util/console_log_utils.dart';

/// Returns a map, indexed by role name, with each value being an array of
/// elements in [container] which have that implicit ARIA role.
///
/// See [ARIA in HTML](https://www.w3.org/TR/html-aria/#document-conformance-requirements-for-use-of-aria-attributes-in-html) for more information about implicit ARIA roles.
///
/// Set [hidden] to `true` to include elements that are normally [excluded from the accessibility tree](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion).
///
/// > Learn more: <https://testing-library.com/docs/dom-testing-library/api-accessibility/#getroles>
///
/// {@category Accessibility}
Map<String, List> getRoles(Node? container, {bool hidden = false}) =>
    Map.from(JsBackedMap.fromJs(_getRoles(container, jsifyAndAllowInterop({'hidden': hidden}) as JsMap)));

/// Prints a list of all the implicit ARIA roles within [container], each role containing a list of all of the
/// nodes which match that role.
///
/// This can be helpful for finding ways to query the DOM under test with [ByRole queries](https://workiva.github.io/react_testing_library/topics/ByRole-topic.html).
///
/// Set [hidden] to `true` to include elements that are normally [excluded from the accessibility tree](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion).
///
/// > Learn more: <https://testing-library.com/docs/dom-testing-library/api-accessibility/#logroles>
///
/// {@category Accessibility}
void logRoles(Node? container, {bool hidden = false}) =>
    printConsoleLogs(() => _logRoles(container, jsifyAndAllowInterop({'hidden': hidden}) as JsMap));

@JS('rtl.getRoles')
external JsMap _getRoles(
  Node? container,
  JsMap options,
);

/// Returns whether or not [element] should be excluded from the accessibility
/// API by the browser.
///
/// It implements every MUST criteria from the [Excluding Elements from the Accessibility Tree](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion)
/// section in WAI-ARIA 1.2 with the exception of checking the role attribute.
///
/// > Learn more: <https://testing-library.com/docs/dom-testing-library/api-accessibility/#isinaccessible>
///
/// {@category Accessibility}
@JS('rtl.isInaccessible')
external bool isInaccessible(Element element);

@JS('rtl.logRoles')
external JsMap _logRoles(
  Node? dom,
  JsMap options,
);

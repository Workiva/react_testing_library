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

import 'dart:html' show document;

import 'package:react_testing_library/src/dom/within.dart' show within;

/// Exposes all the "top-level" queries exposed by the dom-testing-library,
/// but the scope/container is defaulted to `document.body`.
///
/// > See: <https://testing-library.com/docs/queries/about/#screen>
///
/// {@category Queries}
final screen = within(document.body);

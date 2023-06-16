// @dart = 2.18

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

/// A collection of Dart [Matcher]s to use when unit testing React components using the `react_testing_library`.
///
/// Includes all the [Matcher]s found in the
/// [JS `jest-dom` package](https://testing-library.com/docs/ecosystem-jest-dom), which is an integral part of
/// the testing-library's ecosystem.
///
/// {@category Matchers}
library matchers;

import 'package:matcher/matcher.dart';

export 'src/matchers/jest_dom.dart';

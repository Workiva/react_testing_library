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

import 'dart:html' show Node;

import 'package:meta/meta.dart';
import 'package:react_testing_library/src/dom/queries/by_alt_text.dart' show ByAltTextQueries;
import 'package:react_testing_library/src/dom/queries/by_display_value.dart' show ByDisplayValueQueries;
import 'package:react_testing_library/src/dom/queries/by_label_text.dart' show ByLabelTextQueries;
import 'package:react_testing_library/src/dom/queries/by_placeholder_text.dart' show ByPlaceholderTextQueries;
import 'package:react_testing_library/src/dom/queries/by_role.dart' show ByRoleQueries;
import 'package:react_testing_library/src/dom/queries/by_testid.dart' show ByTestIdQueries;
import 'package:react_testing_library/src/dom/queries/by_text.dart' show ByTextQueries;
import 'package:react_testing_library/src/dom/queries/by_title.dart' show ByTitleQueries;
import 'package:react_testing_library/src/dom/queries/interface.dart' show IQueries;

/// PRIVATE. DO NOT EXPORT.
///
/// Only visible for the purposes of extension by specific
/// querying objects like `RenderResult` and `_WithinQueries`.
abstract class ScopedQueries
    with
        IQueries,
        ByAltTextQueries,
        ByDisplayValueQueries,
        ByLabelTextQueries,
        ByPlaceholderTextQueries,
        ByRoleQueries,
        ByTestIdQueries,
        ByTextQueries,
        ByTitleQueries {
  ScopedQueries(this.getContainerForScope);

  @protected
  @override
  final Node Function() getContainerForScope;
}

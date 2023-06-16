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

library react_testing_library.src.user_event.special_chars;

import 'package:meta/meta.dart';

import 'user_event.dart';

/// A handful of special characters used in [UserEvent.type].
///
/// > See: <https://testing-library.com/docs/ecosystem-user-event/#specialchars>
@sealed
abstract class SpecialChars {
  static const String arrowLeft = '{arrowleft}';
  static const String arrowRight = '{arrowright}';
  static const String arrowDown = '{arrowdown}';
  static const String arrowUp = '{arrowup}';
  static const String enter = '{enter}';
  static const String escape = '{esc}';
  static const String delete = '{del}';
  static const String backspace = '{backspace}';
  static const String home = '{home}';
  static const String end = '{end}';
  static const String selectAll = '{selectall}';
  static const String space = '{space}';
  static const String whitespace = ' ';
}


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

import 'dart:async';

import 'package:meta/meta.dart';
import 'package:react_testing_library/src/util/console_log_utils.dart';

/// Runs a provided [callback] and returns the print statements captured during the runtime
/// of that function.
List<String> recordPrintCalls(void Function() callback) {
  final printCalls = <String>[];
  spyOnPrintCalls(callback, onPrint: printCalls.add);
  return printCalls;
}

/// Runs a provided [callback] and returns the print statements captured during the runtime
/// of that function, and also catches errors.
void spyOnPrintCalls(void Function() callback, {@required void Function(String) onPrint}) {
  // Bind to the current zone so the callback isn't called in our child zone.
  final boundOnPrint = Zone.current.bindUnaryCallback(onPrint);
  Zone.current.fork(specification: ZoneSpecification(
    print: (_, __, ___, string) {
      boundOnPrint(string);
    },
  )).run(callback);
}

/// Runs a provided [callback] and returns the logs captured during the runtime
/// of that function.
///
/// Not suitable for most usages outside of tests, since in most cases it's better to handle logs
/// as they come in as opposed to at the end of the callback, and also since any exceptions thrown
/// by the callback prevent the function from returning the logs.
/// Use [printConsoleLogs], [spyOnConsoleLogs], or [startSpyingOnConsoleLogs] instead.
///
/// Can be used to print logs, warnings, or errors based on [configuration].
///
/// The function assumes that any `propType` warnings that occur during
/// the function runtime should be captured. Consequently, the `PropType` cache
/// is reset prior to calling the provided callback.
List<String> recordConsoleLogs(
  void Function() callback, {
  ConsoleConfig configuration = ConsoleConfig.all,
}) {
  final consoleLogs = <String>[];
  spyOnConsoleLogs(callback, configuration: configuration, onLog: consoleLogs.add);
  return consoleLogs;
}

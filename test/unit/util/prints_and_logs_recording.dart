import 'dart:async';

import 'package:react_testing_library/src/util/console_log_utils.dart';

/// Runs a provided [callback] and returns the print statements captured during the runtime
/// of that function.
List<String> recordPrintCalls(void Function() callback) {
  final printCalls = <String>[];
  Zone.current.fork(specification: ZoneSpecification(
    print: (_, __, ___, string) {
      printCalls.add(string);
    }
  )).run(callback);
  return printCalls;
}

/// Runs a provided [callback] and returns the logs captured during the runtime
/// of that function.
///
/// Not suitable for most usages outside of tests, since any exceptions that are thrown
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

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

import 'dart:async';
import 'dart:js';

import 'package:meta/meta.dart';
import 'package:react/react_client/react_interop.dart';

/// Runs a provided callback and returns the logs that occur during the runtime
/// of that function.
///
/// Can be used to capture logs, warnings, or errors as specified by setting
/// the [configuration]. To set the [configuration], pass in the corresponding
/// config class ([ConsoleConfig.log], [ConsoleConfig.warn], [ConsoleConfig.error], [ConsoleConfig.all]).
///
/// The function assumes that any `propType` warnings that occur during
/// the function runtime should be captured. Consequently, the `PropType` cache
/// is reset prior to calling the provided callback.
///
/// If any errors are thrown during the callback, e.g. during a render that expects
/// props that are not valid, the errors will be caught to allow the test to complete.
List<String> recordConsoleLogs(
  Function() callback, {
  ConsoleConfig configuration = ConsoleConfig.all,
}) {
  final consoleLogs = <String>[];

  final stopSpying = startSpyingOnConsoleLogs(configuration: configuration, onLog: consoleLogs.add);
  try {
    callback();
  } finally {
    stopSpying();
  }

  return consoleLogs;
}

T printConsoleLogs<T>(
  T Function() callback, {
  ConsoleConfig configuration = ConsoleConfig.all,
}) {
  final stopSpying = startSpyingOnConsoleLogs(configuration: configuration, onLog: print);
  try {
    return callback();
  } finally {
    stopSpying();
  }
}

void Function() startSpyingOnConsoleLogs({
  ConsoleConfig configuration = ConsoleConfig.all,
  @required void Function(String) onLog,
}) {
  final logTypeToCapture = configuration.logType == 'all' ? ConsoleConfig.types : [configuration.logType];
  final consoleRefs = <String, JsFunction>{};

  _resetPropTypeWarningCache();

  // Bind to the current zone so the callback isn't called in the top-level zone.
  final boundOnLog = Zone.current.bindUnaryCallback(onLog);

  for (final config in logTypeToCapture) {
    consoleRefs[config] = context['console'][config] as JsFunction;
    context['console'][config] = JsFunction.withThis((self, [message, arg1, arg2, arg3, arg4, arg5]) {
      // NOTE: Using console.log or print within this function will cause an infinite
      // loop when the logType is set to `log`.
      boundOnLog(message?.toString());
      consoleRefs[config].apply([message, arg1, arg2, arg3, arg4, arg5], thisArg: self);
    });
  }

  void stopSpying() {
    for (final config in logTypeToCapture) {
      context['console'][config] = consoleRefs[config];
    }
  }

  return stopSpying;
}

/// Utility method that resets the `PropTypes` warning cache safely.
void _resetPropTypeWarningCache() {
  try {
    PropTypes.resetWarningCache();
  } catch (_) {}
}

/// Configuration class that sets options within [recordConsoleLogs].
@sealed
class ConsoleConfig {
  const ConsoleConfig._(this.logType);

  /// The type of log to capture while running the callbacks within
  /// [recordConsoleLogs].
  ///
  /// Must be `'warn'`, `'error'`, `'log'` or `'all'`.
  final String logType;

  /// The possible console types that have different log contexts.
  static const Set<String> types = {'error', 'log', 'warn'};

  /// The configuration needed to capture logs while running [recordConsoleLogs].
  static const ConsoleConfig log = ConsoleConfig._('log');

  /// The configuration needed to capture warnings while running [recordConsoleLogs].
  static const ConsoleConfig warn = ConsoleConfig._('warn');

  /// The configuration needed to capture errors while running [recordConsoleLogs].
  static const ConsoleConfig error = ConsoleConfig._('error');

  /// The configuration that will capture all logs, whether they be logs, warnings,
  /// or errors.
  static const ConsoleConfig all = ConsoleConfig._('all');
}

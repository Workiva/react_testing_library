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

@JS()
library console_log_utils;

import 'dart:async';
import 'dart:html';
import 'dart:js_util';

import 'package:js/js.dart';
import 'package:meta/meta.dart';
import 'package:react/react_client/react_interop.dart';

import 'console_log_formatter.dart';

/// Runs a provided [callback] and afterwards [print]s each log that occurs during the runtime
/// of that function.
///
/// [print] is called in the same Zone as this function was called in, similar to a Stream subscription.
///
/// Can be used to print logs, warnings, or errors based on [configuration].
///
/// The function assumes that any `propType` warnings that occur during
/// the function runtime should be captured. Consequently, the `PropType` cache
/// is reset prior to calling the provided callback.
///
/// See also: [spyOnConsoleLogs], [startSpyingOnConsoleLogs]
T printConsoleLogs<T>(
  T Function() callback, {
  ConsoleConfig configuration = ConsoleConfig.all,
}) {
  // Collect all the print calls and then print them at the end so that we don't hit
  // StreamController state errors or stack overflows caused by calling `print` inside
  // a `console.log` call called by print.
  final printCalls = <String>[];
  try {
    return spyOnConsoleLogs(callback, configuration: configuration, onLog: printCalls.add);
  } finally {
    printCalls.forEach(print);
  }
}

/// Runs a provided [callback] and calls [onLog] for each log that occurs during the runtime
/// of that function.
///
/// [onLog] is called in the same Zone as this function was called in, similar to a Stream subscription.
///
/// Can be used to capture logs, warnings, or errors based on [configuration].
///
/// The function assumes that any `propType` warnings that occur during
/// the function runtime should be captured. Consequently, the `PropType` cache
/// is reset prior to calling the provided callback.
///
/// See also: [printConsoleLogs], [startSpyingOnConsoleLogs]
T spyOnConsoleLogs<T>(
  T Function() callback, {
  required void Function(String) onLog,
  ConsoleConfig configuration = ConsoleConfig.all,
}) {
  final stopSpying = startSpyingOnConsoleLogs(configuration: configuration, onLog: onLog);
  try {
    return callback();
  } finally {
    stopSpying();
  }
}

/// Starts spying on console logs, calling [onLog] for each log that occurs until the
/// returned function (`stopSpying`) is called.
///
/// [onLog] is called in the same Zone as this function was called in, similar to a Stream subscription.
///
/// Can be used to capture logs, warnings, or errors based on [configuration].
///
/// The function assumes that any `propType` warnings that occur during
/// the function runtime should be captured. Consequently, the `PropType` cache
/// is reset prior to calling the provided callback.
///
/// See also: [printConsoleLogs], [spyOnConsoleLogs]
void Function() startSpyingOnConsoleLogs({
  ConsoleConfig configuration = ConsoleConfig.all,
  required void Function(String) onLog,
}) {
  final logTypeToCapture = configuration.logType == 'all' ? ConsoleConfig.types : [configuration.logType];
  final consoleRefs = <String, /* JavascriptFunction */ dynamic>{};
  final consolePropertyDescriptors = <String, dynamic>{};
  final _console = getProperty(window, 'console') as Object;

  _resetPropTypeWarningCache();

  // Bind to the current zone so the callback isn't called in the top-level zone.
  final boundOnLog = Zone.current.bindUnaryCallback(onLog);

  for (final config in logTypeToCapture) {
    consolePropertyDescriptors[config] = _getOwnPropertyDescriptor(_console, config);
    consoleRefs[config] = getProperty(_console, config);
    final newDescriptor = _assign(
      newObject(),
      consolePropertyDescriptors[config],
      jsify({
        'value': allowInteropCaptureThis((
          self, [
          message,
          arg1 = _undefined,
          arg2 = _undefined,
          arg3 = _undefined,
          arg4 = _undefined,
          arg5 = _undefined,
          arg6 = _undefined,
          arg7 = _undefined,
          arg8 = _undefined,
          arg9 = _undefined,
          arg10 = _undefined,
        ]) {
          // NOTE: Using console.log or print within this function will cause an infinite
          // loop when the logType is set to `log`.
          final args = [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10]
            ..removeWhere((arg) => arg == _undefined);
          boundOnLog(format(message, args));
          _jsFunctionApply(consoleRefs[config] as Object, [message, ...args], thisArg: self);
        })
      }),
    );
    _defineProperty(_console, config, newDescriptor);
  }

  void stopSpying() {
    for (final config in logTypeToCapture) {
      _defineProperty(_console, config, consolePropertyDescriptors[config]);
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

/// Configuration class that sets options within console-log-recording functions:
///
/// - [printConsoleLogs]
/// - [spyOnConsoleLogs]
/// - [startSpyingOnConsoleLogs]
@sealed
class ConsoleConfig {
  const ConsoleConfig._(this.logType);

  /// The type of log to capture, corresponding to a method on the JS `console` object,
  /// or `'all'` for all types.
  ///
  /// Must be either `'all'` or one of the values within [types].
  final String logType;

  /// The possible console types that have different log contexts.
  static const Set<String> types = {'error', 'log', 'warn'};

  /// Captures calls to `console.log`.
  static const ConsoleConfig log = ConsoleConfig._('log');

  /// Captures calls to `console.warn`.
  static const ConsoleConfig warn = ConsoleConfig._('warn');

  /// Captures calls to `console.error`.
  static const ConsoleConfig error = ConsoleConfig._('error');

  /// Captures calls to `console.log`, `console.warn`, and `console.error`.
  static const ConsoleConfig all = ConsoleConfig._('all');
}

dynamic _jsFunctionApply(Object jsFunction, List<dynamic> args, {dynamic thisArg}) {
  return callMethod(jsFunction, 'apply', [thisArg, jsify(args)]);
}

const _undefined = _Undefined();

/// Represents and unused argument
class _Undefined {
  const _Undefined();
}

@JS('Object.assign')
external dynamic _assign(dynamic object, dynamic otherObject, [dynamic anotherObject]);

@JS('Object.getOwnPropertyDescriptor')
external _PropertyDescriptor _getOwnPropertyDescriptor(dynamic object, String propertyName);

@JS('Object.defineProperty')
external void _defineProperty(dynamic object, String propertyName, dynamic descriptor);

@JS('Object.prototype.hasOwnProperty')
external bool _hasOwnProperty(dynamic object, String name);

@JS()
@anonymous
class _PropertyDescriptor {}

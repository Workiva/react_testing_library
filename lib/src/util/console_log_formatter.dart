// @dart = 2.18

// This code was adapted to Dart from
// https://github.com/nodejs/node-v0.x-archive/blob/master/lib/util.js
//
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

@JS()
library console_log_formatter;

import 'package:js/js.dart';

@JS('JSON.stringify')
external String _jsonStringify(dynamic object);

final _formatRegExp = RegExp('%[sdifoOj%]');

/// A simple formatter implementation for dart.
///
/// If specifier is:
/// - `%s` (String): results in `arg.toString()`.
/// - `%d` or `%i` (Number): results in `num.tryParse(arg)`.
/// - `%f` (Float/Double): results in `double.tryParse(arg)`.
/// - `%o` or '%O' or '%j' (object/JSON): results in `JSON.stringify(arg)`.
///
/// see: https://console.spec.whatwg.org/#formatter
String format(dynamic f, List<dynamic> arguments) {
  if (f is! String) {
    return [f, ...arguments].join(' ');
  }

  var str = '';
    var i = 0;
    final len = arguments.length;
    str += f.replaceAllMapped(_formatRegExp, (m) {
      final x = m[0];
      if (x == '%%') return '%';
      if (i >= len) return x!;
      switch (x) {
        case '%s':
          return arguments[i++].toString();
        case '%i':
        case '%d':
        case '%f':
          return num.tryParse(arguments[i++].toString()).toString();
        case '%o':
        case '%O':
        case '%j':
          try {
            final argToStringify = arguments[i++];
            return _jsonStringify(argToStringify);
          } catch (_) {
            return '[Circular]';
          }
        default:
          return x!;
      }
    });

    if (i < len) {
      str += ' ${arguments.skip(i).join(' ')}';
    }

  return str;
}

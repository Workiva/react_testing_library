@JS()
library;

import 'dart:async';
import 'dart:html';

import 'package:js/js.dart';

@JS('rtl.act')
external dynamic _act(void Function([dynamic, dynamic, dynamic]) callback);

Future<void> act(FutureOr<void> Function() callback) async {
  final promise = _act(allowInterop(([_, __, ___]) => callback())) as Object;
  await promiseToFuture<void>(promise);
}
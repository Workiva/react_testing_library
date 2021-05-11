import 'dart:js';

/// [Global JavaScript Array Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
final jsArray = context['Array'] as JsObject;

/// Store a helper reference to the global [jsArray]'s [`slice` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
final arrayProtoSlice = jsArray['prototype']['slice'] as JsObject;

/// Converts the Array-like [object] to a [JsArray] using [arrayProtoSlice].
JsArray<T> convertToArray<T>(JsObject object) {
  final rawArray = (arrayProtoSlice.callMethod('apply', [object]) as Iterable).cast<T>();
  return JsArray.from(rawArray);
}

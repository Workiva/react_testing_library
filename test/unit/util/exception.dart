/// A unique exception type, for use in testing, so that we can easily differentiate errors thrown
/// intentionally as part of a test from other errors by using `isA`.
class ExceptionForTesting implements Exception {
  final String message;
  ExceptionForTesting([this.message = '']);

  @override
  String toString() => 'ExceptionForTesting${message.isEmpty ? '' : ': $message'}';
}

class ExceptionForTesting implements Exception {
  final String message;
  ExceptionForTesting([this.message = '']);

  @override
  String toString() => 'ExceptionForTesting${message.isEmpty ? '' : ': $message'}';
}

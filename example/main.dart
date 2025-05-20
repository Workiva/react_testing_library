import 'package:react/react.dart' as react;
import 'package:react_testing_library/react_testing_library.dart';
import 'package:react_testing_library/user_event.dart';

main() {
  final content = react.button({
    'onClick': (_) {
      print('clicked');
      throw TestException('intentionally thrown during onClick');
    },
  }, 'Hello World');
  final view = render(content, autoTearDown: false);
  final button = view.getByRole('button', name: 'Hello World');
  try {
    UserEvent.click(button);
  } catch (e) {
    print('Caught exception $e');
  }
}

class TestException implements Exception {
  final String message;

  TestException(this.message);

  @override
  String toString() => 'TestException: $message';
}

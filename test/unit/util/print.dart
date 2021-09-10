import 'dart:async';

List<String> recordPrintCalls(void Function() callback) {
  final printCalls = <String>[];
  Zone.current.fork(specification: ZoneSpecification(
    print: (_, __, ___, string) {
      printCalls.add(string);
    }
  )).run(callback);
  return printCalls;
}

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

import 'dart:html';

import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/src/dom/config/configure.dart';
import 'package:test/test.dart';

import 'constants.dart';

void initConfigForInternalTesting([Function()? additionalSetup]) {
  late JsConfig initialConfig;

  setUpAll(() {
    initialConfig = rtl.getConfig();
  });

  tearDownAll(() {
    jsConfigure(initialConfig);
  });

  setUp(() {
    additionalSetup?.call();
    rtl.configure(
      throwSuggestions: false,
      asyncUtilTimeout: asyncQueryTimeout.inMilliseconds,
    );
    expect(document.body!.children, isEmpty);
  });
}

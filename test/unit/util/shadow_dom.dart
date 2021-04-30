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

import 'dart:html';

import 'package:react/hooks.dart';
import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show chainRefs;
import 'package:react/react_dom.dart' as react_dom;

import 'over_react_stubs.dart' show defaultTestIdKey;

const nodeWithShadowRootDefaultTestId = 'shadowRootHost';

final ShadowNested = react.forwardRef2((props, ref) {
  final divRef = useRef<DivElement>();

  useEffect(() {
    var shadowRootFirstChild = DivElement()
      ..dataset['test-id'] = props['shadowRootFirstChildTestId'] as String ?? 'shadowRootFirstChild';
    divRef.current.attachShadow({'mode': 'open'}).append(shadowRootFirstChild);
    react_dom.render(react.Fragment({}, props['children']), shadowRootFirstChild);
    return () => react_dom.unmountComponentAtNode(shadowRootFirstChild);
  }, const []);

  return react.div({
    defaultTestIdKey: props['shadowRootHostTestId'] ?? nodeWithShadowRootDefaultTestId,
    'ref': chainRefs(ref, divRef)
  });
});

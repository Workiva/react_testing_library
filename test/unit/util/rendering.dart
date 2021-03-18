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

import 'dart:async';

import 'package:react/hooks.dart' show useEffect, useState;
import 'package:react/react.dart' as react;
import 'package:react/react_client/react_interop.dart' show ReactElement;
import 'package:react_testing_library/src/util/over_react_stubs.dart';

import 'constants.dart';

const validRoleInDom = 'button';
const validRoleNotInDom = 'tablist';

ReactElement elementsForQuerying(String uniqueName, {bool renderMultipleElsMatchingQuery}) {
  ReactElement renderEls(String _uniqueName) {
    _uniqueName ??= uniqueName;
    return react.div(
      {
        defaultTestIdKey: _uniqueName,
        'title': _uniqueName,
        'role': 'presentation',
      },
      _uniqueName,
      react.button({'type': 'button'}, _uniqueName),
      react.img({'alt': _uniqueName}),
      react.label({'htmlFor': '${_uniqueName}Input'}, _uniqueName),
      react.input({
        'type': 'text',
        'id': '${_uniqueName}Input',
        'value': _uniqueName,
        'onChange': (_) {},
        'placeholder': _uniqueName
      }),
      react.div(
        {},
        react.div({}, 'bar 1'),
        '$_uniqueName foo',
      ),
      react.div(
        {},
        react.div({}, 'bar 2'),
        '$_uniqueName baz',
      ),
      react.p({}, '$_uniqueName single byText match'),
    );
  }

  renderMultipleElsMatchingQuery ??= false;

  if (renderMultipleElsMatchingQuery) {
    return react.div(
      {},
      renderEls(uniqueName),
      renderEls('2$uniqueName'),
    );
  }

  return renderEls(uniqueName);
}

final DelayedRenderOf = react.registerFunctionComponent(_DelayedRenderOf, displayName: 'DelayedRenderOf');

_DelayedRenderOf(Map props) {
  final Duration delay = props['delay'] ?? asyncQueryTimeout;
  void Function() onDidRenderAfterDelay = props['onDidRenderAfterDelay'];
  final shouldRenderUpdatedChildren = useState(delay.inMilliseconds == 0 ? true : false);

  useEffect(() {
    final timer = Timer(delay, () {
      shouldRenderUpdatedChildren.set(true);
    });

    return timer.cancel;
  }, const []);

  useEffect(() {
    if (shouldRenderUpdatedChildren.value) {
      onDidRenderAfterDelay?.call();
    }
  }, [shouldRenderUpdatedChildren.value]);

  dynamic _renderChildren() {
    if (!shouldRenderUpdatedChildren.value) return props['children'];

    return props['childrenToRenderAfterDelay'];
  }

  return react.div({defaultTestIdKey: 'delayed-render-of-root'}, _renderChildren());
}

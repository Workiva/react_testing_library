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

import 'constants.dart';
import 'over_react_stubs.dart';
import 'shadow_dom.dart';

const validRoleInDom = 'button';
const validRoleNotInDom = 'tablist';

ReactElement elementsForQuerying(String uniqueName, {bool? renderMultipleElsMatchingQuery}) {
  ReactElement renderEls(String _uniqueName) {
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
      ShadowNested(
        {},
        react.button({'type': 'button'}, _uniqueName),
      ),
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

// ignore: type_annotate_public_apis
final DelayedRenderOf = react.registerFunctionComponent(_DelayedRenderOf, displayName: 'DelayedRenderOf');

_DelayedRenderOf(Map props) {
  final delay = props['delay'] as Duration? ?? asyncQueryTimeout;
  final onDidRenderAfterDelay = props['onDidRenderAfterDelay'] as void Function()?;
  final shouldRenderUpdatedChildren = useState(delay == Duration.zero);

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
  }, [shouldRenderUpdatedChildren.value, onDidRenderAfterDelay]);

  dynamic _renderChildren() {
    if (!shouldRenderUpdatedChildren.value) return props['children'];

    return props['childrenToRenderAfterDelay'];
  }

  return react.div({defaultTestIdKey: 'delayed-render-of-root'}, _renderChildren());
}

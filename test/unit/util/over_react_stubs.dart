// @dart = 2.18

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

// Currently, we don't want to add a dependency on over_react for this library
// so that we don't have an analyzer dependency, and can support broader
// version ranges of the Dart SDK.
//
// There are, however, a few things that we want to use that only over_react exports.
// So we'll stub those in here for now.
//
// TODO: Remove these, and add a dev dependency on over_react when a Dart 2.12.x-compatible release is published.
@JS()
library react_testing_library.test.unit.util.over_react_stubs;

import 'package:js/js.dart';
import 'package:react/react_client.dart';
import 'package:react/react_client/js_interop_helpers.dart' show jsifyAndAllowInterop;
import 'package:react/react_client/react_interop.dart' show ReactDartComponentVersion;

const defaultTestIdKey = 'data-test-id';

@JS('React.cloneElement')
external ReactElement _cloneElement(element, [props, children]);

/// Dart wrapper for React.cloneElement.
///
/// _From the JS docs:_
/// > Clone and return a new ReactElement using element as the starting point.
/// > The resulting element will have the original element's props with the new props merged in shallowly.
/// > New children will replace existing children.
/// > Unlike React.addons.cloneWithProps, key and ref from the original element will be preserved.
/// > There is no special behavior for merging any props (unlike cloneWithProps).
/// > See the [v0.13 RC2 blog post](https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html) for additional details.
ReactElement cloneElement(ReactElement element, [Map? props, Iterable? children]) {
  // ignore: unnecessary_null_comparison
  if (element == null) throw ArgumentError.notNull('element');

  final propsChangeset = preparePropsChangeset(element, props, children);

  if (children != null) {
    return _cloneElement(element, propsChangeset, children);
  } else {
    return _cloneElement(element, propsChangeset);
  }
}

/// Returns a new JS map with the specified props and children changes, properly prepared for consumption by
/// React JS methods such as `cloneElement`, `setProps`, and other methods that accept changesets of props to be
/// merged into existing props.
///
/// Handles both Dart and JS React components, returning the appropriate props structure for each type:
///
/// * For `react.Component2` Dart components, [newProps] is passed through [ReactDartComponentFactoryProxy2.generateExtendedJsProps]
///   and then passed to React JS, which will merge the props normally.
/// * Children are likewise copied and potentially overwritten with [newChildren] as expected.
/// * For JS components, a JS copy of [newProps] is returned, since React will merge the props without any special handling.
///   If these values might contain event handlers
dynamic preparePropsChangeset(ReactElement element, Map? newProps, [Iterable? newChildren]) {
  final type = element.type;
  final dartComponentVersion = ReactDartComponentVersion.fromType(type); // ignore: invalid_use_of_protected_member

  if (newProps == null) {
    // Only pre-Component2 Dart components need changesets if props aren't null,
    // since the new children need to be stored on the props.internal.
    // Otherwise, we can pass `null` straight through to React.
    return null;
  }

  // ignore: invalid_use_of_protected_member
  if (dartComponentVersion == ReactDartComponentVersion.component2) {
    // ignore: invalid_use_of_protected_member
    return ReactDartComponentFactoryProxy2.generateExtendedJsProps(newProps);
  }

  // DOM component
  if (type is String) {
    // Convert props for DOM components so that style Maps and event handlers
    // originating from Dart are properly converted.
    final convertedProps = Map.from(newProps);
    ReactDomComponentFactoryProxy.convertProps(convertedProps);
    return jsifyAndAllowInterop(convertedProps);
  }

  // JS Component
  return jsifyAndAllowInterop(newProps);
}

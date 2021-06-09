// @dart=2.7
// ^ Do not remove until migrated to null safety. More info at https://wiki.atl.workiva.net/pages/viewpage.action?pageId=189370832
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

import 'dart:html' show DivElement, Element, document;

import 'package:react_testing_library/matchers.dart' show isFocused;
import 'package:react_testing_library/src/matchers/jest_dom/util/constants.dart';
import 'package:test/test.dart';

import '../../util/matchers.dart';

void main() {
  group('isFocused matcher:', () {
    group('attached node:', () {
      final allAttachedNodes = <Element>[];
      Element makeAttachedNode() {
        final node = DivElement()..tabIndex = 1;
        document.body.append(node);

        allAttachedNodes.add(node);

        return node;
      }

      Element attachedNode;

      setUp(() {
        attachedNode = makeAttachedNode();
      });

      tearDown(() {
        for (final node in allAttachedNodes) {
          node.remove();
        }
        allAttachedNodes.clear();
      });

      test('passes when an attached node is focused', () {
        attachedNode.focus();
        shouldPass(attachedNode, isFocused);
      });

      test('fails when the node is not focused', () {
        shouldFail(attachedNode, isFocused, contains('Which: is not focused; there is no element currently focused'));
      });

      test('fails when the node is not focused, but another node is instead', () {
        final otherNode = makeAttachedNode()..focus();

        shouldFail(attachedNode, isFocused, contains('Which: is not focused; the currently focused element is '));

        otherNode.remove();
      });
    });

    group('provides a useful failure message when', () {
      test('the node is not attached to the DOM, and thus cannot be focused', () {
        final detachedNode = DivElement();
        shouldFail(
            detachedNode,
            isFocused,
            contains('Which: is not attached to the document, and thus cannot be focused.'
                ' If testing with React, you should use the `render` utility function provided by react_testing_library '
                'to ensure the tree is attached to the document when rendered.'));
      });

      test('the matched item is not an element', () {
        shouldFail(null, isFocused, contains('Which: $notAnElementMismatchDescription'));
      });
    });
  });
}

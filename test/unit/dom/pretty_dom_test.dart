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

import 'dart:html';

import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show ReactElement, Ref;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

void main() {
  group('prettyDOM', () {
    group('returns a formatted string of the HTML produced by the node provided', () {
      Ref<DivElement> vDomRootRef;
      setUp(() {
        vDomRootRef = react.createRef();
        final vDom = react.div(
          {'ref': vDomRootRef},
          react.p({}, 'hi there!'),
          react.div(
            {},
            react.p({}, 'you again?'),
          ),
        ) as ReactElement;
        rtl.render(vDom);
      });

      test('', () {
        expect(rtl.prettyDOM(vDomRootRef.current), _expectedPrettyDom);
      });

      test('when maxLength is set', () {
        expect(rtl.prettyDOM(vDomRootRef.current, maxLength: 5), _expectedPrettyDomWithMaxLengthOfFive);
      });

      test('when maxDepth is set', () {
        expect(rtl.prettyDOM(vDomRootRef.current, maxDepth: 2), _expectedPrettyDomWithMaxDepthOfTwo);
      });

      test('when indent is set', () {
        expect(rtl.prettyDOM(vDomRootRef.current, indent: 4), _expectedPrettyDomWithIndentOfFour);
      });

      test('when min is true', () {
        expect(rtl.prettyDOM(vDomRootRef.current, min: true), _expectedPrettyDomWithMinSetToTrue);
      });
    });
  });
}

const _expectedPrettyDom = '''<div>
  <p>
    hi there!
  </p>
  <div>
    <p>
      you again?
    </p>
  </div>
</div>''';

const _expectedPrettyDomWithMaxLengthOfFive = '<div>...';

const _expectedPrettyDomWithIndentOfFour = '''<div>
    <p>
        hi there!
    </p>
    <div>
        <p>
            you again?
        </p>
    </div>
</div>''';

// NOTE: The presence of the â€¦ character appears to be a UTF-8 issue since the underlying
// Jest prettyFormat function was designed to format JS - not UTF-8 HTML.
const _expectedPrettyDomWithMaxDepthOfTwo = '''<div>
  <p>
    hi there!
  </p>
  <div>
    <p â€¦ />
  </div>
</div>''';

const _expectedPrettyDomWithMinSetToTrue = '<div><p>hi there!</p><div><p>you again?</p></div></div>';

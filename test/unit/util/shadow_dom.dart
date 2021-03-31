import 'dart:html';

import 'package:react/hooks.dart';
import 'package:react/react.dart' as react;
import 'package:react/react_client.dart' show chainRefs;
import 'package:react/react_dom.dart' as react_dom;
import 'package:react_testing_library/src/util/over_react_stubs.dart' show defaultTestIdKey;

const nodeWithShadowRootDefaultTestId = 'shadowRootHost';

final ShadowNested = react.forwardRef2((props, ref) {
  final divRef = useRef<DivElement>();

  useEffect(() {
    var shadowRootFirstChild = DivElement()
      ..dataset['test-id'] = props['shadowRootFirstChildTestId'] ?? 'shadowRootFirstChild';
    divRef.current.attachShadow({'mode': 'open'}).append(shadowRootFirstChild);
    react_dom.render(react.Fragment({}, props['children']), shadowRootFirstChild);
    return () => react_dom.unmountComponentAtNode(shadowRootFirstChild);
  }, const []);

  return react.div({
    defaultTestIdKey: props['shadowRootHostTestId'] ?? nodeWithShadowRootDefaultTestId,
    'ref': chainRefs(ref, divRef)
  });
});

# React (Dart) Testing Library

A library to use when authoring unit tests for [React Dart] or [OverReact] UI components that mimics the API of the JS [dom-testing-library] / [react-testing-library] packages.

[![Dart CI](https://github.com/Workiva/react_testing_library/workflows/Dart%20CI/badge.svg?branch=master)](https://github.com/Workiva/react_testing_library/actions?query=workflow%3A%22Dart+CI%22+branch%3Amaster)


## Guiding Principles

> [The more your tests resemble the way your software is used, the more confidence they can give you.][Guiding Principles]

This seemingly simple, yet incredibly powerful idea is what inspired us to create a Dart API for the JS [dom-testing-library] / [react-testing-library] packages!


## How Does It Work?

Rather than dealing with OverReact `UiComponent` instances, or VDom `ReactElement`s, your tests will work with actual DOM nodes. The utilities this library provides facilitate **querying the DOM in the same way the user would.** Finding form elements by their label text *(just like a user would)*, finding links and buttons from their text *(like a user would)*. It also exposes a recommended way to find elements by an HTML `data-test-id` attribute value as an "escape hatch" for elements where the text content and label do not make sense or is not practical.

**This library encourages your Dart web applications to be more accessible** and allows you to get your tests closer to using your components the way a user will, which allows your tests to give you more confidence that your application will work when a real user uses it.

[__READ MORE__][react-testing-library]


## Getting Started

> Before using this library, you should familiarize yourself with [Dart](https://dart.dev/overview), [Dart's `test` library][dart_test_lib], [ReactJS](https://reactjs.org/) and [OverReact] first.

### 1. Add the necessary dependencies to your project

_Pubspec.yaml_
```yaml
dependencies:
  over_react: ^4.0.0

dev_dependencies:
  build_runner: ^1.7.1
  build_test: ">=0.10.9 <3.0.0"
  build_web_compilers: ^2.9.0
  react_testing_library: ^1.0.0-alpha.0
  test: ^1.14.4
  # This is not technically required, 
  # but makes the HTML portion of your test bootstrapping much easier!
  test_html_builder: ^1.0.0 
```

### 2. Configure `build.yaml` to generate test outputs

```yaml
targets:
  $default:
    builders:
      build_web_compilers|entrypoint:
        # These are globs for the entrypoints you want to compile.
        generate_for:
          - test/**.browser_test.dart
```

> The configuration above is a minimum recommendation only. [Read more about configuring a Dart build][dart_build_config]; to learn more / ensure your configuration meets your needs.


### 3. Configure `dart_test.yaml` to run your tests

Create `dart_test.yaml` in the root of your project. 

```yaml
platforms:
  - chrome

paths:
  - test/unit/
```

> The configuration above is a minimum recommendation only. [Read more about configuring Dart tests][dart_test_config], or about [Dart's `test` library][dart_test_lib] to learn more / ensure your configuration meets your needs.


### 4. Add an HTML template for your tests that will load the necessary React / react-testing-library JS files

> *NOTE: The names of the files below are recommendations only, and are not essential to a functional setup.*

#### Using test_html_builder (recommended)
We *strongly* recommend using the [test_html_builder] library to create a template that will be used to load each `.dart.js` test file.

_test/unit/rtl_unit_test_template.html_
```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <title>React Testing Library Unit Test</title>
      <script src="packages/react/react.js"></script>
      <script src="packages/react/react_dom.js"></script>
      <script src="packages/react_testing_library/react-testing-library.js"></script>

      {test}
  </head>
</html>
```

**Use the template `.html` file above and follow the [test_html_builder] library instructions for wiring it up!**

#### Adding / committing your own HTML file(s) 
If for some reason you do not wish to use the [test_html_builder] library to generate the necessary `.html` file(s), you must create one for each analogous `*_test.dart` file in which you are using `react_testing_library` as shown below. Note that you will have to have one `.html` file for each `.dart` file containing your unit tests.

_test/unit/some_unit_test.html_
```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <title>Some Unit Test</title>
      <script src="packages/react/react.js"></script>
      <script src="packages/react/react_dom.js"></script>
      <script src="packages/react_testing_library/react-testing-library.js"></script>

      <link rel="x-dart-test" href="some_unit_test.dart">
      <script src="packages/test/dart.js"></script>
  </head>
</html>
```


### 5. Write test(s) for your component(s)!

> The example below is extremely simplistic for the purposes of demonstration. We will have more thorough examples documented soon!

<!-- TODO: Add link to more in-depth examples once we have them (CPLAT-13500) -->

_lib/src/components/greeting.dart_
```dart
import 'package:over_react/over_react.dart';

part 'greeting.over_react.g.dart';

mixin GreetingProps on UiProps {
  String heading;
  String subHeading;
  String getStartedRoute;
}

UiFactory<GreetingProps> Greeting = uiFunction(
  (props) {
    return (Dom.header()..role = 'group')(
      Dom.h1()(props.heading),
      Dom.h2()(props.subHeading),
      (Dom.a()..href = props.getStartedRoute)('Get started'),
    );
  },
  _$GreetingConfig, // ignore: undefined_identifier
);
```

_test/unit/components/greeting_test.dart_
```dart
import 'dart:html';

import 'package:test/test.dart';
import 'package:react_testing_library/react_testing_library' as rtl;

main() {
  group('Greeting', () {
    rtl.RenderResult renderResult;
    tearDown(() {
      renderResult = null;
    });
    
    group('renders the expected elements:', () {
      group('a <header>', () {
        HeaderElement headerElement;
        
        setUp(() {
          renderResult = rtl.render((Greeting()
            ..heading = 'Hello There!'
            ..subHeading = 'Welcome to the unit testing party.'
            ..getStartedRoute = '/start/partying'
          )());
          
          headerElement = renderResult.getByRole('group');
        });
        
        test('with a child <h1> with a text value equal to props.heading', () {
          final h1Element = rtl.within(headerElement).getByRole('heading', level: 1); 
          expect(h1Element.text, 'Hello There!');
        });
        
        test('with a child <h2> with a text value equal to props.subHeading', () {
          final h2Element = rtl.within(headerElement).getByRole('heading', level: 2); 
          expect(h2Element.text, 'Welcome to the unit testing party.');
        });
        
        test('with a child <a> with an href equal to props.getStartedRoute', () {
          final anchorElement = rtl.within(headerElement).getByRole<AnchorElement>('link'); 
          expect(anchorElement.href, '/start/partying');
        });
      });
    });
  });
}
```



[React Dart]: https://pub.dev/packages/react
[OverReact]: https://pub.dev/packages/over_react
[dom-testing-library]: https://testing-library.com/docs/dom-testing-library/intro
[react-testing-library]: https://testing-library.com/docs/react-testing-library/intro
[Guiding Principles]: https://testing-library.com/docs/guiding-principles/
[test_html_builder]: https://pub.dev/packages/test_html_builder
[dart_test_lib]: https://pub.dev/packages/test
[dart_test_config]: https://github.com/dart-lang/test/blob/master/pkgs/test/doc/configuration.md
[dart_build_config]: https://pub.dev/packages/build_config

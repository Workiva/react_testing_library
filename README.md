# Testing Library for Dart

[Dart] bindings for the JS [dom-testing-library] and [react-testing-library] packages, which provide simple and complete DOM/React testing utilities that encourage good testing practices.

[![Dart CI](https://github.com/Workiva/react_testing_library/actions/workflows/dart_ci.yml/badge.svg?branch=master)](https://github.com/Workiva/react_testing_library/actions/workflows/dart_ci.yml)
[![API Documentation](https://img.shields.io/static/v1?label=API&message=Documentation&color=informational)](https://workiva.github.io/react_testing_library)


## Introduction

The libraries in this package help you to test Dart UI components in a user-centric way. 

> [The more your tests resemble the way your software is used, the more confidence they can give you.][testing-library-intro]

To paint the full picture of how / why to use this library, **please read the JS Testing Library [Introduction][testing-library-intro], [Guiding Principles](https://testing-library.com/docs/guiding-principles) and [FAQs](https://testing-library.com/docs/dom-testing-library/faq).**

## How Does It Work?

Rather than dealing with [OverReact] `UiComponent` instances, or React VDom `ReactElement`s, your tests will work with actual DOM nodes. The utilities this library provides facilitate **querying the DOM in the same way the user would.** Finding form elements by their label text *(just like a user would)*, finding links and buttons from their text *(like a user would)*. It also exposes a recommended way to find elements by an HTML `data-test-id` attribute value as an "escape hatch" for elements where the text content and label do not make sense or is not practical.

**This library encourages your Dart web applications to be more accessible** and allows you to get your tests closer to using your components the way a user will, which allows your tests to give you more confidence that your application will work when a real user uses it.


## Getting Started

> Before using this library, you should familiarize yourself with [Dart](https://dart.dev/overview), [Dart's `test` library][dart_test_lib], [ReactJS](https://reactjs.org/) and [OverReact] first.

### 1. Add the necessary dependencies to your project

<figure>
<figcaption>pubspec.yaml</figcaption>

```yaml
dependencies:
  over_react: ^4.0.0

dev_dependencies:
  build_runner: ^1.7.1
  build_test: ">=0.10.9 <3.0.0"
  build_web_compilers: ^2.9.0
  react_testing_library: ^1.0.0
  test: ^1.14.4
  # This is not technically required, 
  # but makes the HTML portion of your test bootstrapping much easier!
  test_html_builder: ^1.0.0 
```
</figure>

### 2. Configure `build.yaml` to generate test outputs

<figure>
<figcaption>build.yaml</figcaption>

```yaml
targets:
  $default:
    builders:
      build_web_compilers|entrypoint:
        # These are globs for the entrypoints you want to compile.
        generate_for:
          - test/**.browser_test.dart
```
</figure>

> The configuration above is a minimum recommendation only. [Read more about configuring a Dart build][dart_build_config] to learn more / ensure your configuration meets your needs.


### 3. Configure `dart_test.yaml` to run your tests

Create `dart_test.yaml` in the root of your project. 

<figure>
<figcaption>dart_test.yaml</figcaption>

```yaml
platforms:
  - chrome

paths:
  - test/unit/
```
</figure>

> The configuration above is a minimum recommendation only. [Read more about configuring Dart tests][dart_test_config], or about [Dart's `test` library][dart_test_lib] to learn more / ensure your configuration meets your needs.


### 4. Add an HTML template for your tests that will load the necessary React / react-testing-library JS files

> *NOTE: The names of the files below are recommendations only, and are not essential to a functional setup.*

#### Using test_html_builder (recommended)
We *strongly* recommend using the [test_html_builder] library to create a template that will be used to load each `.dart.js` test file.

<figure>
<figcaption>test/unit/rtl_unit_test_template.html</figcaption>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <title>React Testing Library Unit Test</title>
      <script src="packages/react/react.js"></script>
      <script src="packages/react/react_dom.js"></script>
      <script src="packages/react_testing_library/js/react-testing-library.js"></script>

      {test}
  </head>
</html>
```
</figure>

**Use the template `.html` file above and follow the [test_html_builder] library instructions for wiring it up!**

#### Adding / committing your own HTML file(s) 
If for some reason you do not wish to use the [test_html_builder] library to generate the necessary `.html` file(s), you must create one for each analogous `*_test.dart` file in which you are using `react_testing_library` as shown below. Note that you will have to have one `.html` file for each `.dart` file containing your unit tests.

<figure>
<figcaption>test/unit/some_unit_test.html</figcaption>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <title>Some Unit Test</title>
      <script src="packages/react/react.js"></script>
      <script src="packages/react/react_dom.js"></script>
      <script src="packages/react_testing_library/js/react-testing-library.js"></script>

      <link rel="x-dart-test" href="some_unit_test.dart">
      <script src="packages/test/dart.js"></script>
  </head>
</html>
```
</figure>

### 5. Write test(s) for your component(s)!

Using the [render] function, you can now generate DOM using React components and [query][queries] within that DOM to get the element(s) you want to test! 

Then, you can use the [`Matcher`s][matchers] from the `matchers.dart` entrypoint to perform assertions on that DOM, and the events and user events entrypoints or whatever to interact with the DOM.

<!-- TODO: Add link to more in-depth examples once we have them (CPLAT-13504) -->

<figure>
<figcaption>lib/src/components/greeting.dart</figcaption>

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
</figure>

<figure>
<figcaption>test/unit/components/greeting_test.dart</figcaption>

```dart
import 'dart:html';

import 'package:test/test.dart';
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:react_testing_library/matchers.dart';

import 'package:your_package/src/components/greeting.dart';

main() {
  group('Greeting', () {
    rtl.RenderResult view;
    tearDown(() {
      view = null;
    });
    
    group('renders the expected elements:', () {
      group('a <header>', () {
        HeadingElement headerElement;
        
        setUp(() {
          view = rtl.render((Greeting()
            ..heading = 'Hello There!'
            ..subHeading = 'Welcome to the unit testing party.'
            ..getStartedRoute = '/start/partying'
          )());
          
          headerElement = view.getByRole('group');
        });
        
        test('with a child <h1> with a text value equal to props.heading', () {
          final h1Element = rtl.within(headerElement).getByRole('heading', level: 1); 
          expect(h1Element, hasTextContent('Hello There!'));
        });
        
        test('with a child <h2> with a text value equal to props.subHeading', () {
          final h2Element = rtl.within(headerElement).getByRole('heading', level: 2); 
          expect(h2Element, hasTextContent('Welcome to the unit testing party.'));
        });
        
        test('with a child <a> with an href equal to props.getStartedRoute', () {
          final anchorElement = rtl.within(headerElement).getByRole('link'); 
          expect(anchorElement, hasAttribute('href', '/start/partying'));
        });
      });
    });
  });
}
```
</figure>

> [Read more about how queries are scoped to both the `view` and return value of `within()`in the above example][queries] 


## Dart / JS API Parity

The `react_testing_library` Dart package strives to maintain API parity with the analogous JS `testing-library` packages within reason. However, there are certain differences that are either unavoidable, or intentional for the purposes of building Dart APIs that are easy to use and reason about.

Read more about Dart / JS API Parity for the following API categories:

* [Queries][queries]
* [Rendering][render]


[React Dart]: https://pub.dev/packages/react
[OverReact]: https://pub.dev/packages/over_react
[dom-testing-library]: https://testing-library.com/docs/dom-testing-library/intro
[react-testing-library]: https://testing-library.com/docs/react-testing-library/intro
[testing-library-intro]: https://testing-library.com/docs/
[test_html_builder]: https://pub.dev/packages/test_html_builder
[Dart]: https://dart.dev/
[dart_test_lib]: https://pub.dev/packages/test
[dart_test_config]: https://github.com/dart-lang/test/blob/master/pkgs/test/doc/configuration.md
[dart_build_config]: https://pub.dev/packages/build_config
[render]: https://workiva.github.io/react_testing_library/rtl.react/render.html
[queries]: https://workiva.github.io/react_testing_library/topics/Queries-topic.html
[matchers]: https://workiva.github.io/react_testing_library/topics/Matchers-topic.html

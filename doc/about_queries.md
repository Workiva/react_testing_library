Queries are the functions / methods that Testing Library gives you to find elements on the page. There are several <a href="https://testing-library.com/docs/queries/about#types-of-queries" target="rtljs" rel="nofollow noreferrer">types of queries ("get", "find", "query")</a>; the difference between them is whether the query will throw an error if no element is found or if it will return a `Future` and retry. Depending on what page content you are selecting, different queries may be more or less appropriate. See the <a href="https://testing-library.com/docs/queries/about#priority" target="rtljs" rel="nofollow noreferrer">priority guide</a> for recommendations on how to make use of semantic queries to test your page in the most accessible way.

### Scoping Queries

Scoping a query to a specified container within the DOM can be done in a number of ways:

1. By specifying the `container` argument on a "top level" query function.
1. By using the default container pre-defined for query methods exposed by the class instance returned from:
   1. [`render()`](../rtl.react/render.html): scoped to the root of the rendered `ReactElement`
   1. [`within(<container>)`](../rtl.dom.queries/within.html): scoped to the provided `<container>`
   1. [`screen`](../rtl.dom.queries/screen.html): scoped to `document.body`
  
The function signatures for the queries are identical no matter which place you call them from with the exception of the "top level" query functions - which require that a container be specified as the first argument as shown in the examples below.

#### Examples

```dart
import 'package:react/react.dart' as react;
import 'package:react_testing_library/react_testing_library.dart' as rtl;
import 'package:test/test.dart';

main() {
  final exampleVDom = react.nav({},
    react.ul({},
      react.li({}, 'Item 1'),
      react.li({}, 'Item 2'),
      react.li({}, 
        'Item 3',
        react.ul({},
          react.li({}, 'Item 3.1'),
          react.li({}, 'Item 3.2'),
        ),
      ),
    ),
  );
  
  test('', () {
    final renderedResult = rtl.render(exampleVDom);
    
    // Succeeds, there is only one in the react tree.
    final goodNavQuery = renderedResult.getByRole('nav');
    // This is identical to the first query, but shows how 
    // the top level queries must specify a container. 
    final moreVerboseNavQuery = 
        rtl.getByRole(renderedResult.container, 'nav');
    
    // Fails, there is more than one element with the list role 
    // in the default scope used by the `RenderResult` instance 
    // returned from `rtl.render`. If we want to get only the 
    // nested list, we should use a more tightly scoped query
    // like the one shown next.
    final badSubListQuery = renderedResult.getByRole('list');
    
    // Succeeds, there is only one list nested within the" "Item 3" item.
    final goodSubListQuery = 
        rtl.within(renderedResult.getByText('Item 3')).getByRole('list');
    
    // Lets say that our test above also renders an element that displays an 
    // overlay / "portal" dialog of some kind that renders in its own tree. 
    // This is where the `screen` queries come in handy - it allows you to 
    // easily query the entire document for something.
    final documentQueryOutsideTheReactTree = rtl.screen.getByRole('dialog');
    
    // If querying the entire document is too broad, you can still easily 
    // query outside the scope of the react tree rendered in the test 
    // by specifying a container using `within`:
    final scopedQueryOutsideTheReactTree = 
        rtl.within(someElementWhereYouExpectTheDialog).getByRole('dialog');
  });
}
```

> __NOTE:__ `render()` supports React vDom elements / custom components created using either the [react](https://pub.dev/packages/react) or [over_react](https://pub.dev/packages/over_react) packages.
>
> The examples shown here use the `react` package since the `react_testing_library` does not have a direct dependency on `over_react` - but both libraries are fully supported.

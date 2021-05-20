TODO add ToC

## Testing Components with Interactions

This guide talks about the part of a test where a component is interacted with to verify a behavior results in a change in the component. This might be clicking a button and expecting the DOM to change or something like changing the text of an input and expecting the `onChange` callback to fire.

This guide does not go into detail about React Testing Library (RTL) APIs themselves and instead focuses on common test patterns and what that looks like using the RTL APIs. For more resources on how these interaction APIs work, see the docs below.

### References

The examples here should be declarative enough that knowledge of the RTL APIs being used isn't required. That being said, understanding the philosophy and the options would be beneficial. Below is a list of documentation that is relevant to this aspect of the migration.

> TODO explain the difference between Dart and JS docs

- [User Actions Philosophy]
- UserEvent APIs
  - [Dart UserEvent]
  - [JS UserEvent]
- fireEvent
  - [Dart fireEvent]
  - [JS fireEvent]

### What Patterns Does This Cover?

The most general categories for the patterns this guide will focus on migrating are:

- <u>Event Simulation</u>
  - react_test_utils.Simulate
  - Element.event() (click, focus, blur)
  - Direct prop method calls
  - `dispatchEvent`
  - Changes via `Element.value`
- <u>Using Class APIs</u>

  - TODO

- <u>Component State Changes</u>
  - TODO

Besides those broader categories, there are special cases that are related to interactions but are a broader pattern. These are:

- Expecting events in event listeners
- TODO

### Event Simulation

The event simulation category is around migrating away from the pre-existing ways of imitating user interaction via the event simulation methods.

#### react_test_utils.Simulate and Element.event()

Using the `Simulate` methods and an `Element`'s event methods are fairly similar in practice. Take this test for example:

```dart
test('click causes an event', () {
  var renderedInstance = render(defaultBuilder()());

  FileInputComponent fileInputComponent =
      getDartComponent(getByTestId(renderedInstance, 'a_file_input'));
  var fileInputNode = fileInputComponent.getInputDomNode();

  var link = queryByTestId(renderedInstance, 'graph_ui__breadcrumb__upload__anchor');

  MockFile mockFile = MockFile();
  when(mockFile.name).thenReturn('file1');
  when(mockFile.lastModifiedDate).thenReturn(DateTime(2014, DateTime.april, 29, 6, 4));

  MockFileUploadInputElement inputNodeMock = MockFileUploadInputElement();
  when(inputNodeMock.files).thenReturn([mockFile]);

  react_test_utils.Simulate.click(link);
  react_test_utils.Simulate.change(fileInputNode, {'target': inputNodeMock});

  expect(selectedFile, mockFile);
})
```

[user actions philosophy]: https://workiva.github.io/react_testing_library/topics/UserActions-topic.html
[dart userevent]: https://workiva.github.io/react_testing_library/user_event/UserEvent-class.html#static-methods
[dart fireevent]: https://workiva.github.io/react_testing_library/rtl.dom.events/fireEvent.html
[js userevent]: https://testing-library.com/docs/ecosystem-user-event
[js fireevent]: https://testing-library.com/docs/dom-testing-library/api-events

## Firing Events

> **NOTE:**
>
> Most projects have a few use cases for [`fireEvent`][fireEvent], but the majority of the time you should probably use [`UserEvent` methods][UserEvent].

### Interactions vs. events

Based on the [Guiding Principles], your test should resemble how users interact with your code (component, page, etc.) as much as possible. With this in mind, you should know that [`fireEvent`][fireEvent] isn't exactly how the user interacts with your application, but it's close enough for most scenarios.

Consider [fireEvent] when providing it a `MouseEvent('click')` event - it creates a click event and dispatches that event on the given DOM node. This works properly for most situations when you simply want to test what happens when your element is clicked, but when the user actually clicks your element in the browser, these are the events that are typically fired (in order):

* `mouseOver`
* `mouseMove`
* `mouseDown`
* `element.focus()` _(if that `element` is focusable)_
* `mouseUp`
* `click`

And then, if that `element` happens to be a child of a `<label>`, then it will also move focus to the form control that the label is labeling. So even though all you really are trying to test is the click handler, by simply using `fireEvent` you're missing out on several other potentially important events the user is firing along the way.

Again, most of the time this isn't critical for your tests, and the trade-off of simply using `fireEvent` is sometimes worth it.


[fireEvent]: https://workiva.github.io/react_testing_library/rtl.dom.events/fireEvent.html
[UserEvent]: https://workiva.github.io/react_testing_library/user_event/UserEvent-class.html#static-methods
[Guiding Principles]: https://testing-library.com/docs/guiding-principles

import {prettyDOM} from '@testing-library/react';

const buildTestingLibraryElementError = function(message) {
  const err = new Error(message);
  err.name = 'TestingLibraryElementError';
  return err;
}

const buildJsGetElementError = function(message, container) {
  // With findBy* async queries, there is a race condition during which `originalMessage` will already
  // contain the prettyDOM-printed HTML of the `container`. This causes the prettyDOM-printed HTML to be
  // output twice in the error because of the call to `setEphemeralElementErrorMessage`,
  // which calls `buildCustomTestingLibraryElementJsError`, which assumes that the prettyDOM-printed output
  // is not already there. So we'll do an additional replace here to get rid of the prettyDOM-printed output
  // if found.
  const prettyDOMRegex = /(?<=[\s\S]*)\s*<\w+>[\s\S]+/gm;
  const newMessage = message?.replace(prettyDOMRegex, '') ?? '';
  const prettyDomOutput = prettyDOM(container);
  return buildTestingLibraryElementError([newMessage, prettyDomOutput].filter(Boolean).join('\n\n'));
}

export {
  buildJsGetElementError,
};

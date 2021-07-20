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

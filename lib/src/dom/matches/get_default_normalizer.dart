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

@JS()
library react_testing_library.src.dom.matches.get_default_normalizer;

import 'package:js/js.dart';

import 'package:react_testing_library/src/dom/matches/types.dart';

/// The default "normalizer" used to normalize the string query value provided
/// to a query by trimming whitespace from the start and end of text, and collapsing
/// multiple adjacent whitespace characters into a single space.
///
/// > See: <https://testing-library.com/docs/queries/about#normalization>
NormalizerFn Function([NormalizerOptions?]) getDefaultNormalizer([NormalizerOptions? options]) {
  return _jsGetDefaultNormalizer(NormalizerOptions()
    ..trim = options?.trim ?? true
    ..collapseWhitespace = options?.collapseWhitespace ?? true);
}

@JS('rtl.getDefaultNormalizer')
external NormalizerFn Function([NormalizerOptions?]) _jsGetDefaultNormalizer([NormalizerOptions? options]);

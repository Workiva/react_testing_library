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

/// An internal utility function that returns the value of the provided [element].
///
/// This function ensures that the value parsing logic for both the `hasValue`
/// and `hasFormValues` matchers is identical.
///
/// This function does not support `<input type="checkbox">` or `<input type="radio">` value parsing.
/// The `hasFormValues` matcher has special logic built-in for that.
dynamic getValueOf(Element element, {dynamic Function(OptionElement option) getOptionValue}) {
  if (element is InputElement) {
    final type = element.getAttribute('type');
    switch (type) {
      case 'checkbox':
      case 'radio':
        throw ArgumentError('getValueOf() does not support checkbox / radio inputs.');
      case 'number':
        return num.tryParse(element.value);
        break;
      case 'text':
      default:
        return element.value;
        break;
    }
  } else if (element is SelectElement) {
    getOptionValue ??= (option) => option.value;
    final selectedOptions = element.options.where((option) => option.selected);
    if (selectedOptions.isEmpty) {
      return element.multiple ? const [] : null;
    } else if (selectedOptions.length == 1) {
      final selectedValues = selectedOptions.map(getOptionValue);
      return element.multiple ? selectedValues.toList() : selectedValues.single;
    } else {
      return selectedOptions.map(getOptionValue).toList();
    }
  } else if (element is TextAreaElement) {
    return element.value;
  } else {
    return element.getAttribute('value');
  }
}

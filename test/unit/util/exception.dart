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

/// A unique exception type, for use in testing, so that we can easily differentiate errors thrown
/// intentionally as part of a test from other errors by using `isA`.
class ExceptionForTesting implements Exception {
  final String message;
  ExceptionForTesting([this.message = '']);

  @override
  String toString() => 'ExceptionForTesting${message.isEmpty ? '' : ': $message'}';
}

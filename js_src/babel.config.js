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

module.exports = function getBabelConfig(api) {
  const useESModules = !api.env('api');
  return {
    presets: [
      [
        // Latest stable ECMAScript features
        require('@babel/preset-env').default,
        {
          bugfixes: true,
          modules: useESModules ? false : 'commonjs',
          useBuiltIns: 'entry',
          corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules,
          // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
          version: '^7.4.4',
        },
      ],
    ],
  };
};

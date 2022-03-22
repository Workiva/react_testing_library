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

import * as path from 'path';

import babel from '@rollup/plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

import pkg from './package.json';

const input = 'src/_react-testing-library.js';
const jsPackageName = 'rtl';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const commonjsOptions = {
  include: /node_modules/,
};

const nodeOptions = {
  extensions: ['.js', '.tsx', '.ts'],
};

const babelOptions = {
  exclude: /node_modules/,
  babelHelpers: 'runtime',
  extensions: ['.js', '.ts', '.tsx'],
  configFile: path.resolve(__dirname, 'babel.config.js'),
};

const commonPlugins = [
  resolve(nodeOptions),
  commonjs(commonjsOptions), // this MUST be before the babel plugin
  babel(babelOptions),
  json(),
  builtins(nodeOptions),
  nodeGlobals(nodeOptions),
];

export default (commandFlags) => {
  return [
    {
      input,
      external: Object.keys(globals),
      output: {
        name: jsPackageName,
        file: pkg.prodBundle,
        format: 'umd',
        globals,
      },
      plugins: [
        ...commonPlugins,
        filesize(),
      ],
    },
  ];
};

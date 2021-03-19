/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

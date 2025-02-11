import { resolve, dirname, parse } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json' assert { type: 'json' };

const input = 'src/index.js';
const jsPackageName = 'rtl';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    emptyOutDir: true,
    outDir: dirname(pkg.prodBundle),
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: input,
      name: jsPackageName,
      // the proper extensions will be added
      fileName: parse(pkg.prodBundle).name,
      formats: ['umd'],
    },
    minify: false,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: Object.keys(globals),
      output: {
        // This is the output filename
        entryFileNames: `${parse(pkg.prodBundle).name}.js`,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: globals,
      },
    },
  },
});

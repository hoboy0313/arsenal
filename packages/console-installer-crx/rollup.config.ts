import {resolve} from 'path';

// @ts-ignore
import serve from 'rollup-plugin-serve';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.ts'];

const ROOT = process.cwd();

const isDev = process.env.NODE_ENV === 'dev';

export default {
    input: ['src/index.ts', 'src/importer.ts'],

    output: {
      dir: 'libs',
      format: 'esm'
    },

    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions,
        exclude: [
          '*.config.js',
          '*.config.ts',
          'packages/**/node_modules/*.d.ts',
          'node_modules/*.d.ts',
          '**/dist/**/*',
        ],
      }),

      nodeResolve({
        preferBuiltins: false,
        mainFields: ['module', 'main'],
        extensions
      }),

      isDev && serve({
        open: true,
        port: 8080,
        contentBase: [resolve(ROOT, 'libs'), resolve(ROOT, 'test')],
        openPage: 'test/index.html'
      }),
    ],
}

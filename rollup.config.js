import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: [
      './node_modules/lit-html/lit-html.js',
      './node_modules/@vaadin/router/dist/vaadin-router.js',
      './node_modules/@preact/signals-core/dist/signals-core.module.js',
    ],
    output: { dir: './src/libs', format: 'esm' },
    plugins: [
      nodeResolve({
        browser: true,
      }),
    ],
  },
];

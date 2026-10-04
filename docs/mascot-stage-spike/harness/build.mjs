import { build } from 'esbuild';
import path from 'node:path';
const spike = path.resolve('../stage-spike/node_modules');
await build({
  entryPoints: ['harness/entry.tsx'], bundle: true, outfile: 'harness/out/harness.js', format: 'iife',
  jsx: 'automatic', loader: { '.css': 'empty' }, nodePaths: [spike, path.resolve('node_modules')],
  define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'warning', sourcemap: false,
});

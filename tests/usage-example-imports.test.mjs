/* @layer tooling-scripts @kind test */
import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { usageExampleImports } from '../scripts/config/index.mjs';
import { fixtureRepo } from './config-fixture.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const KNIP = join(ROOT, 'node_modules', 'knip', 'bin', 'knip.js');
const COMPILER = pathToFileURL(join(ROOT, 'scripts', 'config', 'index.mjs')).href;
const TIMEOUT = 60_000;

const usageFile = (example) => `const usage = {\n  job: 'Main.',\n  example: \`${example}\`,\n};\n\nexport { usage };\n`;

const EXAMPLE = [
  'import type { Settings } from \'../../settings.type\';',
  'import { Only } from \'../Only/Only\';',
  'import Card, { a as b, type T } from \'kit\';',
  'import * as Kit from \'kit/all\';',
  '',
  'const Sample = () => <Only />;',
  '',
].join('\n');

const LIBRARY = {
  'package.json': { name: 'usage-knip', type: 'module', private: true },
  'tsconfig.json': { compilerOptions: { jsx: 'react-jsx', module: 'esnext', moduleResolution: 'bundler', strict: true } },
  'src/main.ts': 'import { Main } from \'./views/Main/Main\';\n\nconsole.log(Main);\n',
  'src/views/Main/Main.tsx': 'const Main = () => null;\n\nexport { Main };\n',
  'src/views/Only/Only.tsx': 'const Only = () => null;\n\nexport { Only };\n',
  'src/views/Main/Main.usage.ts': usageFile('import { Only } from \'../Only/Only\';\n\nconst Sample = () => <Only />;\n'),
};

const dirs = [];
afterAll(() => dirs.forEach((dir) => rmSync(dir, { recursive: true, force: true })));

const knip = (config) => {
  const dir = fixtureRepo({ ...LIBRARY, ...config });
  dirs.push(dir);
  const name = Object.keys(config)[0];
  return spawnSync(process.execPath, [KNIP, '--config', name, '--include', 'files', '--no-progress'], { cwd: dir, encoding: 'utf8' }).stdout;
};

describe('the knip compiler for usage files', () => {
  it('adds the imports of the example as re-exports, under names nothing else uses', () => {
    const out = usageExampleImports(usageFile(EXAMPLE.replaceAll('\n', '\n')), 'src/views/Main/Main.usage.ts');
    expect(out.split('\n').filter((line) => line.startsWith('export ') && line.includes(' from '))).toEqual([
      'export type { Settings as __usageExample0 } from \'../../settings.type\';',
      'export { Only as __usageExample1 } from \'../Only/Only\';',
      'export { default as __usageExample2, a as __usageExample3, type T as __usageExample4 } from \'kit\';',
      'export * as __usageExample5 from \'kit/all\';',
    ]);
  });

  it('leaves every other file and a usage file with no example import as they are', () => {
    expect(usageExampleImports('import { a } from \'b\';\n', 'src/main.ts')).toBe('import { a } from \'b\';\n');
    const plain = usageFile('const Sample = () => null;');
    expect(usageExampleImports(plain, 'src/X/X.usage.ts')).toBe(plain);
  });

  it('keeps a part that only its usage example imports out of the unused files of knip', () => {
    const entry = ['src/main.ts', 'src/views/*/*.usage.ts'];
    const without = knip({ 'knip.json': { entry, project: ['src/**/*.{ts,tsx}'] } });
    const config = `import { usageExampleImports } from '${COMPILER}';\n\nexport default { entry: ${JSON.stringify(entry)}, project: ['src/**/*.{ts,tsx}'], compilers: { ts: usageExampleImports } };\n`;
    const withCompiler = knip({ 'knip.config.mjs': config });
    expect(without).toContain('src/views/Only/Only.tsx');
    expect(withCompiler).not.toContain('Only.tsx');
  }, TIMEOUT);
});

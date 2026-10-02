/* @layer tooling-scripts @kind test */
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { afterAll, beforeAll } from 'vitest';
import { findSlop } from '@drizztdourden08/brock-lint-config/slop-patterns';
import { run } from '../scripts/cli/new-command.mjs';

const TIMEOUT = 240_000;
const BROCK_WITHOUT_USAGE = /\.usage\.ts: not part of a component folder/;
const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]$/, '');
const MODULES = join(ROOT, 'node_modules');
const APP_FIXTURE = join(ROOT, 'tests', 'fixtures', 'cli', 'app');
const TESSERA_PARTS = ['src', 'stories', '.storylite', 'scripts', 'ai', 'types', 'package.json', 'tessera.config.json', 'tessera.config.schema.json', 'tsconfig.json', 'eslint.config.mjs', 'stylelint.config.mjs'];
const BIN = {
  eslint: join(MODULES, 'eslint', 'bin', 'eslint.js'),
  stylelint: join(MODULES, 'stylelint', 'bin', 'stylelint.mjs'),
  tsc: join(MODULES, 'typescript', 'bin', 'tsc'),
};
const SHAPES = pathToFileURL(join(MODULES, '@drizztdourden08', 'brock-build', 'src', 'commands', 'structure-shape.mjs')).href;

const sandbox = (copy) => {
  const dir = mkdtempSync(join(tmpdir(), 'tessera-cli-'));
  copy(dir);
  symlinkSync(MODULES, join(dir, 'node_modules'), 'junction');
  return dir;
};

const tesseraCopy = () => sandbox((dir) => {
  for (const part of TESSERA_PARTS) cpSync(join(ROOT, part), join(dir, part), { recursive: true });
});

const appTsconfig = (dir) => ({
  extends: '@drizztdourden08/brock-lint-config/tsconfig/react.json',
  compilerOptions: {
    types: [],
    paths: {
      '@drizztdourden08/tessera': [`${ROOT}/src/index.ts`],
      '@drizztdourden08/tessera/*': [`${ROOT}/src/*/index.ts`],
    },
  },
  include: [`${dir}/src/**/*`, `${dir}/stories/**/*`, `${ROOT}/types/**/*`],
});

const appCopy = () => sandbox((dir) => {
  cpSync(APP_FIXTURE, dir, { recursive: true });
  writeFileSync(join(dir, 'tsconfig.json'), `${JSON.stringify(appTsconfig(dir.split('\\').join('/')), null, 2)}\n`);
});

const removeSandbox = (dir) => rmSync(dir, { recursive: true, force: true });

const pnpm = (cwd, script) => spawnSync(`pnpm ${script}`, { cwd, encoding: 'utf8', shell: true });

const runNew = async (cwd, argv, { interactive = false, answers = [] } = {}) => {
  const out = [];
  const scripts = [];
  const io = {
    log: (line) => out.push(line),
    warn: (line) => out.push(line),
    ask: async (question) => {
      out.push(question);
      return answers.shift() ?? '';
    },
    interactive,
    runScript: (root, script) => {
      const result = pnpm(root, script);
      scripts.push({ script, output: `${result.stdout}${result.stderr}` });
      return result.status ?? 1;
    },
  };
  const status = await run(argv, { cwd, io });
  return { status, out: out.join('\n'), scripts };
};

const node = (cwd, args) => {
  const result = spawnSync(process.execPath, args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
};

const eslint = (cwd, files) => node(cwd, [BIN.eslint, '--max-warnings', '0', ...files]);

const stylelint = (cwd, files) => node(cwd, [BIN.stylelint, ...files]);

const typecheck = (cwd, files) => {
  writeFileSync(join(cwd, 'tsconfig.cli-check.json'), JSON.stringify({ extends: './tsconfig.json', include: [...files, `${ROOT.split('\\').join('/')}/types/**/*`] }));
  const result = node(cwd, [BIN.tsc, '--noEmit', '-p', 'tsconfig.cli-check.json']);
  const errors = result.output.split('\n').filter((line) => files.some((file) => line.startsWith(file)));
  return errors;
};

const structure = async (cwd, folder) => {
  const { checkShapes } = await import(SHAPES);
  return checkShapes(cwd, join(cwd, folder)).filter((finding) => !BROCK_WITHOUT_USAGE.test(finding));
};

const filesOf = ({ kind, name, folder }) => [
  `${folder}/${name}.tsx`, `${folder}/${name}.type.ts`, `${folder}/${name}.css`, `${folder}/${name}.usage.ts`, `${folder}/index.ts`,
  `stories/${kind}s/${name}.stories.tsx`,
];

const generateParts = (copy, parts) => {
  const files = parts.flatMap(filesOf);
  const state = { dir: '', results: [], files, code: files.filter((file) => !file.endsWith('.css')), styles: files.filter((file) => file.endsWith('.css')) };
  state.read = (path) => readFileSync(join(state.dir, path), 'utf8');
  beforeAll(async () => {
    state.dir = copy();
    for (const part of parts) state.results.push(await runNew(state.dir, [part.kind, part.name, ...part.argv], part));
  }, TIMEOUT);
  afterAll(() => removeSandbox(state.dir));
  return state;
};

const slopIn = (text) => findSlop(text).map((hit) => hit.match);

const slop = (cwd, files) => files.flatMap((file) => slopIn(readFileSync(join(cwd, file), 'utf8')).map((match) => `${file}: ${match}`));

export { appCopy, eslint, generateParts, pnpm, removeSandbox, ROOT, runNew, slop, slopIn, structure, stylelint, tesseraCopy, TIMEOUT, typecheck };

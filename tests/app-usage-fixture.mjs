/* @layer tooling-scripts @kind test */
import { readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { placeholderSentences } from '../scripts/ai/placeholder-sentences.mjs';
import { run } from '../scripts/cli/new-command.mjs';
import { fixtureRepo, MONOREPO } from './config-fixture.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]$/, '').split('\\').join('/');

const APP_TREE = `/* @layer renderer-app @kind data */
import type { AppTree } from '@drizztdourden08/tessera';

const APP_TREE = [
  {
    at: [],
    answers: {
      'a saved game': {
        question: 'What about the save?',
        answers: { 'one save': null, 'the list of saves': null, 'an old save': null },
      },
    },
  },
] as const satisfies AppTree;

declare module '@drizztdourden08/tessera' {
  interface TesseraApps {
    fixture: { parts: 'SaveSlot' | 'RunePanel' | 'SaveList' | 'Home' | 'BadView'; tree: typeof APP_TREE };
  }
}

export { APP_TREE };
`;

const tsconfig = (include) => ({
  extends: '@drizztdourden08/standards/tsconfig/react.json',
  compilerOptions: {
    types: [],
    paths: {
      '@drizztdourden08/tessera': [`${ROOT}/src/index.ts`],
      '@drizztdourden08/tessera/*': [`${ROOT}/src/*/index.ts`],
    },
  },
  include: [...include, `${ROOT}/types/**/*`],
});

const FILES = {
  ...MONOREPO,
  'packages/design/tsconfig.json': tsconfig(['src/**/*']),
  'apps/desktop/tsconfig.json': tsconfig(['src/**/*', '../../packages/design/src/ai/tree.ts']),
  'packages/design/src/ai/tree.ts': APP_TREE,
  'packages/design/src/index.ts': 'export { SaveSlot } from \'./compounds/SaveSlot\';\nexport { RunePanel } from \'./panels/RunePanel\';\n',
  'apps/desktop/src/views/Bare/Bare.tsx': 'const Bare = () => null;\n\nexport { Bare };\n',
};

const PARTS = [
  { cwd: '.', argv: ['compound', 'SaveSlot', '--tree', 'a saved game > one save'] },
  { cwd: '.', argv: ['compound', 'RunePanel', '--into', 'packages/design/src/panels'] },
  { cwd: 'apps/desktop', argv: ['view', 'SaveList', '--tree', 'a saved game > the list of saves'] },
  { cwd: 'apps/desktop', argv: ['view', 'Home'] },
  { cwd: 'apps/desktop', argv: ['view', 'BadView'] },
];

const quiet = () => {
  const out = [];
  return { out, io: { log: (line) => out.push(line), warn: (line) => out.push(line), ask: async () => '', interactive: false, runScript: () => 0 } };
};

const fill = (dir, path, change = (text) => text) => {
  const name = path.slice(path.lastIndexOf('/') + 1, -'.usage.ts'.length);
  const sentences = placeholderSentences(name, undefined);
  let text = readFileSync(join(dir, path), 'utf8');
  for (const [field, sentence] of Object.entries(sentences)) text = text.replace(sentence, `The ${field} of ${name}, written by hand.`);
  text = text.replace(/Write in one line why \w+ answers [^']+\./, `${name} draws one saved game.`);
  writeFileSync(join(dir, path), change(text));
};

const appUsageFixture = async () => {
  const dir = fixtureRepo(FILES);
  symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'), 'junction');
  const outputs = [];
  for (const part of PARTS) {
    const { out, io } = quiet();
    outputs.push({ status: await run(part.argv, { cwd: join(dir, part.cwd), io }), out: out.join('\n') });
  }
  fill(dir, 'packages/design/src/compounds/SaveSlot/SaveSlot.usage.ts');
  fill(dir, 'packages/design/src/panels/RunePanel/RunePanel.usage.ts');
  fill(dir, 'apps/desktop/src/views/SaveList/SaveList.usage.ts', (text) => text.replace('use: \'Box\'', 'use: \'SaveSlot\''));
  fill(dir, 'apps/desktop/src/views/BadView/BadView.usage.ts', (text) => text
    .replace('use: \'Box\'', 'use: \'SaveRow\'')
    .replace('buildingBlock: true,', 'tree: { path: [\'a saved game\', \'a new save\'], rule: \'BadView is not on the tree.\' },')
    .replace('<BadView title="Bad view" />', '<BadView heading="Bad view" />'));
  const typeFile = join(dir, 'packages/design/src/panels/RunePanel/RunePanel.type.ts');
  writeFileSync(typeFile, readFileSync(typeFile, 'utf8').replace('  className?: string;', '  className?: string;\n  glow?: boolean;'));
  return { dir, outputs };
};

export { appUsageFixture };

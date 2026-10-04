/* @layer tooling-scripts @kind test */
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { posixPath } from '../scripts/config/posix-path.mjs';

const CONFIG = {
  $schema: './node_modules/@drizztdourden08/tessera/tessera.config.schema.json',
  package: '@fixture/design',
  parts: {
    primitives: 'packages/design/src/primitives',
    composites: 'packages/design/src/composites',
    compounds: ['packages/design/src/compounds', 'packages/design/src/panels'],
    views: 'src/views',
  },
  stories: 'packages/design/stories',
  theme: { css: 'packages/design/src/theme.css', palette: 'fixture' },
  guide: { usage: 'report', out: 'guide', tree: 'packages/design/src/guide/tree.ts' },
  gallery: { title: 'Fixture', port: 4410, review: 'packages/design/review.json' },
  overrides: 'packages/design/src/tessera-overrides.ts',
  apps: { 'apps/desktop': { parts: { views: 'apps/desktop/src/views' } } },
};

const WORKSPACES_CONFIG = {
  $schema: CONFIG.$schema,
  parts: {
    composites: ['packages/design/src/composites', 'packages/input/src/renderer/composites'],
    compounds: 'packages/design/src/compounds',
  },
  layer: 'renderer-shell',
  apps: { 'apps/desktop': { parts: { views: 'apps/desktop/src/views' }, layer: 'renderer-desktop' } },
};

const MONOREPO = {
  'tessera.config.json': CONFIG,
  'pnpm-workspace.yaml': 'packages:\n  - \'apps/*\'\n  - \'packages/*\'\n',
  'package.json': { name: 'fixture-root', private: true, devDependencies: { '@drizztdourden08/tessera': '^0.3.0' } },
  'packages/design/package.json': { name: '@fixture/design', private: true, devDependencies: { '@storylite/storylite': '^1.6.0' } },
  'packages/design/src/index.ts': 'export {};\n',
  'packages/input/package.json': {
    name: '@fixture/input',
    private: true,
    exports: { '.': './src/index.ts', './renderer': './src/renderer/index.ts', './tokens.css': './src/tokens.css' },
  },
  'packages/input/src/index.ts': 'export {};\n',
  'packages/input/src/renderer/index.ts': 'export {};\n',
  'apps/desktop/package.json': { name: '@fixture/desktop', private: true, dependencies: { '@fixture/design': 'workspace:*' } },
  'apps/desktop/src/main.tsx': 'export {};\n',
};

const writeTree = (dir, files) => {
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`);
  }
};

const fixtureRepo = (files = MONOREPO) => {
  const dir = posixPath(mkdtempSync(join(tmpdir(), 'tessera-config-')));
  writeTree(dir, files);
  return dir;
};

export { CONFIG, fixtureRepo, MONOREPO, WORKSPACES_CONFIG, writeTree };

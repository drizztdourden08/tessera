/* @layer tooling-scripts @kind test */
import { readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { tesseraExtension } from '../scripts/standards/tessera-extension.mjs';
import { extension } from '../standards.extension.mjs';
import { fixtureRepo, MONOREPO, writeTree } from './config-fixture.mjs';

const FACETS = ['id', 'description', 'structure', 'eslint', 'stylelint', 'markdownlint', 'prose'];
const PART = (name) => `/* @layer renderer-app @kind component */\nconst ${name} = () => null;\n\nexport { ${name} };\n`;
const dir = fixtureRepo();
writeTree(dir, {
  'packages/design/src/compounds/SaveSlot/SaveSlot.tsx': PART('SaveSlot'),
  'packages/design/src/compounds/SaveSlot/sub-components/SlotRow/SlotRow.tsx': PART('SlotRow'),
  'packages/design/src/panels/RunePanel/RunePanel.tsx': PART('RunePanel'),
  'packages/design/src/panels/RunePanel/RunePanel.usage.ts': 'export {};\n',
  'apps/desktop/src/views/Home/Home.tsx': PART('Home'),
  'apps/desktop/src/views/Home/Home.usage.ts': 'export {};\n',
  'apps/desktop/src/views/Bare/Bare.tsx': PART('Bare'),
  'apps/desktop/src/screens/Loose/Loose.tsx': PART('Loose'),
});
const check = (packageDir) => tesseraExtension().structure.checks[0]({ rootDir: dir, packageDir: join(dir, packageDir), label: packageDir, pkg: {}, kind: 'package' });

afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe('the standards extension', () => {
  it('is declared in package.json and keeps to the facets standards takes', () => {
    const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    expect(manifest.standards).toEqual({ extension: './standards.extension.mjs' });
    expect(Object.keys(extension).every((key) => FACETS.includes(key))).toBe(true);
    expect(extension.id).toBe('tessera');
  });

  it('reads the Tessera config of the root the factory passes', () => {
    const rootDir = process.cwd();
    expect(extension.eslint.options({ rootDir })).toEqual({ primitivesGlobs: ['src/primitives/**/*.tsx'] });
    expect(extension.stylelint.options({ rootDir })).toEqual({ tokenGlobs: ['src/tokens/index.css'] });
  });

  it('gives the primitives globs, primitives only, and the theme token file of the app config', () => {
    expect(extension.eslint.options({ rootDir: dir })).toEqual({ primitivesGlobs: ['packages/design/src/primitives/**/*.tsx'] });
    expect(extension.stylelint.options({ rootDir: dir })).toEqual({ tokenGlobs: ['packages/design/src/theme.css'] });
    const inDesign = { rootDir: dir, packageDir: join(dir, 'packages/design') };
    expect(extension.eslint.options(inDesign)).toEqual({ primitivesGlobs: ['src/primitives/**/*.tsx'] });
  });

  it('requires Name.usage.ts in each part folder of the package that holds it, and nowhere else', () => {
    expect(check('packages/design')).toEqual([
      'packages/design/src/compounds/SaveSlot: missing SaveSlot.usage.ts (every part in the folders of tessera.config.json says when to use it)',
    ]);
    expect(check('apps/desktop')).toEqual([
      'apps/desktop/src/views/Bare: missing Bare.usage.ts (every part in the folders of tessera.config.json says when to use it)',
    ]);
    expect(check('.')).toEqual([]);
  });

  it('supplies the check and empty options when there is no config', () => {
    const bare = fixtureRepo({ 'package.json': '{}' });
    const findings = extension.structure.checks[0]({ rootDir: bare, packageDir: bare });
    const options = [extension.eslint.options({ rootDir: bare }), extension.stylelint.options({ rootDir: bare })];
    rmSync(bare, { recursive: true, force: true });
    expect(options).toEqual([{}, {}]);
    expect(findings).toEqual([]);
  });

  it('reports a broken config as a structure finding, never while loading', () => {
    const broken = fixtureRepo({ ...MONOREPO, 'tessera.config.json': { parts: { widgets: 'src/widgets' } } });
    const findings = extension.structure.checks[0]({ rootDir: broken, packageDir: broken });
    const options = extension.eslint.options({ rootDir: broken });
    rmSync(broken, { recursive: true, force: true });
    expect(options).toEqual({});
    expect(findings).toEqual([expect.stringContaining('unknown key "parts.widgets"')]);
  });
});

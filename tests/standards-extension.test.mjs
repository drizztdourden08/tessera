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
const check = (packageDir) => tesseraExtension(dir).structure.checks[0]({ rootDir: dir, packageDir: join(dir, packageDir), label: packageDir, pkg: {}, kind: 'package' });

afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe('the standards extension', () => {
  it('is declared in package.json and keeps to the facets standards takes', () => {
    const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    expect(manifest.standards).toEqual({ extension: './standards.extension.mjs' });
    expect(Object.keys(extension).every((key) => FACETS.includes(key))).toBe(true);
    expect(extension.id).toBe('tessera');
  });

  it('reads the Tessera config when loaded in this repo', () => {
    expect(extension.eslint.options.primitivesGlobs).toEqual(['src/primitives/**/*.tsx', 'src/composites/**/*.tsx']);
    expect(extension.stylelint.options.tokenGlobs).toEqual(['src/tokens/index.css']);
  });

  it('gives the primitives globs and the theme token file of the app config', () => {
    const options = tesseraExtension(join(dir, 'apps/desktop'));
    expect(options.eslint.options.primitivesGlobs).toEqual(['packages/design/src/primitives/**/*.tsx', 'packages/design/src/composites/**/*.tsx']);
    expect(options.stylelint.options.tokenGlobs).toEqual(['packages/design/src/theme.css']);
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

  it('supplies the check alone when there is no config', () => {
    const bare = fixtureRepo({ 'package.json': '{}' });
    const plain = tesseraExtension(bare);
    const findings = plain.structure.checks[0]({ rootDir: bare, packageDir: bare });
    rmSync(bare, { recursive: true, force: true });
    expect(Object.keys(plain)).toEqual(['id', 'description', 'structure']);
    expect(findings).toEqual([]);
  });

  it('reports a broken config as a structure finding', () => {
    const broken = fixtureRepo({ ...MONOREPO, 'tessera.config.json': { parts: { widgets: 'src/widgets' } } });
    const findings = extension.structure.checks[0]({ rootDir: broken, packageDir: broken });
    rmSync(broken, { recursive: true, force: true });
    expect(findings).toEqual([expect.stringContaining('unknown key "parts.widgets"')]);
  });
});

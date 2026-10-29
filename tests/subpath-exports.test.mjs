/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve('.');
const SRC = path.join(ROOT, 'src');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const NAME = MANIFEST.name;
const requireSelf = createRequire(path.join(ROOT, 'tests', 'subpath-exports.test.mjs'));
const EXTENSIONS = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];

const folders = (tier) => fs.readdirSync(path.join(SRC, tier), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
const hasIndex = (tier, folder) => fs.existsSync(path.join(SRC, tier, folder, 'index.ts'));
const resolves = (specifier) => path.relative(ROOT, requireSelf.resolve(specifier)).replaceAll('\\', '/');

const resolveFile = (from, spec) => {
  const base = path.resolve(path.dirname(from), spec);
  return EXTENSIONS.map((extension) => base + extension).find((file) => fs.existsSync(file) && fs.statSync(file).isFile());
};

const IMPORT = /(import|export)\s+(type\s+)?(?:[^'";]*?\s)?(?:from\s*)?'(\.[^']*)'/g;
const BARRELISH = /(^|\/)(\.\.|primitives|composites|data|brand|index|[a-z]+-exports)$/;

const valueImports = (file, { onlyBarrelish = false } = {}) =>
  [...fs.readFileSync(file, 'utf8').matchAll(IMPORT)]
    .filter((match) => !match[2] && (!onlyBarrelish || BARRELISH.test(match[3])))
    .map((match) => resolveFile(file, match[3]))
    .filter(Boolean);

const reachable = (entry) => {
  const seen = new Set();
  const stack = [entry];
  while (stack.length > 0) {
    const file = stack.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    if (/\.tsx?$/.test(file)) stack.push(...valueImports(file));
  }
  return seen;
};

const sourceFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });

const BARRELS = new Set([
  path.join(SRC, 'index.ts'),
  ...['primitives', 'composites', 'data', 'brand'].map((tier) => path.join(SRC, tier, 'index.ts')),
  ...['primitives', 'composites'].flatMap((tier) => folders(tier).filter((folder) => folder.endsWith('-exports')).map((folder) => path.join(SRC, tier, folder, 'index.ts'))),
]);

const importsBarrel = (file) => valueImports(file, { onlyBarrelish: true }).some((target) => BARRELS.has(target));

describe('per-component subpath exports', () => {
  it('declares one pattern for primitives and one for composites', () => {
    expect(MANIFEST.exports['./primitives/*']).toBe('./src/primitives/*/index.ts');
    expect(MANIFEST.exports['./composites/*']).toBe('./src/composites/*/index.ts');
  });

  it('keeps every earlier export key', () => {
    const keys = ['.', './primitives', './composites', './data', './brand', './color-picker', './color-picker-popover', './field-kits', './tokens.css', './brand/*', './config'];
    expect(keys.filter((key) => !(key in MANIFEST.exports))).toEqual([]);
    expect(resolves(`${NAME}/primitives`)).toBe('src/primitives/index.ts');
    expect(resolves(`${NAME}/color-picker`)).toBe('src/composites/ColorPicker/index.ts');
    expect(resolves(`${NAME}/field-kits`)).toBe('src/composites/field-kits/index.ts');
  });

  it('resolves a sample of single components, kits and group barrels', () => {
    expect(resolves(`${NAME}/primitives/Button`)).toBe('src/primitives/Button/index.ts');
    expect(resolves(`${NAME}/primitives/layout-exports`)).toBe('src/primitives/layout-exports/index.ts');
    expect(resolves(`${NAME}/composites/DataTable`)).toBe('src/composites/DataTable/index.ts');
    expect(resolves(`${NAME}/composites/selection`)).toBe('src/composites/selection/index.ts');
    expect(resolves(`${NAME}/composites/wheel-step`)).toBe('src/composites/wheel-step/index.ts');
    expect(resolves(`${NAME}/composites/layout-exports`)).toBe('src/composites/layout-exports/index.ts');
  });

  it.each(['primitives', 'composites'])('resolves every %s folder that has an index.ts', (tier) => {
    const named = folders(tier).filter((folder) => hasIndex(tier, folder));
    expect(named.length).toBeGreaterThan(20);
    for (const folder of named) expect(resolves(`${NAME}/${tier}/${folder}`)).toBe(`src/${tier}/${folder}/index.ts`);
  });

  it.each(['primitives', 'composites'])('gives every capitalised %s folder an index.ts', (tier) => {
    expect(folders(tier).filter((folder) => /^[A-Z]/.test(folder) && !hasIndex(tier, folder))).toEqual([]);
  });
});

describe('imports that stay inside their own module graph', () => {
  const FIXED = [
    'composites/KeyboardLayout/behavior/build-layout.ts', 'composites/KeyboardLayout/sub-components/KeyboardKey.tsx',
    'composites/LogPanel/sub-components/LogInput.tsx', 'composites/LogPanel/sub-components/LogLine.tsx', 'composites/LogPanel/sub-components/AnsiText.tsx',
    'composites/ShortcutTour/behavior/tour-label.ts', 'composites/ShortcutTour/sub-components/TourMouse.tsx',
    'composites/SplitPane/SplitPane.tsx', 'composites/SplitPane/sub-components/SplitPaneSide.tsx', 'composites/SplitPane/sub-components/SplitPaneSummary.tsx',
  ];

  it('keeps the formerly leaking files off every barrel', () => {
    for (const file of FIXED) expect(valueImports(path.join(SRC, file)).filter((target) => BARRELS.has(target)), file).toEqual([]);
  });

  it('keeps every component, helper and kit file off every barrel', () => {
    const offenders = ['primitives', 'composites'].flatMap((tier) => sourceFiles(path.join(SRC, tier)))
      .filter((file) => !BARRELS.has(file))
      .filter(importsBarrel)
      .map((file) => path.relative(SRC, file).replaceAll('\\', '/'));
    expect(offenders).toEqual([]);
  }, 120000);

  it('loads one primitive without any barrel or composite', () => {
    const graph = [...reachable(path.join(SRC, 'primitives/Button/index.ts'))];
    expect(graph.filter((file) => BARRELS.has(file))).toEqual([]);
    expect(graph.filter((file) => file.startsWith(path.join(SRC, 'composites')))).toEqual([]);
    expect(graph.length).toBeLessThan(600);
  }, 60000);

  it('loads one composite without the other composites it does not use', () => {
    const graph = [...reachable(path.join(SRC, 'composites/SplitPane/index.ts'))];
    expect(graph.filter((file) => BARRELS.has(file))).toEqual([]);
    expect(graph.length).toBeLessThan(700);
  }, 60000);
});

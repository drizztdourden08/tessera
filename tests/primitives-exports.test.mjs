/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve('.');
const NAMES = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests/fixtures/primitives-export-names.json'), 'utf8'));
const GROUP_BARRELS = fs.readdirSync(path.join(ROOT, 'src/primitives')).filter((entry) => entry.endsWith('-exports'));
const MAX_LINES = 200;

const exportsOf = (program, file) => {
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(path.join(ROOT, file));
  return new Set(checker.getExportsOfModule(checker.getSymbolAtLocation(source)).map((symbol) => symbol.name));
};

const config = ts.getParsedCommandLineOfConfigFile(path.join(ROOT, 'tsconfig.json'), {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => undefined });
const program = ts.createProgram({ rootNames: [path.join(ROOT, 'src/primitives/index.ts'), path.join(ROOT, 'src/index.ts')], options: config.options });

describe('the primitives barrel after the split into group barrels', () => {
  it('keeps the recorded list of public names', () => {
    expect(NAMES.length).toBeGreaterThan(500);
    expect(new Set(NAMES).size).toBe(NAMES.length);
  });

  it('still exports every recorded name from src/primitives', () => {
    const found = exportsOf(program, 'src/primitives/index.ts');
    expect(NAMES.filter((name) => !found.has(name))).toEqual([]);
  }, 60000);

  it('still exports every recorded name from the package root', () => {
    const found = exportsOf(program, 'src/index.ts');
    expect(NAMES.filter((name) => !found.has(name))).toEqual([]);
  }, 60000);

  it('keeps every barrel under the line limit and re-exports each group barrel', () => {
    const index = fs.readFileSync(path.join(ROOT, 'src/primitives/index.ts'), 'utf8');
    expect(GROUP_BARRELS.length).toBeGreaterThan(0);
    for (const folder of GROUP_BARRELS) {
      expect(index, folder).toContain(`export * from './${folder}';`);
      const lines = fs.readFileSync(path.join(ROOT, 'src/primitives', folder, 'index.ts'), 'utf8').split('\n').length;
      expect(lines, folder).toBeLessThanOrEqual(MAX_LINES);
    }
  });
});

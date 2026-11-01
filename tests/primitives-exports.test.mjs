/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve('.');
const NAMES = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests/fixtures/primitives-export-names.json'), 'utf8'));

const exportsOf = (program, file) => {
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(path.join(ROOT, file));
  return new Set(checker.getExportsOfModule(checker.getSymbolAtLocation(source)).map((symbol) => symbol.name));
};

const config = ts.getParsedCommandLineOfConfigFile(path.join(ROOT, 'tsconfig.json'), {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => undefined });
const program = ts.createProgram({ rootNames: [path.join(ROOT, 'src/primitives/index.ts'), path.join(ROOT, 'src/index.ts')], options: config.options });

describe('E2 the primitives barrel after the split into group barrels', { tags: ['e2e'] }, () => {
  it('still exports every recorded name from src/primitives', () => {
    const found = exportsOf(program, 'src/primitives/index.ts');
    expect(NAMES.filter((name) => !found.has(name))).toEqual([]);
  });

  it('still exports every recorded name from the package root', () => {
    const found = exportsOf(program, 'src/index.ts');
    expect(NAMES.filter((name) => !found.has(name))).toEqual([]);
  });
});

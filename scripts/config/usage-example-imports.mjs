/* @layer tooling-scripts @kind logic */
import { createRequire } from 'node:module';
import { exampleText } from './example-text.mjs';
import { ALIAS, importReexport } from './import-reexport.mjs';

const USAGE_FILE = /\.usage\.ts$/;
const load = createRequire(import.meta.url);
const typescript = { module: undefined };
const tsModule = () => {
  typescript.module ??= load('typescript');
  return typescript.module;
};

const exampleImports = (ts, text) => {
  const source = ts.createSourceFile('example.tsx', text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
  let count = 0;
  const next = () => `${ALIAS}${count++}`;
  return source.statements
    .filter((statement) => ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier))
    .flatMap((statement) => importReexport(ts, statement, next));
};

const usageExampleImports = (text, filePath) => {
  if (!USAGE_FILE.test(filePath)) return text;
  const ts = tsModule();
  const example = exampleText(ts, ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
  if (example === undefined) return text;
  const lines = exampleImports(ts, example);
  return lines.length === 0 ? text : `${text}\n${lines.join('\n')}\n`;
};

export { usageExampleImports };

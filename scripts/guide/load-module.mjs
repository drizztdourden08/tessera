/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import ts from 'typescript';

const OPTIONS = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 };

const typesOnly = (file) => (specifier) => {
  throw new Error(`${file} imports ${specifier} when it runs; a usage file or a tree module imports types only`);
};

const loadModule = (root, file) => {
  const path = `${root}/${file}`;
  const { outputText } = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: OPTIONS, fileName: path });
  const module = { exports: {} };
  compileFunction(outputText, ['exports', 'require', 'module'], { filename: path })(module.exports, typesOnly(file), module);
  return module.exports;
};

export { loadModule };

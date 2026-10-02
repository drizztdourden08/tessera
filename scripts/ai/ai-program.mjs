/* @layer tooling-scripts @kind logic */
import ts from 'typescript';
import { EXAMPLE_DIR } from './ai.constants.mjs';

const cache = new Map();

const configOf = (root) => ts.getParsedCommandLineOfConfigFile(`${root}/tsconfig.json`, {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {} });

const hostFor = (options, virtual) => {
  const host = ts.createCompilerHost(options, true);
  const read = host.getSourceFile;
  host.getSourceFile = (file, language, ...rest) => {
    if (virtual.has(file)) return ts.createSourceFile(file, virtual.get(file), language, true, ts.ScriptKind.TSX);
    if (!cache.has(file)) cache.set(file, read(file, language, ...rest));
    return cache.get(file);
  };
  const exists = host.fileExists;
  host.fileExists = (file) => virtual.has(file) || exists(file);
  const readFile = host.readFile;
  host.readFile = (file) => virtual.get(file) ?? readFile(file);
  return host;
};

const createAiProgram = (root, { entries, examples }) => {
  const config = configOf(root);
  const exampleFiles = new Map(Object.keys(examples).map((name) => [name, `${root}/${EXAMPLE_DIR}/${name}.example.tsx`]));
  const virtual = new Map([...exampleFiles].map(([name, file]) => [file, examples[name]]));
  const typeFiles = config.fileNames.filter((file) => file.startsWith(`${root}/types/`));
  const rootNames = [...entries.map((entry) => `${root}/${entry}`), ...typeFiles, ...virtual.keys()];
  const program = ts.createProgram({ rootNames, options: config.options, host: hostFor(config.options, virtual) });
  return { program, checker: program.getTypeChecker(), exampleFiles };
};

export { createAiProgram };

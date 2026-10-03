/* @layer tooling-scripts @kind logic */
import ts from 'typescript';

const cache = new Map();
const EXAMPLE_OPTIONS = { noUnusedLocals: false, noUnusedParameters: false };

const configOf = (tsconfig) => ts.getParsedCommandLineOfConfigFile(tsconfig, {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {} });

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

const createAiProgram = ({ tsconfig, rootNames, examples, ambient, paths }) => {
  const config = configOf(tsconfig);
  const options = { ...config.options, ...EXAMPLE_OPTIONS, ...(paths ? { paths: { ...config.options.paths, ...paths } } : {}) };
  const virtual = new Map(examples.map((example) => [example.file, example.text]));
  const names = [...rootNames, ...config.fileNames.filter(ambient), ...virtual.keys()];
  const program = ts.createProgram({ rootNames: names, options, host: hostFor(options, virtual) });
  return { program, checker: program.getTypeChecker(), exampleFiles: new Map(examples.map((example) => [example.name, example.file])) };
};

export { createAiProgram };

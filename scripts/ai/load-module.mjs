/* @layer tooling-scripts @kind logic */
import { runnerImport } from 'vite';

const RUNNER = { configFile: false, logLevel: 'silent' };

const loadModule = async (root, file) => (await runnerImport(`/${file}`, { ...RUNNER, root })).module;

export { loadModule };

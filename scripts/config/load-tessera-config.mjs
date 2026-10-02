/* @layer tooling-scripts @kind logic */
import { dirname } from 'node:path';
import { absolutePath } from './absolute-path.mjs';
import { appOf } from './app-of.mjs';
import { findTesseraConfig } from './find-tessera-config.mjs';
import { mergeConfig } from './merge-config.mjs';
import { readConfigFile } from './read-config-file.mjs';
import { resolveConfig } from './resolve-config.mjs';

const loadTesseraConfig = (fromDir = process.cwd()) => {
  const file = findTesseraConfig(fromDir);
  if (!file) return undefined;
  const raw = readConfigFile(file);
  const root = dirname(file);
  const app = appOf(raw.apps, root, fromDir);
  if (app === undefined) return resolveConfig(raw, { file, root });
  return { ...resolveConfig(mergeConfig(raw, raw.apps[app]), { file, root }), app: absolutePath(root, app) };
};

export { loadTesseraConfig };

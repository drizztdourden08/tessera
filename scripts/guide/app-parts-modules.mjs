/* @layer tooling-scripts @kind logic */
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { appScopes } from './app-scopes.mjs';
import { findAppParts } from './find-app-parts.mjs';
import { partsModuleFiles } from './parts-module-files.mjs';

const projectScopes = (config) => appScopes(config.app ? loadTesseraConfig(config.root) : config);

const appPartsModules = (config) => {
  const named = new Set(appScopes(config).map((scope) => scope.guide.parts));
  const parts = findAppParts(config.root, projectScopes(config)).filter((part) => named.has(part.scope.guide.parts));
  return partsModuleFiles(config.root, parts);
};

export { appPartsModules };

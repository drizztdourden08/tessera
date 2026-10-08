/* @layer tooling-scripts @kind logic */
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { appScopes } from './app-scopes.mjs';
import { findAppParts } from './find-app-parts.mjs';
import { partsModuleFiles } from './parts-module-files.mjs';

const projectScopes = (config) => appScopes(config.app ? loadTesseraConfig(config.root) : config);

const appPartsModules = (config) => partsModuleFiles(config.root, appScopes(config), findAppParts(config.root, projectScopes(config)));

export { appPartsModules };

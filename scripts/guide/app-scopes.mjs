/* @layer tooling-scripts @kind logic */
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';

const appScopes = (config) => (config.app ? [config] : [config, ...config.apps.map((app) => loadTesseraConfig(app))]);

export { appScopes };

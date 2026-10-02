/* @layer tooling-scripts @kind logic */
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { DEFAULT_MODE } from './ai.constants.mjs';

const aiMode = (root) => {
  try {
    return { mode: loadTesseraConfig(root)?.ai.usage ?? DEFAULT_MODE };
  } catch (error) {
    return { mode: 'enforce', problem: error instanceof Error ? error.message : String(error) };
  }
};

export { aiMode };

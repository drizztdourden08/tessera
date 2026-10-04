/* @layer tooling-scripts @kind logic */
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { DEFAULT_MODE } from './guide.constants.mjs';

const guideMode = (root) => {
  try {
    return { mode: loadTesseraConfig(root)?.guide.usage ?? DEFAULT_MODE };
  } catch (error) {
    return { mode: 'enforce', problem: error instanceof Error ? error.message : String(error) };
  }
};

export { guideMode };

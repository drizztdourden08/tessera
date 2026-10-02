/* @layer tooling-scripts @kind logic */
import { loadModule } from './load-module.mjs';

const readUsage = async (root, file) => {
  try {
    const { usage } = await loadModule(root, file);
    return usage && typeof usage === 'object' ? { usage } : { usage: {}, error: `${file} exports no usage object` };
  } catch (error) {
    return { usage: {}, error: `${file} could not be loaded: ${error instanceof Error ? error.message : String(error)}` };
  }
};

export { readUsage };

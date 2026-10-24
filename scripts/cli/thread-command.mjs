/* @layer tooling-scripts @kind logic */
import { MISSING_THREAD } from './cli.constants.mjs';

const loadThread = async () => {
  try {
    return await import('@drizztdourden08/brock-thread/cli');
  } catch (error) {
    if (error?.code === 'ERR_MODULE_NOT_FOUND') return null;
    throw error;
  }
};

const runThreadCommand = async (verb, args) => {
  const thread = await loadThread();
  if (!thread) {
    console.error(MISSING_THREAD);
    return 1;
  }
  return thread.runThread([verb, ...args]);
};

export { runThreadCommand };

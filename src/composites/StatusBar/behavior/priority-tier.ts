/* @layer renderer-components @kind logic */
import { PRIORITY_LEAST } from '../StatusBar.constants';

const priorityTier = (priority: number): 1 | 2 | 3 => {
  const tier = Math.min(Math.max(Math.round(priority), 1), PRIORITY_LEAST);
  return tier === 1 || tier === 2 ? tier : 3;
};

export { priorityTier };

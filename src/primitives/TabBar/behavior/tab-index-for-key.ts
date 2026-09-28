/* @layer renderer-components @kind logic */
import { STEP_BY_KEY } from './tab-index-for-key.constants';

const tabIndexForKey = (key: string, current: number, count: number): number | null => {
  if (count === 0) return null;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  const step = STEP_BY_KEY[key];
  return step === undefined ? null : (current + step + count) % count;
};

export { tabIndexForKey };

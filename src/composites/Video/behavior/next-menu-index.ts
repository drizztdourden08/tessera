/* @layer renderer-components @kind logic */
import { MENU_KEY_STEPS } from '../Video.constants';

const nextMenuIndex = (key: string, index: number, count: number): number | null => {
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  const step = MENU_KEY_STEPS[key];
  return step === undefined ? null : (Math.max(index, 0) + step + count) % count;
};

export { nextMenuIndex };

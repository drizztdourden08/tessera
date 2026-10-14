/* @layer renderer-components @kind logic */
import { RATING_KEY_STEP } from '../Rating.constants';

const nextStar = (key: string, current: number, max: number): number | null => {
  if (key === 'Home') return 1;
  if (key === 'End') return max;
  const step = RATING_KEY_STEP[key];
  if (step === undefined) return null;
  return Math.min(max, Math.max(1, current + step));
};

export { nextStar };

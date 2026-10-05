/* @layer renderer-components @kind logic */
import { SEEK_KEY_DELTAS } from '../Video.constants';

const seekTarget = (key: string, currentTime: number, duration: number): number | null => {
  if (key === 'Home') return 0;
  if (key === 'End') return duration;
  const delta = SEEK_KEY_DELTAS[key];
  return delta === undefined ? null : currentTime + delta;
};

export { seekTarget };

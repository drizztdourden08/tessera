/* @layer renderer-components @kind logic */
import { CHUNK } from './useLogWindow.constants';

const nextLogWindow = (visible: number, appended: number | null, total: number, pinned: boolean): number => {
  if (pinned || appended === null) return CHUNK;
  return Math.max(CHUNK, Math.min(total, visible + appended));
};

export { nextLogWindow };

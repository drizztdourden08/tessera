/* @layer renderer-components @kind logic */
import type { TargetSeek } from './tour-internal.type';

const seekTarget = async (seek: TargetSeek, left = seek.tries): Promise<HTMLElement | null> => {
  if (seek.signal.aborted) return null;
  const found = seek.find();
  if (found || left <= 0) return found;
  await seek.frame();
  return seekTarget(seek, left - 1);
};

export { seekTarget };

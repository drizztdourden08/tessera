/* @layer renderer-components @kind logic */
import { MIN_SHIFT_PX } from '../WindowTitleBar.constants';
import type { BarItemPlace, BarItemSnapshot } from './bar-slide.type';

const at = (x: number, opacity: number): Keyframe => ({ transform: `translateX(${x}px)`, opacity, visibility: 'visible' });

const slideKeyframes = (before: BarItemSnapshot, now: BarItemPlace): Keyframe[] | null => {
  const shift = before.offset - now.offset;
  if (now.away) return before.seen ? [at(shift, before.opacity), at(shift + now.out, 0)] : null;
  if (before.away && !before.seen) return [at(now.out, 0), at(0, 1)];
  const moved = before.away || before.opacity < 1 || Math.abs(shift) >= MIN_SHIFT_PX;
  return moved ? [at(shift, before.opacity), at(0, 1)] : null;
};

export { slideKeyframes };

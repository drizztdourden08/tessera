/* @layer renderer-components @kind logic */
import type { SplitOrientation } from '../SplitPane.type';

const pixelsPerPercent = (track: HTMLElement | null, handle: HTMLElement, orientation: SplitOrientation): number => {
  if (!track) return 0;
  const room = track.getBoundingClientRect();
  const own = handle.getBoundingClientRect();
  const span = orientation === 'horizontal' ? room.width - own.width : room.height - own.height;
  return span / 100;
};

export { pixelsPerPercent };

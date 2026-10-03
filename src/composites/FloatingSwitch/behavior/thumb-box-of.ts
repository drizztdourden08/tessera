/* @layer renderer-components @kind logic */
import type { ThumbBox } from './useSwitchThumb.type';

const thumbBoxOf = (track: HTMLElement, item: HTMLElement | null): ThumbBox | null => {
  if (!item) return null;
  const rtl = getComputedStyle(track).direction === 'rtl';
  const start = rtl ? track.clientWidth - item.offsetLeft - item.offsetWidth : item.offsetLeft;
  return { start, size: item.offsetWidth };
};

export { thumbBoxOf };

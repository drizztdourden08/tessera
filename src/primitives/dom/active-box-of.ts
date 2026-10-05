/* @layer renderer-components @kind util */
import type { ActiveBox } from './active-box.type';
import { ownerWindowOf } from './owner-window';

const activeBoxOf = (track: HTMLElement, item: HTMLElement | null): ActiveBox | null => {
  if (!item) return null;
  const rtl = ownerWindowOf(track).getComputedStyle(track).direction === 'rtl';
  const left = item.offsetLeft;
  return { left, start: rtl ? track.clientWidth - left - item.offsetWidth : left, size: item.offsetWidth };
};

export { activeBoxOf };

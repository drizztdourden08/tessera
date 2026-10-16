/* @layer renderer-components @kind logic */
import { LEAST_ITEMS, TRACK_CLASS } from './scroll-strip.constants';

const widthOf = (element: Element): number => element.getBoundingClientRect().width;

const contentWidth = (items: readonly Element[]): number => {
  const first = items[0];
  const last = items[items.length - 1];
  if (!first || !last) return 0;
  return last.getBoundingClientRect().right - first.getBoundingClientRect().left;
};

const stripLeastWidth = (part: HTMLElement): number | null => {
  const track = part.querySelector<HTMLElement>(`.${TRACK_CLASS}`);
  if (!track) return null;
  const items = [...track.children];
  const chrome = widthOf(part) - track.clientWidth;
  const widest = Math.max(0, ...items.map(widthOf));
  return chrome + Math.min(contentWidth(items), widest * LEAST_ITEMS);
};

export { stripLeastWidth };

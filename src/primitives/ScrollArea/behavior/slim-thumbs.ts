/* @layer renderer-components @kind logic */
import type { ScrollAxis } from '../ScrollArea.type';
import { slimThumbSpan } from './slim-thumb-span';
import type { SlimThumbs } from './slim-thumb.type';

const slimThumbs = (node: HTMLElement, axis: ScrollAxis): SlimThumbs => {
  const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = node;
  const rtl = axis !== 'y' && scrollLeft <= 0 && getComputedStyle(node).direction === 'rtl';
  const left = rtl ? scrollWidth - clientWidth + scrollLeft : scrollLeft;
  return {
    y: axis === 'x' ? null : slimThumbSpan(clientHeight, scrollHeight, scrollTop),
    x: axis === 'y' ? null : slimThumbSpan(clientWidth, scrollWidth, left),
  };
};

export { slimThumbs };

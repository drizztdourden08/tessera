/* @layer renderer-components @kind util */
import { cssZoomOf } from '../dom/css-zoom-of';
import { isHTMLElement } from '../dom/is-html-element';
import { blockRange } from './block-range';
import type { ListboxWindow, WindowReadInput } from './listbox-window.type';

const rowSizeOf = (list: HTMLElement, before: number): number => {
  const option = list.querySelector('[role="option"]');
  return isHTMLElement(option) && option.offsetHeight > 0 ? option.offsetHeight : before;
};

const readListWindow = (input: WindowReadInput): ListboxWindow => {
  const { scroller, list, before } = input;
  const zoom = cssZoomOf(scroller);
  const top = scroller.getBoundingClientRect().top + scroller.clientTop * zoom;
  const viewport = scroller.clientHeight;
  const rowSize = rowSizeOf(list, before.rowSize);
  const anchors = Array.from(list.querySelectorAll<HTMLElement>('[data-listbox-count]'));
  const ranges = anchors.map((anchor) => blockRange({
    below: (anchor.getBoundingClientRect().top - top) / zoom,
    viewport,
    rowSize,
    count: Number(anchor.dataset.listboxCount),
  }));
  return { rowSize, ranges };
};

export { readListWindow };

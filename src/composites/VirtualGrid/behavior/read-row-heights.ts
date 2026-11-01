/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ROW_ATTRIBUTE } from '../VirtualGrid.constants';

const readRowHeights = (body: HTMLElement, keyAt: (row: number) => string | undefined): ReadonlyMap<string, number> => {
  const found = new Map<string, number>();
  body.querySelectorAll(`[${ROW_ATTRIBUTE}]`).forEach((node) => {
    if (!isHTMLElement(node) || node.offsetHeight <= 0) return;
    const key = keyAt(Number(node.getAttribute(ROW_ATTRIBUTE)));
    if (key !== undefined) found.set(key, node.offsetHeight);
  });
  return found;
};

export { readRowHeights };

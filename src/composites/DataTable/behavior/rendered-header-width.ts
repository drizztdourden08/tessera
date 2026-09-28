/* @layer renderer-components @kind logic */
import { HEAD_ATTR } from './measure-column.constants';

const renderedHeaderWidth = (root: ParentNode, path: string): number => {
  const head = root.querySelector(`[${HEAD_ATTR}="${path}"]`);
  return head instanceof HTMLElement ? head.getBoundingClientRect().width : 0;
};

export { renderedHeaderWidth };

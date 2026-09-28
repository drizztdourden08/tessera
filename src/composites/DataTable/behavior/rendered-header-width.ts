/* @layer renderer-components @kind logic */
import { HEAD_ATTR } from './measure-column.constants';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const renderedHeaderWidth = (root: ParentNode, path: string): number => {
  const head = root.querySelector(`[${HEAD_ATTR}="${path}"]`);
  return isHTMLElement(head) ? head.getBoundingClientRect().width : 0;
};

export { renderedHeaderWidth };

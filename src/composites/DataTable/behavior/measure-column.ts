/* @layer renderer-components @kind logic */
import { fitAllWidths } from './column-width-math';
import { naturalContentWidth } from './measure-natural-width';
import { naturalContentWidths } from './natural-content-widths';
import { CELL_ATTR, HEAD_ATTR, LABEL_ATTR } from './measure-column.constants';
import type { ColumnWidth } from './column-width-math.type';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const headerContentWidth = (cell: HTMLElement): number => {
  const label = cell.querySelector(`[${LABEL_ATTR}]`);
  if (!isHTMLElement(label)) return naturalContentWidth(cell);
  const chrome = cell.getBoundingClientRect().width - label.getBoundingClientRect().width;
  return chrome + naturalContentWidth(label);
};

const htmlElements = (root: ParentNode, selector: string): HTMLElement[] =>
  [...root.querySelectorAll(selector)].filter((node): node is HTMLElement => isHTMLElement(node));

const columnContentWidths = (root: ParentNode, path: string): number[] => [
  ...htmlElements(root, `[${HEAD_ATTR}="${path}"]`).map(headerContentWidth),
  ...naturalContentWidths(htmlElements(root, `[${CELL_ATTR}="${path}"]`)),
];

const measuredFitWidths = (root: ParentNode, paths: readonly string[]): ColumnWidth[] =>
  fitAllWidths(paths, (path) => columnContentWidths(root, path));

export { measuredFitWidths };

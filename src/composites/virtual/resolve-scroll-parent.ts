/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../primitives/dom/is-html-element';
import { findScrollParent } from './find-scroll-parent';
import type { VirtualScrollParent } from './virtual.type';

const resolveScrollParent = (option: VirtualScrollParent, root: HTMLElement): HTMLElement | null => {
  if (option === 'auto') return findScrollParent(root);
  if (isHTMLElement(option)) return option;
  return option.current;
};

export { resolveScrollParent };

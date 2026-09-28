/* @layer renderer-components @kind util */
import { ownerDocumentOf } from '../../dom/owner-document';
import { ownerWindowOf } from '../../dom/owner-window';
import { CLIPPING_OVERFLOW } from './anchor-position.constants';

const clipsOverflow = (el: Element): boolean => {
  const style = ownerWindowOf(el).getComputedStyle(el);
  return CLIPPING_OVERFLOW.test(style.overflowY) || CLIPPING_OVERFLOW.test(style.overflowX);
};

const clippingAncestorsOf = (el: Element): Element[] => {
  const chain: Element[] = [];
  const { body } = ownerDocumentOf(el);
  for (let node = el.parentElement; node && node !== body; node = node.parentElement) {
    if (clipsOverflow(node)) chain.push(node);
  }
  return chain;
};

export { clippingAncestorsOf };

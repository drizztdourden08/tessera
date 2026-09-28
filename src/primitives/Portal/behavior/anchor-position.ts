/* @layer renderer-components @kind util */
import { CLIPPING_OVERFLOW } from './anchor-position.constants';

const clipsOverflow = (el: Element): boolean => {
  const style = getComputedStyle(el);
  return CLIPPING_OVERFLOW.test(style.overflowY) || CLIPPING_OVERFLOW.test(style.overflowX);
};

const clippingAncestorsOf = (el: Element): Element[] => {
  const chain: Element[] = [];
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    if (clipsOverflow(node)) chain.push(node);
  }
  return chain;
};

export { clippingAncestorsOf };

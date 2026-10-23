/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { PIXEL_FALLBACK, PIXEL_TOKENS } from '../PixelViewport.constants';
import type { ViewLook } from './viewport.type';
import { readLength } from './read-length';

const readLook = (root: HTMLElement): ViewLook => {
  const style = ownerWindowOf(root).getComputedStyle(root);
  return {
    checkA: style.getPropertyValue(PIXEL_TOKENS.checkA).trim(),
    checkB: style.getPropertyValue(PIXEL_TOKENS.checkB).trim(),
    grid: style.getPropertyValue(PIXEL_TOKENS.grid).trim(),
    check: readLength(style, PIXEL_TOKENS.check, PIXEL_FALLBACK.check),
  };
};

export { readLook };

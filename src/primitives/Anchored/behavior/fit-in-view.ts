/* @layer renderer-components @kind util */
import { fitAxis } from './fit-axis';
import type { FitBox, FitShift, FitSize } from './fit-in-view.type';

const fitInView = (popup: FitBox, anchor: FitBox, view: FitSize, margin: number): FitShift => ({
  x: fitAxis({ lo: popup.left, hi: popup.right }, { lo: anchor.left, hi: anchor.right }, view.width, margin),
  y: fitAxis({ lo: popup.top, hi: popup.bottom }, { lo: anchor.top, hi: anchor.bottom }, view.height, margin),
});

export { fitInView };

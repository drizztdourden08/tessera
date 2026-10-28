/* @layer renderer-components @kind util */
import { fitInView } from './fit-in-view';
import type { FitBox, FitShift } from './fit-in-view.type';

const moved = (box: FitBox, bounds: FitBox): FitBox => ({
  left: box.left - bounds.left,
  top: box.top - bounds.top,
  right: box.right - bounds.left,
  bottom: box.bottom - bounds.top,
});

const fitInBox = (popup: FitBox, anchor: FitBox, bounds: FitBox, margin: number): FitShift =>
  fitInView(moved(popup, bounds), moved(anchor, bounds), { width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }, margin);

export { fitInBox };

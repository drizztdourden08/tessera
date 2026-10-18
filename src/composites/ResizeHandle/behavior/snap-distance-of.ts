/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { FOLD_SNAP_FALLBACK, FOLD_SNAP_TOKEN } from '../ResizeHandle.constants';

const snapDistanceOf = (handle: HTMLElement): number => {
  const read = Number.parseFloat(ownerWindowOf(handle).getComputedStyle(handle).getPropertyValue(FOLD_SNAP_TOKEN));
  return Number.isFinite(read) && read > 0 ? read : FOLD_SNAP_FALLBACK;
};

export { snapDistanceOf };

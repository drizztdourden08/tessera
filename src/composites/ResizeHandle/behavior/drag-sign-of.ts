/* @layer renderer-components @kind logic */
import type { SplitOrientation } from '../../SplitPane/SplitPane.type';
import type { ResizeHandleEdge } from '../ResizeHandle.type';

const dragSignOf = (handle: Element, orientation: SplitOrientation, edge: ResizeHandleEdge): number => {
  const rtl = orientation === 'horizontal' && getComputedStyle(handle).direction === 'rtl';
  const flips = Number(rtl) + Number(edge === 'end');
  return flips % 2 === 0 ? 1 : -1;
};

export { dragSignOf };

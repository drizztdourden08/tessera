/* @layer renderer-components @kind util */
import type { AnchoredRect } from '../Anchored.type';

const boxOf = (rect: AnchoredRect): DOMRect => ({
  left: rect.left,
  top: rect.top,
  width: rect.width,
  height: rect.height,
  right: rect.left + rect.width,
  bottom: rect.top + rect.height,
  x: rect.left,
  y: rect.top,
  toJSON: () => rect,
});

export { boxOf };

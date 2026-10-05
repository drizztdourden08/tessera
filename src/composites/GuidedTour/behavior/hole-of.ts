/* @layer renderer-components @kind logic */
import type { HoleRect } from './tour-internal.type';

const holeOf = (box: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>, pad: number, radius: number): HoleRect => ({
  x: box.left - pad,
  y: box.top - pad,
  width: box.width + pad * 2,
  height: box.height + pad * 2,
  radius,
});

export { holeOf };

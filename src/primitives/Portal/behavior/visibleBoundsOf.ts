/* @layer renderer-components @kind util */
import { viewportBounds } from './viewportBounds';
import type { Bounds } from './anchor-position.type';

const intersect = (a: Bounds, b: Bounds): Bounds => ({
  top: Math.max(a.top, b.top),
  right: Math.min(a.right, b.right),
  bottom: Math.min(a.bottom, b.bottom),
  left: Math.max(a.left, b.left),
});

const visibleBoundsOf = (ancestors: readonly Element[]): Bounds =>
  ancestors.reduce<Bounds>((acc, el) => intersect(acc, el.getBoundingClientRect()), viewportBounds());

export { visibleBoundsOf };

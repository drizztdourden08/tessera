/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';
import type { SnapLines } from './snap.type';

const snapLinesOf = (targets: readonly Rect[]): SnapLines => ({
  x: targets.flatMap((r) => [r.x, r.x + r.width].map((at) => ({ at, from: r.y, to: r.y + r.height }))),
  y: targets.flatMap((r) => [r.y, r.y + r.height].map((at) => ({ at, from: r.x, to: r.x + r.width }))),
});

export { snapLinesOf };

/* @layer renderer-components @kind logic */
import { NO_SNAP_LINES } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { DragContext, DragSource, Point } from './drag.type';
import { floatTargets } from './float-targets';
import { snapLinesOf } from './snap-lines';
import { snapMove } from './snap-move';
import type { SnapLines } from './snap.type';
import { wantedRect } from './wanted-rect';

const snapLinesFor = (ctx: DragContext, source: DragSource): SnapLines =>
  (ctx.floatSnap > 0 && ctx.mainRect
    ? snapLinesOf(floatTargets(ctx.stage, ctx.mainRect, ctx.layout.floating, source.id))
    : NO_SNAP_LINES);

const snapWanted = (ctx: DragContext, source: DragSource, pointer: Point): { rect: Rect; lines: SnapLines } => {
  const lines = snapLinesFor(ctx, source);
  return { rect: snapMove(wantedRect(source, pointer), lines, ctx.floatSnap), lines };
};

export { snapWanted };

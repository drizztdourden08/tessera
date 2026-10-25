/* @layer renderer-components @kind logic */
import { MAX_LANES, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarDefinition, ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { cleanToolbarLane } from './clean-toolbar-lane';
import { finishToolbarLayout } from './finish-toolbar-layout';
import { readToolbarCorners } from './read-toolbar-corners';
import { toolbarReadContext } from './toolbar-read-context';

const cleanToolbarLayout = (raw: Record<string, unknown>, defs: readonly ToolbarDefinition[]): ToolbarLayout => {
  const { known, seen, rawSides, base } = toolbarReadContext(raw, defs);
  const dropped: Record<ToolbarSide, Set<number>> = { top: new Set(), bottom: new Set(), left: new Set(), right: new Set() };
  for (const side of TOOLBAR_SIDES) {
    const rawLanes: unknown = rawSides[side];
    if (!Array.isArray(rawLanes)) continue;
    rawLanes.forEach((rawLane: unknown, index) => {
      const lane = cleanToolbarLane(rawLane, known, seen);
      if (lane.length === 0 || base.sides[side].length >= MAX_LANES) {
        dropped[side].add(index);
        return;
      }
      for (const place of lane) seen.add(place.id);
      base.sides[side].push(lane);
    });
  }
  base.corners = readToolbarCorners(raw.corners, dropped);
  return finishToolbarLayout(base, raw, defs, seen);
};

export { cleanToolbarLayout };

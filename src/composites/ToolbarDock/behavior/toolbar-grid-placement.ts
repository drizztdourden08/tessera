/* @layer renderer-components @kind logic */
import { SHARE_EPSILON, TOOLBAR_AXIS, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarCornerClaim, ToolbarLayout, ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';
import { END_CORNER, GRID_LINES, START_CORNER } from './toolbar-grid-placement.constants';
import { normalizeCorners } from './normalize-corners';
import type { ToolbarBarTrack, ToolbarGridPlacement, ToolbarLaneGrid } from './toolbar-grid.type';

const claimedBefore = (claims: readonly ToolbarCornerClaim[], axis: ToolbarCornerClaim, nth: number): number => {
  let seen = 0;
  let other = 0;
  for (const claim of claims) {
    if (claim === axis) {
      if (seen === nth) return other;
      seen += 1;
    } else {
      other += 1;
    }
  }
  return other;
};

const fixedLine = (side: ToolbarSide, lane: number): number =>
  side === 'top' || side === 'left' ? lane + 1 : GRID_LINES - 1 - lane;

const span = (from: number, to: number): string => `${from} / ${to}`;

const share = (value: number): string => `minmax(0, ${Number(value.toFixed(6))}fr)`;

const laneTracks = (places: readonly ToolbarPlace[]): { tracks: string; bars: ToolbarBarTrack[] } => {
  const tracks: string[] = [];
  const bars: ToolbarBarTrack[] = [];
  let cursor = 0;
  for (const { id, start, size } of places) {
    if (start - cursor > SHARE_EPSILON) tracks.push(share(start - cursor));
    bars.push({ id, track: tracks.length + 1 });
    tracks.push(share(size));
    cursor = start + size;
  }
  if (1 - cursor > SHARE_EPSILON) tracks.push(share(1 - cursor));
  return { tracks: tracks.join(' '), bars };
};

const laneGrid = (layout: ToolbarLayout, side: ToolbarSide, lane: number): ToolbarLaneGrid => {
  const axis = TOOLBAR_AXIS[side];
  const before = claimedBefore(layout.corners[START_CORNER[side]], axis, lane);
  const after = claimedBefore(layout.corners[END_CORNER[side]], axis, lane);
  const along = span(1 + before, GRID_LINES - after);
  const across = span(fixedLine(side, lane), fixedLine(side, lane) + 1);
  const horizontal = axis === 'h';
  return {
    side,
    lane,
    gridRow: horizontal ? across : along,
    gridColumn: horizontal ? along : across,
    ...laneTracks(layout.sides[side][lane] ?? []),
  };
};

const toolbarGridPlacement = (input: ToolbarLayout): ToolbarGridPlacement => {
  const layout = normalizeCorners(input);
  const placement = { top: [], bottom: [], left: [], right: [] } as ToolbarGridPlacement;
  for (const side of TOOLBAR_SIDES) {
    placement[side] = layout.sides[side].map((_, lane) => laneGrid(layout, side, lane));
  }
  return placement;
};

export { toolbarGridPlacement };

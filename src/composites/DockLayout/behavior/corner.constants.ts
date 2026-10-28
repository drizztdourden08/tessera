/* @layer renderer-components @kind data */
import { GAP } from '../DockLayout.constants';
import type { SplitAxis } from '../DockLayout.type';
import type { CornerEnd, CornerReach, CornerSites } from './corner.type';

const CORNER_ENDS: readonly CornerEnd[] = ['start', 'end'];

const CORNER_AXES: readonly SplitAxis[] = ['row', 'column'];

const CORNER_HIT = 24;

const CORNER_HEADER = 30;

const CORNER_LIFT = CORNER_HIT / 2 - GAP / 2;

const NO_SITES: CornerSites = { take: null, give: null };

const NO_REACH: CornerReach = { size: null, corner: null };

const OUTWARD = { row: { start: 'ArrowLeft', end: 'ArrowRight' }, column: { start: 'ArrowUp', end: 'ArrowDown' } } as const;

const INWARD = { row: { start: 'ArrowRight', end: 'ArrowLeft' }, column: { start: 'ArrowDown', end: 'ArrowUp' } } as const;

export { CORNER_AXES, CORNER_ENDS, CORNER_HEADER, CORNER_HIT, CORNER_LIFT, INWARD, NO_REACH, NO_SITES, OUTWARD };

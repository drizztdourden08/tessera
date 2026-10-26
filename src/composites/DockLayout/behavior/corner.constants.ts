/* @layer renderer-components @kind data */
import type { SplitAxis } from '../DockLayout.type';
import type { CornerEnd, CornerReach, CornerSites } from './corner.type';

const CORNER_ENDS: readonly CornerEnd[] = ['start', 'end'];

const CORNER_AXES: readonly SplitAxis[] = ['row', 'column'];

const CORNER_HIT = 24;

const CORNER_HEADER = 30;

const CORNER_BUTTONS = 4;

const CORNER_BUTTON_GAP = 4;

const CORNER_TITLE_END = 4;

const CORNER_CLEAR = 10;

const CORNER_INSET = CORNER_TITLE_END + CORNER_BUTTONS * CORNER_HIT + (CORNER_BUTTONS - 1) * CORNER_BUTTON_GAP + CORNER_CLEAR;

const NO_SITES: CornerSites = { take: null, give: null };

const NO_REACH: CornerReach = { size: null, corner: null };

const OUTWARD = { row: { start: 'ArrowLeft', end: 'ArrowRight' }, column: { start: 'ArrowUp', end: 'ArrowDown' } } as const;

const INWARD = { row: { start: 'ArrowRight', end: 'ArrowLeft' }, column: { start: 'ArrowDown', end: 'ArrowUp' } } as const;

export { CORNER_AXES, CORNER_BUTTON_GAP, CORNER_BUTTONS, CORNER_ENDS, CORNER_HEADER, CORNER_HIT, CORNER_INSET, CORNER_TITLE_END, INWARD, NO_REACH, NO_SITES, OUTWARD };

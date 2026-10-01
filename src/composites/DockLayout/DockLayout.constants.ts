/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon';
import type { DockEdge, DragModifiers, MainNode } from './DockLayout.type';

const GAP = 8;

const STRIP = 30;

const MAIN_NODE: MainNode = { kind: 'main', key: 'main' };

const EDGES: readonly DockEdge[] = ['left', 'right', 'top', 'bottom'];

const SHARE = { mainBesidePane: 0.7, paneBesideMain: 0.26, paneBesidePane: 0.5, outerPane: 0.22, outerMain: 0.7 } as const;

const MIN_SIZE = 0.08;

const FLOAT_BOX = { width: 280, height: 200 } as const;

const POP_MARGIN = 16;

const DRAG_THRESHOLD = 4;

const OUTER_STRIP = 22;

const COMPASS = 40;

const COMPASS_OFFSET = 46;

const COMPASS_STEPS: Record<DockEdge, [number, number]> = {
  left: [-COMPASS_OFFSET, 0], right: [COMPASS_OFFSET, 0], top: [0, -COMPASS_OFFSET], bottom: [0, COMPASS_OFFSET],
};

const NO_HELD_KEYS = { shift: false, ctrl: false } as const;

const MAX_PUSHES = 6;

const EXTERNAL_GRAB = { x: 24, y: 15 } as const;

const GHOST_OFFSET = 12;

const HANDLE_SELECTOR = '[data-drag-tab],[data-drag-widget],[data-drag-main]';

const NO_MODIFIERS: DragModifiers = { swap: false, overlay: false };

const HINT_ICONS: Record<DockEdge | 'tab', IconName> = {
  left: 'panel-left', right: 'panel-right', top: 'panel-top', bottom: 'panel-bottom', tab: 'layers',
};

export {
  COMPASS, COMPASS_STEPS, DRAG_THRESHOLD, EDGES, EXTERNAL_GRAB, FLOAT_BOX, GAP, GHOST_OFFSET, HANDLE_SELECTOR, HINT_ICONS, MAIN_NODE,
  MAX_PUSHES, MIN_SIZE, NO_HELD_KEYS, NO_MODIFIERS, OUTER_STRIP, POP_MARGIN, SHARE, STRIP,
};

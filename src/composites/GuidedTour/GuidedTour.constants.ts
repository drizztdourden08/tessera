/* @layer renderer-components @kind constants */
import type { SpotHoles, TourKeyBinding, TourSide } from './behavior/tour-internal.type';

const TOUR_KEYS: readonly TourKeyBinding[] = [
  { key: 'ArrowLeft', keys: ['left'], action: 'back' },
  { key: 'ArrowRight', keys: ['right'], action: 'next' },
  { key: 'Enter', keys: ['enter'], action: 'next' },
  { key: 'Escape', keys: ['esc'], action: 'close' },
];

const SHOWN_KEYS = TOUR_KEYS.filter((binding) => binding.key !== 'Enter');

const TOUR_ATTRIBUTE = 'data-tour';

const QUOTED = /["\\]/g;

const EDITABLE = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';

const QUARTER_TURN = Math.PI / 2;

const TARGET_TRIES = 30;

const CORNER_POINTS = 6;

const MASCOT_ID = 'guide';

const MASCOT_HEIGHT = 128;

const MASCOT_SPEED = 900;

const MASCOT_GAP = 12;

const MASCOT_CLEAR = 8;

const RING_WIDTH = 2;

const BUBBLE_GAP = 16;

const VIEW_MARGIN = 12;

const SIDE_ORDER: Readonly<Record<TourSide, readonly TourSide[]>> = {
  bottom: ['bottom', 'top', 'right', 'left'],
  top: ['top', 'bottom', 'right', 'left'],
  right: ['right', 'left', 'bottom', 'top'],
  left: ['left', 'right', 'bottom', 'top'],
};

const ICON_SIZE = 14;

const INTRO_MASCOT_HEIGHT = 256;

const INTRO_MASCOT_BOX = { width: INTRO_MASCOT_HEIGHT, height: INTRO_MASCOT_HEIGHT } as const;

const MASCOT_BOX = { width: MASCOT_HEIGHT, height: MASCOT_HEIGHT } as const;

const MASCOT_SIZES = {
  large: { box: INTRO_MASCOT_BOX, height: INTRO_MASCOT_HEIGHT },
  small: { box: MASCOT_BOX, height: MASCOT_HEIGHT },
} as const;

const NO_HOLES: SpotHoles = { hole: null, kept: [] };

const NO_NODES: readonly HTMLElement[] = [];

export {
  BUBBLE_GAP, CORNER_POINTS, EDITABLE, ICON_SIZE, INTRO_MASCOT_BOX, INTRO_MASCOT_HEIGHT, MASCOT_BOX, MASCOT_CLEAR, MASCOT_GAP, MASCOT_ID, MASCOT_SIZES, MASCOT_SPEED, NO_HOLES, NO_NODES,
  QUARTER_TURN, QUOTED, RING_WIDTH, SHOWN_KEYS, SIDE_ORDER, TARGET_TRIES, TOUR_ATTRIBUTE, TOUR_KEYS, VIEW_MARGIN,
};

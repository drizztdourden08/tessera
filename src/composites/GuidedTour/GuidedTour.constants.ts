/* @layer renderer-components @kind constants */
import type { TourKeyBinding } from './behavior/tour-internal.type';

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

const MASCOT_HEIGHT = 88;

const MASCOT_SPEED = 900;

const MASCOT_GAP = 12;

const BUBBLE_GAP = 16;

const ICON_SIZE = 14;

const MASCOT_BOX = { width: MASCOT_HEIGHT, height: MASCOT_HEIGHT } as const;

export {
  BUBBLE_GAP, CORNER_POINTS, EDITABLE, ICON_SIZE, MASCOT_BOX, MASCOT_GAP, MASCOT_HEIGHT, MASCOT_ID, MASCOT_SPEED, QUARTER_TURN, QUOTED,
  SHOWN_KEYS, TARGET_TRIES, TOUR_ATTRIBUTE, TOUR_KEYS,
};

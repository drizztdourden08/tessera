/* @layer renderer-components @kind constants */
const BODY = 'M8 1.5a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0v-5a4 4 0 0 0-4-4z';
const SPLIT = 'M4 7h8';
const DIVIDE = 'M8 1.5V7';
const WHEEL = 'M8 2.75a1.25 1.25 0 0 1 1.25 1.25v1.5a1.25 1.25 0 0 1-2.5 0V4A1.25 1.25 0 0 1 8 2.75z';
const FRONT_SIDE = 'M2 6a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 2 6z';
const REAR_SIDE = 'M2 8.75a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 2 8.75z';
const FRONT_NUB = 'M2 6.75v.5';
const REAR_NUB = 'M2 9.5v.5';
const ARROW_UP = ['M18 12.5v-9', 'M15 6.5l3-3 3 3'];
const ARROW_DOWN = ['M18 3.5v9', 'M15 9.5l3 3 3-3'];
const ARROW_LEFT = ['M21.5 8h-7', 'M17.5 5l-3 3 3 3'];
const ARROW_RIGHT = ['M14.5 8h7', 'M18.5 5l3 3-3 3'];

const SQUARE = '0 0 16 16';
const WIDE = '0 0 23 16';
const BUTTONS = [BODY, SPLIT, DIVIDE];

const MOUSE_SPECS = {
  'mouse-left': { name: 'Left click', viewBox: SQUARE, strokes: BUTTONS, fills: ['M8 1.5a4 4 0 0 0-4 4V7h4z'] },
  'mouse-right': { name: 'Right click', viewBox: SQUARE, strokes: BUTTONS, fills: ['M8 1.5a4 4 0 0 1 4 4V7H8z'] },
  'mouse-middle': { name: 'Middle click', viewBox: SQUARE, strokes: BUTTONS, fills: [WHEEL] },
  'mouse-wheel-up': { name: 'Scroll up', viewBox: WIDE, strokes: [...BUTTONS, ...ARROW_UP], fills: [WHEEL] },
  'mouse-wheel-down': { name: 'Scroll down', viewBox: WIDE, strokes: [...BUTTONS, ...ARROW_DOWN], fills: [WHEEL] },
  'mouse-wheel-left': { name: 'Scroll left', viewBox: WIDE, strokes: [...BUTTONS, ...ARROW_LEFT], fills: [WHEEL] },
  'mouse-wheel-right': { name: 'Scroll right', viewBox: WIDE, strokes: [...BUTTONS, ...ARROW_RIGHT], fills: [WHEEL] },
  'mouse-back': { name: 'Back button', viewBox: WIDE, strokes: [...BUTTONS, FRONT_NUB, ...ARROW_LEFT], fills: [REAR_SIDE] },
  'mouse-forward': { name: 'Forward button', viewBox: WIDE, strokes: [...BUTTONS, REAR_NUB, ...ARROW_RIGHT], fills: [FRONT_SIDE] },
} as const;

export { MOUSE_SPECS };

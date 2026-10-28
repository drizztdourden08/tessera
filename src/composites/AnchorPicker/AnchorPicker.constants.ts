/* @layer renderer-components @kind data */
import type { Anchor, AnchorArrow } from './AnchorPicker.type';

const ANCHOR_GRID: readonly (readonly Anchor[])[] = [
  ['top-left', 'top', 'top-right'],
  ['left', 'center', 'right'],
  ['bottom-left', 'bottom', 'bottom-right'],
];

const ANCHORS: readonly Anchor[] = ANCHOR_GRID.flat();

const ANCHOR_LAST = ANCHOR_GRID.length - 1;

const ANCHOR_ATTRIBUTE = 'data-anchor';

const ANCHOR_KEY_STEP: Readonly<Record<string, readonly [number, number]>> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

const ARROW_NAMES: Readonly<Record<string, AnchorArrow>> = {
  '-1,0': 'up',
  '-1,1': 'up-right',
  '0,1': 'right',
  '1,1': 'down-right',
  '1,0': 'down',
  '1,-1': 'down-left',
  '0,-1': 'left',
  '-1,-1': 'up-left',
};

const ARROW_SIZE = 12;

const ARROW_SIZE_XS = 10;

export { ANCHOR_ATTRIBUTE, ARROW_SIZE, ARROW_SIZE_XS, ANCHOR_GRID, ANCHOR_KEY_STEP, ANCHOR_LAST, ANCHORS, ARROW_NAMES };

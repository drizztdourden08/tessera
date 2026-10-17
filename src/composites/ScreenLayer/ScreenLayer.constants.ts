/* @layer renderer-components @kind data */
import type { Point, Size } from '../rect-drag/rect-drag.type';

const LAYER_SELECTOR = '.screen-layer';

const OVERHANG_SELECTOR = ':scope > .screen-layer__floating, :scope > .screen-layer__corner';

const MOVE_MIN: Size = { width: 480, height: 320 };

const MOVE_KEYS: Readonly<Record<string, Point>> = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
};

export { LAYER_SELECTOR, MOVE_KEYS, MOVE_MIN, OVERHANG_SELECTOR };

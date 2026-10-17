/* @layer renderer-components @kind logic */
import type { Point } from '../../rect-drag/rect-drag.type';
import { DEFAULT_LARGE_STEP, DEFAULT_STEP } from '../../ResizeHandle/ResizeHandle.constants';
import { MOVE_KEYS } from '../ScreenLayer.constants';

const keyStep = (key: string, large: boolean): Point | null => {
  const way = MOVE_KEYS[key];
  if (way === undefined) return null;
  const step = large ? DEFAULT_LARGE_STEP : DEFAULT_STEP;
  return { x: way.x * step, y: way.y * step };
};

export { keyStep };

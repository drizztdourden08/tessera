/* @layer renderer-components @kind logic */
import type { Rect } from '../../rect-drag/rect-drag.type';
import { RECT_FIELDS } from '../ScreenWindow.constants';

const storedRect = (stored: unknown): Rect | undefined => {
  if (typeof stored !== 'object' || stored === null) return undefined;
  const value = stored as Record<string, unknown>;
  if (!RECT_FIELDS.every((key) => typeof value[key] === 'number' && Number.isFinite(value[key]))) return undefined;
  return { x: Number(value.x), y: Number(value.y), width: Number(value.width), height: Number(value.height) };
};

export { storedRect };

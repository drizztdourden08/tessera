/* @layer renderer-components @kind logic */
import type { FloatingWidget, Rect } from '../DockLayout.type';
import { clampInto } from './clamp-into';

const floatingRect = (f: FloatingWidget, main: Rect): Rect =>
  clampInto({ x: main.x + f.x * main.width, y: main.y + f.y * main.height, width: f.width, height: f.height }, main);

export { floatingRect };

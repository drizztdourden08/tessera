/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { Rect } from './rect-drag.type';

const rectStyle = (rect: Rect): CSSProperties =>
  ({ left: rect.x, top: rect.y, width: rect.width, height: rect.height });

export { rectStyle };

/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { Rect } from '../DockLayout.type';

const rectStyle = (rect: Rect): CSSProperties =>
  ({ left: rect.x, top: rect.y, width: rect.width, height: rect.height });

export { rectStyle };

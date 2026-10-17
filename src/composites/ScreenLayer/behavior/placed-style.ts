/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { Rect } from '../../rect-drag/rect-drag.type';

const placedStyle = (rect: Rect | null): CSSProperties | undefined => (rect === null ? undefined : {
  '--screen-layer-x': `${rect.x}px`,
  '--screen-layer-y': `${rect.y}px`,
  '--screen-layer-w': `${rect.width}px`,
  '--screen-layer-h': `${rect.height}px`,
} as CSSProperties);

export { placedStyle };

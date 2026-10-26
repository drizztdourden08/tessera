/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';

const swatchStyle = (color: string, transparent: boolean, translucent: boolean): CSSProperties | undefined => {
  if (transparent) return undefined;
  return translucent ? ({ '--swatch-tint': color } as CSSProperties) : { background: color };
};

export { swatchStyle };

/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { CellBox } from '../../cell-geometry';
import { SPAN_TOKEN_PREFIX } from '../SpanBar.constants';

const tintValue = (tint: string): string => (tint.startsWith(SPAN_TOKEN_PREFIX) ? `var(${tint})` : tint);

const spanPlacement = (box: CellBox, tint: string | undefined): CSSProperties => {
  const placed = { '--span-left': `${box.left}px`, '--span-width': `${box.width}px` } as CSSProperties;
  return tint === undefined ? placed : { ...placed, '--span-tint': tintValue(tint) } as CSSProperties;
};

export { spanPlacement };

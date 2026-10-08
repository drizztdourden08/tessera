/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';

const templateFor = (columns: number | undefined, minColWidth: number | undefined): CSSProperties | undefined => {
  if (minColWidth) return { gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minColWidth}px), 1fr))` };
  if (columns) return { gridTemplateColumns: `repeat(${columns}, 1fr)` };
  return undefined;
};

export { templateFor };

/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';

const columnVars = (columns: number | undefined): CSSProperties | undefined =>
  columns === undefined ? undefined : ({ '--number-input-columns': String(columns) } as CSSProperties);

export { columnVars };

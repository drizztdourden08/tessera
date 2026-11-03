/* @layer renderer-components @kind logic */
import { COUNT_PROPERTY, GUTTER_PROPERTY, TOTAL_PROPERTY } from '../VirtualList.constants';
import type { CSSProperties } from 'react';

const listBodyStyle = (count: number, gutter: number, total?: number): CSSProperties =>
  ({
    [COUNT_PROPERTY]: count,
    [GUTTER_PROPERTY]: `${Math.max(0, gutter)}px`,
    [TOTAL_PROPERTY]: total === undefined ? undefined : `${total}px`,
  }) as CSSProperties;

export { listBodyStyle };

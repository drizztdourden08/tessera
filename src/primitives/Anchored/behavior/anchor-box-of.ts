/* @layer renderer-components @kind util */
import type { RefObject } from 'react';
import type { AnchoredRectSource } from '../Anchored.type';
import { boxOf } from './box-of';
import type { FitBox } from './fit-in-view.type';
import { rectOf } from './rect-of';

const anchorBoxOf = (source: AnchoredRectSource | undefined, anchor: RefObject<HTMLElement | null>): FitBox | null => {
  if (source !== undefined) {
    const rect = rectOf(source);
    return rect === null ? null : boxOf(rect);
  }
  return anchor.current?.getBoundingClientRect() ?? null;
};

export { anchorBoxOf };

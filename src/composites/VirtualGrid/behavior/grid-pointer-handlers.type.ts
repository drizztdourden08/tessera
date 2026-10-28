/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ReorderDrag } from '../../reorder';
import type { GridTarget } from './grid-point-at.type';

interface GridPointerInput {
  raw: ReturnType<ReorderDrag['handlers']>;
  start: { x: number; y: number } | null;
  setStart: (point: { x: number; y: number } | null) => void;
  setTarget: (target: GridTarget | null) => void;
  landing: RefObject<GridTarget | null>;
  swallow: RefObject<boolean>;
}

export type { GridPointerInput };

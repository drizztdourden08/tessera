/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { GridHeights, GridLayout } from './grid-layout.type';

interface GridRectsInput<T> {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  tileWidth: RefObject<number>;
  layout: GridLayout;
  heights: GridHeights;
  flat: readonly T[];
  getKey: (item: T, index: number) => string;
  skip?: ReadonlySet<string>;
}

export type { GridRectsInput };

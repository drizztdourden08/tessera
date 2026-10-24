/* @layer renderer-components @kind types */
import type { SectionShape } from './grid-layout.type';

interface GridSections<T> {
  flat: readonly T[];
  shapes: readonly SectionShape[];
  keys: readonly string[];
}

export type { GridSections };

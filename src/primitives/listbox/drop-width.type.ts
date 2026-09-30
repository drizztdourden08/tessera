/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { DropPlacement } from './drop-placement.type';

interface UseDropWidthParams {
  open: boolean;
  dropRef: RefObject<HTMLDivElement | null>;
  placement: DropPlacement | null;
  contentKey: unknown;
}

export type { UseDropWidthParams };

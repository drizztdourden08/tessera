/* @layer renderer-components @kind types */
import type { HeaderDragState } from './useHeaderDrag.type';

interface HeaderCellClassInput extends HeaderDragState {
  menuOpen: boolean;
  sorted: boolean;
}

export type { HeaderCellClassInput };

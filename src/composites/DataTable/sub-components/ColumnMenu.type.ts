/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ColumnMenuInput } from '../behavior/column-menu-items.type';

interface ColumnMenuProps extends Omit<ColumnMenuInput, 'strings'> {
  anchorRef: RefObject<HTMLElement | null>;
}

export type { ColumnMenuProps };

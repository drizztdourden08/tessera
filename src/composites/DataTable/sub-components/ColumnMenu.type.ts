/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ColumnMenuInput } from '../behavior/column-menu-items.type';

interface ColumnMenuProps extends ColumnMenuInput {
  anchorRef: RefObject<HTMLElement | null>;
}

export type { ColumnMenuProps };

/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent } from 'react';

interface ItemMenuProps {
  tabIndex?: number;
  onContextMenu?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { ItemMenuProps };

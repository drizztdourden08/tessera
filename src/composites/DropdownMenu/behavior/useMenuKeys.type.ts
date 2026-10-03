/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface UseMenuKeysParams {
  menuRef: RefObject<HTMLElement | null>;
  onBack?: () => void;
  onExit?: () => void;
  onTop?: () => void;
  onType?: () => void;
}

export type { UseMenuKeysParams };

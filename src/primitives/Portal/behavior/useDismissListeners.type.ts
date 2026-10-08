/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { EscapeLevel } from '../../escape-stack/escape-stack.type';

interface UseDismissListenersParams {
  open: boolean;
  onClose: () => void;
  contentRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  escape?: boolean;
  level?: EscapeLevel;
}

export type { UseDismissListenersParams };

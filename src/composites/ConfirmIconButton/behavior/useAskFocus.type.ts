/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface AskFocus {
  holdRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  leave: (ran: boolean) => boolean;
}

export type { AskFocus };

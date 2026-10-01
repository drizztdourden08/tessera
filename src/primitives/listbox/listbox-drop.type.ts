/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { DropPlacement } from './drop-placement.type';

interface UseListboxDropParams {
  disabled: boolean;
  defaultOpen?: boolean;
  inline?: boolean;
  contentKey: unknown;
  focusRef?: RefObject<HTMLElement | null>;
  escape?: boolean;
  onClose?: () => void;
}

interface ListboxDrop<E extends HTMLElement> {
  open: boolean;
  show: () => void;
  close: () => void;
  anchorRef: RefObject<E | null>;
  dropRef: RefObject<HTMLDivElement | null>;
  placement: DropPlacement | null;
  width: number | null;
  fillet: boolean;
  attach: 'up' | 'down';
  inline: boolean;
}

export type { ListboxDrop, UseListboxDropParams };

/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { DropAlign, DropPlacement } from './drop-placement.type';

interface UseListboxDropParams {
  disabled: boolean;
  defaultOpen?: boolean;
  inline?: boolean;
  contentKey: unknown;
  focusRef?: RefObject<HTMLElement | null>;
  escape?: boolean;
  fit?: boolean;
  align?: DropAlign;
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
  end: boolean;
  inline: boolean;
}

export type { ListboxDrop, UseListboxDropParams };

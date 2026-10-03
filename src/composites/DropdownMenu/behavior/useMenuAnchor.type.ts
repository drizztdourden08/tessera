/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { AnchoredPlacement } from '../../../primitives/Anchored';
import type { FloatingPlacement } from '../../../primitives/Floating';
import type { MenuAlign, MenuSide } from '../DropdownMenu.type';

interface UseMenuAnchorParams {
  anchorRef?: RefObject<HTMLElement | null>;
  side?: MenuSide;
  align?: MenuAlign;
  inline: boolean;
  onOutOfView: () => void;
}

interface MenuAnchor {
  anchor: RefObject<HTMLElement | null>;
  placement: AnchoredPlacement;
  fallback: FloatingPlacement | null;
}

export type { MenuAnchor, UseMenuAnchorParams };

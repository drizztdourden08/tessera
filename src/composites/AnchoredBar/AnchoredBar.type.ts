/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { AnchoredRect } from '../../primitives/Anchored';
import type { SpaceToken } from '../../primitives/Flex';

type BarDock = 'top-center' | 'bottom-center' | 'none';

type BarPlacement = 'bottom-center' | 'top-center';

type BarRole = 'dialog' | 'alertdialog' | 'toolbar' | 'status';

interface AnchoredBarProps {
  anchorRect: () => AnchoredRect | null;
  boundary?: RefObject<HTMLElement | null>;
  subscribe?: (notify: () => void) => () => void;
  inline?: boolean;
  placement?: BarPlacement;
  margin?: SpaceToken;
  gap?: SpaceToken;
  dock?: BarDock;
  follow?: boolean;
  role?: BarRole;
  label?: string;
  initialFocus?: string;
  onEscape?: () => void;
  error?: boolean;
  dockedText?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type { AnchoredBarProps, BarDock, BarPlacement, BarRole };

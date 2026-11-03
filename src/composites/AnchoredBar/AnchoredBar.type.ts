/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { AnchoredRect } from '../../primitives/Anchored';
import type { SpaceToken } from '../../primitives/Flex';

type BarDock = 'top-center' | 'bottom-center' | 'none';

type BarPlacement = 'bottom-center' | 'top-center' | 'auto';

type BarBoundary = RefObject<HTMLElement | null> | HTMLElement | string;

type BarRole = 'dialog' | 'alertdialog' | 'toolbar' | 'status';

interface AnchoredBarProps {
  anchorRect: () => AnchoredRect | null;
  boundary?: BarBoundary;
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

export type { AnchoredBarProps, BarBoundary, BarDock, BarPlacement, BarRole };

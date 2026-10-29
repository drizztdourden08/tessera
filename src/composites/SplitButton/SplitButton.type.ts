/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { ButtonSize, ButtonVariant } from '../../primitives/Button/Button.type';
import type { MenuNode } from '../DropdownMenu';

interface SplitButtonProps {
  label: string;
  items?: readonly MenuNode[];
  panel?: (close: () => void) => ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pressed?: boolean;
  disabled?: boolean;
  menuLabel?: string;
  className?: string;
}

interface SplitButtonPanelProps {
  id: string;
  anchorRef: RefObject<HTMLElement | null>;
  label: string;
  render: (close: () => void) => ReactNode;
  onClose: () => void;
}

interface SplitButtonPopupProps {
  id: string;
  anchorRef: RefObject<HTMLElement | null>;
  label: string;
  items?: readonly MenuNode[];
  panel?: (close: () => void) => ReactNode;
  onClose: () => void;
}

export type { SplitButtonPanelProps, SplitButtonPopupProps, SplitButtonProps };

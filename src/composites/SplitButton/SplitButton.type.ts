/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { ButtonSize, ButtonVariant } from '../../primitives/Button/Button.type';
import type { ShortcutSpec } from '../../primitives/Shortcut';
import type { MenuNode } from '../DropdownMenu';

interface SplitButtonProps {
  label: string;
  items?: readonly MenuNode[];
  panel?: (close: () => void) => ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  iconOnly?: boolean;
  shortcut?: ShortcutSpec;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pressed?: boolean;
  disabled?: boolean;
  menuLabel?: string;
  className?: string;
}

interface SplitButtonMainProps {
  label: string;
  icon?: ReactNode;
  iconOnly?: boolean;
  shortcut?: ShortcutSpec;
  variant: ButtonVariant;
  size: ButtonSize;
  pressed?: boolean;
  disabled?: boolean;
  onClick: () => void;
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

export type { SplitButtonMainProps, SplitButtonPanelProps, SplitButtonPopupProps, SplitButtonProps };

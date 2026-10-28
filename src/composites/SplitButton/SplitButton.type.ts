/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ButtonSize, ButtonVariant } from '../../primitives/Button/Button.type';
import type { MenuNode } from '../DropdownMenu';

interface SplitButtonProps {
  label: string;
  items: readonly MenuNode[];
  onClick: () => void;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pressed?: boolean;
  disabled?: boolean;
  menuLabel?: string;
  className?: string;
}

export type { SplitButtonProps };

/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import type { HintTargetProps } from '../hint/hint.type';
import type { TooltipPlacement } from '../Tooltip/Tooltip.type';

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost' | 'quiet' | 'bare';

type IconButtonTone = 'danger' | 'info' | 'accent';

type IconButtonSize = '2xs' | 'xs' | 'sm' | 'md';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, HintTargetProps {
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  size?: IconButtonSize;
  active?: boolean;
  mixed?: boolean;
  loading?: boolean;
  label: string;
  tooltip?: ReactNode;
  tooltipPlacement?: TooltipPlacement;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export type {
  IconButtonSize,
  IconButtonTone,
  IconButtonVariant,
  IconButtonProps,
};

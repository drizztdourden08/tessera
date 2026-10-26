/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { HintTargetProps } from '../hint/hint.type';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

type ButtonLook = 'flat' | 'pixel';

type ButtonFill = 'tonal' | 'solid';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, HintTargetProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  look?: ButtonLook;
  fill?: ButtonFill;
  fullWidth?: boolean;
  active?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconEnd?: ReactNode;
  caption?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export type {
  ButtonVariant,
  ButtonSize,
  ButtonLook,
  ButtonFill,
  ButtonProps,
};

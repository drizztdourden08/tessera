/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { HintTargetProps } from '../hint/hint.type';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

type ButtonSize = 'xs' | 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, HintTargetProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  active?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconEnd?: ReactNode;
}

export type {
  ButtonVariant,
  ButtonSize,
  ButtonProps,
};

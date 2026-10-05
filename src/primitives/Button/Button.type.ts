/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

type ButtonSize = 'xs' | 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  active?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export type {
  ButtonVariant,
  ButtonSize,
  ButtonProps,
};

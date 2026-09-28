/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: 'sm' | 'md';
  active?: boolean;
  label: string;
  children: ReactNode;
}

export type {
  IconButtonVariant,
  IconButtonProps,
};

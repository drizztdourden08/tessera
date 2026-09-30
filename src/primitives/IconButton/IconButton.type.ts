/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

type IconButtonTone = 'danger';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  size?: 'sm' | 'md';
  active?: boolean;
  label: string;
  children: ReactNode;
}

export type {
  IconButtonTone,
  IconButtonVariant,
  IconButtonProps,
};

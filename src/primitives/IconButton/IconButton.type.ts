/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { Hint, HintReport } from '../hint/hint.type';

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

type IconButtonTone = 'danger';

type IconButtonSize = 'xs' | 'sm' | 'md';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  size?: IconButtonSize;
  active?: boolean;
  loading?: boolean;
  label: string;
  hint?: Hint;
  onHint?: HintReport;
  children: ReactNode;
}

export type {
  IconButtonSize,
  IconButtonTone,
  IconButtonVariant,
  IconButtonProps,
};

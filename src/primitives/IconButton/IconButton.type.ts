/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import type { HintTargetProps } from '../hint/hint.type';

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

type IconButtonTone = 'danger';

type IconButtonSize = 'xs' | 'sm' | 'md';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, HintTargetProps {
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  size?: IconButtonSize;
  active?: boolean;
  loading?: boolean;
  label: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export type {
  IconButtonSize,
  IconButtonTone,
  IconButtonVariant,
  IconButtonProps,
};

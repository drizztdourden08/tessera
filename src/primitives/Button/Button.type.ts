/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { HintTargetProps } from '../hint/hint.type';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'info' | 'success' | 'ghost';

type ButtonSize = 'xs' | 'sm' | 'md';

type ButtonLook = 'flat' | 'pixel';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, HintTargetProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  look?: ButtonLook;
  fullWidth?: boolean;
  active?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconEnd?: ReactNode;
}

export type {
  ButtonVariant,
  ButtonSize,
  ButtonLook,
  ButtonProps,
};

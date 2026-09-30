/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}

export type {
  BadgeVariant,
  BadgeProps,
};

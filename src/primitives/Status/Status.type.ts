/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary';

type StatusVariant = 'text' | 'pill';

interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  variant?: StatusVariant;
  dot?: boolean;
  pulse?: boolean;
  children: ReactNode;
}

export type { StatusProps, StatusTone, StatusVariant };

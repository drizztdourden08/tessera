/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type CalloutTone = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';

type CalloutVariant = 'box' | 'footnote';

interface CalloutProps {
  tone?: CalloutTone;
  variant?: CalloutVariant;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export type { CalloutProps, CalloutTone, CalloutVariant };

/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ReasonTipProps {
  reason: string | undefined;
  stop?: boolean;
  children: ReactNode;
}

export type { ReasonTipProps };

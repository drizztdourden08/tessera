/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface StatRowProps {
  label: ReactNode;
  value: ReactNode;
  mono?: boolean;
  copyable?: boolean | string;
  className?: string;
}

export type { StatRowProps };

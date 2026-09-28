/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface StatRowProps {
  label: ReactNode;
  value: ReactNode;
  mono?: boolean;
  className?: string;
}

export type { StatRowProps };

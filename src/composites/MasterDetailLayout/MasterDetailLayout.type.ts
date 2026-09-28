/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface MasterDetailLayoutProps {
  list: ReactNode;
  detail: ReactNode;
  detailEmpty?: boolean;
  className?: string;
}

export type { MasterDetailLayoutProps };

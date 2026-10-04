/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface MasterDetailLayoutProps {
  list: ReactNode;
  detail: ReactNode;
  detailEmpty?: boolean;
  onBack?: () => void;
  backLabel?: string;
  resizable?: boolean;
  listWidth?: number;
  minListWidth?: number;
  maxListWidth?: number;
  storageKey?: string;
  listLabel?: string;
  detailLabel?: string;
  className?: string;
}

export type { MasterDetailLayoutProps };

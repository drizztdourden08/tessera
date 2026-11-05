/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type RecordCardDensity = 'row' | 'card';

interface RecordCardProps {
  title: ReactNode;
  icon?: ReactNode;
  code?: ReactNode;
  content?: ReactNode;
  menu?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  density?: RecordCardDensity;
  className?: string;
  'aria-label'?: string;
}

export type { RecordCardDensity, RecordCardProps };

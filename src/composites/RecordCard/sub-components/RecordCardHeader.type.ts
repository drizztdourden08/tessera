/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface RecordCardHeaderProps {
  title: ReactNode;
  icon?: ReactNode;
  code?: ReactNode;
  content?: ReactNode;
  menu?: ReactNode;
  expandable: boolean;
  expanded: boolean;
  bodyId: string;
  onToggle: () => void;
}

export type { RecordCardHeaderProps };

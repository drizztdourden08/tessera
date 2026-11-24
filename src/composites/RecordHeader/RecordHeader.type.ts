/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type RecordHeaderDensity = 'row' | 'card';

interface RecordHeaderChevron {
  expanded: boolean;
  onToggle: () => void;
  controls?: string;
  label?: string;
}

interface RecordHeaderProps {
  title?: ReactNode;
  icon?: ReactNode;
  code?: ReactNode;
  content?: ReactNode;
  menu?: ReactNode;
  chevron?: RecordHeaderChevron;
  chevronOnIcon?: boolean;
  menuOnHover?: boolean;
  density?: RecordHeaderDensity;
  className?: string;
}

export type { RecordHeaderChevron, RecordHeaderDensity, RecordHeaderProps };

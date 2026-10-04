/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ContentHeaderLevel = 1 | 2 | 3 | 4;

interface ContentHeaderBack {
  label: string;
  onSelect: () => void;
}

interface ContentHeaderProps {
  title: ReactNode;
  icon?: ReactNode;
  back?: ContentHeaderBack;
  backdrop?: ReactNode;
  strip?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  level?: ContentHeaderLevel;
  titleId?: string;
  live?: boolean;
  className?: string;
}

export type { ContentHeaderBack, ContentHeaderLevel, ContentHeaderProps };

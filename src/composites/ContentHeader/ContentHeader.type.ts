/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ContentHeaderLevel = 1 | 2 | 3 | 4;

interface ContentHeaderProps {
  title: ReactNode;
  icon?: ReactNode;
  backdrop?: ReactNode;
  strip?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  level?: ContentHeaderLevel;
  titleId?: string;
  live?: boolean;
  className?: string;
}

export type { ContentHeaderLevel, ContentHeaderProps };

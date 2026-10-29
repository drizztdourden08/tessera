/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../primitives/action-data';

type ContentHeaderLevel = 1 | 2 | 3 | 4;

type ContentHeaderVariant = 'panel' | 'plain';

interface ContentHeaderProps {
  title: ReactNode;
  icon?: ReactNode;
  back?: BackAction;
  backdrop?: ReactNode;
  strip?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  variant?: ContentHeaderVariant;
  level?: ContentHeaderLevel;
  titleId?: string;
  live?: boolean;
  className?: string;
}

export type { ContentHeaderLevel, ContentHeaderProps, ContentHeaderVariant };

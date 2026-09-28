/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { LogPanelProps } from '../LogPanel.type';

interface LogToolbarProps extends Pick<LogPanelProps, 'kinds' | 'hidden' | 'onToggleKind' | 'search' | 'onSearchChange' | 'copyText'> {
  shown: number;
  total: number;
  countLabel: string;
  extra?: ReactNode;
}

export type { LogToolbarProps };

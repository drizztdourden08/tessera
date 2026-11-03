/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { LogPanelSize, LogRow } from '../LogPanel.type';
import type { LogFilter } from '../behavior/useLogFilter.type';

interface LogToolbarProps {
  filter: LogFilter;
  side: boolean;
  size?: LogPanelSize;
  total: number;
  countLabel: string;
  copyText: (shown: readonly LogRow[]) => string;
  extra?: ReactNode;
}

export type { LogToolbarProps };

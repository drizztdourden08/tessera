/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { LogPanelProps } from '../LogPanel.type';

interface LogFilterSlotProps {
  props: LogPanelProps;
  children: ReactNode;
}

export type { LogFilterSlotProps };

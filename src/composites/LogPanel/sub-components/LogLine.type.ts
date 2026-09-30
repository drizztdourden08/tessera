/* @layer renderer-components @kind types */
import type { LogKindDef, LogRow } from '../LogPanel.type';

interface LogLineProps {
  row: LogRow;
  kind?: LogKindDef;
}

export type { LogLineProps };

/* @layer renderer-components @kind types */
import type { LogKindDef, LogRow } from '../LogPanel.type';
import type { LogSelection } from '../behavior/log-selection.type';

interface LogLineProps {
  row: LogRow;
  kind?: LogKindDef;
  selection?: LogSelection | null;
}

export type { LogLineProps };

/* @layer renderer-components @kind types */
import type { LogKindDef, LogRow } from '../LogPanel.type';

interface LogListProps {
  rows: readonly LogRow[];
  kinds?: readonly LogKindDef[];
}

export type { LogListProps };

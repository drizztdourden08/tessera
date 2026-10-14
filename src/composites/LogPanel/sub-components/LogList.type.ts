/* @layer renderer-components @kind types */
import type { LogKindDef, LogRow } from '../LogPanel.type';

interface LogListProps {
  rows: readonly LogRow[];
  kinds?: readonly LogKindDef[];
  selectedIds?: ReadonlySet<string>;
  onSelectionChange?: (ids: ReadonlySet<string>) => void;
}

export type { LogListProps };

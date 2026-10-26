/* @layer renderer-components @kind types */
import type { LogKindDef, LogOrder, LogRow } from '../LogPanel.type';

interface LogListProps {
  rows: readonly LogRow[];
  kinds?: readonly LogKindDef[];
  selectedIds?: ReadonlySet<string>;
  onSelectionChange?: (ids: ReadonlySet<string>) => void;
  ansi?: boolean;
  follow?: boolean;
  order?: LogOrder;
  terminal?: boolean;
}

export type { LogListProps };

/* @layer renderer-components @kind types */
import type { GroupedRow } from '../../../data/table/types';

interface UseRowSelectionInput<T> {
  nodes: readonly GroupedRow<T>[];
  isExpanded: (uid: string) => boolean;
  getRowId: (row: T) => string;
  selectable: boolean;
  selectedIds?: ReadonlySet<string>;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onSelectionChange?: (ids: ReadonlySet<string>) => void;
}

export type { UseRowSelectionInput };

/* @layer renderer-components @kind types */
import type { SchemaIndex } from '../../../data/schema/build-schema';
import type { TableColumn } from '../../../data/table/types';
import type { IdRefDefaultResolver, IdRefDisplayResolver, IdRefHrefResolver } from './display-substitution.type';
import type { ExpandedGroups } from './useExpandedGroups.type';
import type { ColumnDragBinding, RowSelectionBinding } from '../DataTable.type';

interface UseRowContextInput<T> {
  columns: readonly TableColumn[];
  schema: SchemaIndex;
  drag: ColumnDragBinding;
  getRowId: (row: T) => string;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  selection: RowSelectionBinding | null;
  groups: ExpandedGroups;
  resolveIdRefDisplay?: IdRefDisplayResolver;
  resolveIdRefDefault?: IdRefDefaultResolver;
  resolveIdRefHref?: IdRefHrefResolver;
}

export type { UseRowContextInput };

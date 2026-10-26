/* @layer renderer-components @kind types */
import type { RowSelectionBinding } from '../DataTable.type';

interface HeaderLeadProps {
  reorderable: boolean;
  selection: RowSelectionBinding | null;
}

export type { HeaderLeadProps };

/* @layer renderer-components @kind types */
import type { PickerNode } from '../behavior/field-picker-nodes.type';
import type { SortGroupSummary } from '../behavior/sort-group-summary.type';
import type { TableActions } from '../DataTable.type';

interface TableFooterProps {
  count: number;
  countLabel?: readonly [one: string, many: string];
  sortActive: boolean;
  groupActive: boolean;
  fieldNodes?: readonly PickerNode[];
  actions: TableActions;
  summary: SortGroupSummary;
}

export type { TableFooterProps };

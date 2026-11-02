/* @layer stories @kind types */
type GroupChoice = 'none' | 'game' | 'status';

type DataTableArgs = {
  selectable: boolean;
  groupBy: GroupChoice;
  persistLayout: boolean;
  emptyMessage: string;
};

export type { DataTableArgs, GroupChoice };

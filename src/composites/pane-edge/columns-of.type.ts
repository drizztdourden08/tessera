/* @layer renderer-components @kind types */
type FoldedPane = 'start' | 'end' | null;

interface ColumnsInput {
  size: number;
  shares: boolean;
  folded: FoldedPane;
}

export type { ColumnsInput, FoldedPane };

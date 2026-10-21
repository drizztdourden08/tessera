/* @layer renderer-components @kind types */
type FoldedPane = 'start' | 'end' | null;

interface ColumnsInput {
  size: number;
  shares: boolean;
  folded: FoldedPane;
  foldedSize?: string;
  edgeSize?: string;
}

export type { ColumnsInput, FoldedPane };

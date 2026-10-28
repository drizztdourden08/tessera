/* @layer renderer-components @kind types */
interface GridMarkInput {
  item: number;
  gap: number;
  section?: string;
  total: number;
  owners: readonly string[];
}

export type { GridMarkInput };

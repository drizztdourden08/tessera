/* @layer renderer-components @kind types */
interface ColumnDropTrashProps {
  draggingPath: string | null;
  label: string;
  onRemove: (path: string) => void;
  onDragEnd: () => void;
}

export type { ColumnDropTrashProps };

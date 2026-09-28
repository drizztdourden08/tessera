/* @layer renderer-components @kind types */
interface UseColumnRenameInput {
  path: string;
  label?: string;
  onRename: (path: string, label: string) => void;
}

export type { UseColumnRenameInput };

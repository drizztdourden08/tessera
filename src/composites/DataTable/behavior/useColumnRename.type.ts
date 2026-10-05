/* @layer renderer-components @kind types */
interface UseColumnRenameInput {
  path: string;
  onRename: (path: string, label: string) => void;
}

export type { UseColumnRenameInput };

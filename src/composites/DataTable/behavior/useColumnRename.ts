/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { UseColumnRenameInput } from './useColumnRename.type';

const useColumnRename = ({ path, onRename }: UseColumnRenameInput) => {
  const [renaming, setRenaming] = useState(false);

  const keepRename = (label: string): void => {
    onRename(path, label);
    setRenaming(false);
  };

  const undoRename = (): void => setRenaming(false);

  const startRename = (): void => setRenaming(true);

  return { renaming, keepRename, undoRename, startRename };
};

export { useColumnRename };

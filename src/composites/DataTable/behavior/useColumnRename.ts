/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { UseColumnRenameInput } from './useColumnRename.type';

const useColumnRename = ({ path, label, onRename }: UseColumnRenameInput) => {
  const [draft, setDraft] = useState<string | null>(null);

  const commitRename = (): void => {
    if (draft !== null) onRename(path, draft.trim());
    setDraft(null);
  };

  const handleRenameKey = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') commitRename();
    if (event.key === 'Escape') setDraft(null);
  };

  const startRename = (): void => setDraft(label ?? '');

  return { draft, setDraft, commitRename, handleRenameKey, startRename };
};

export { useColumnRename };

/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

interface NameEditOptions {
  name: string;
  onKeep: (name: string) => void;
  onUndo?: () => void;
  allowEmpty?: boolean;
  canKeep?: boolean;
}

interface NameEdit {
  draft: string;
  setDraft: (draft: string) => void;
  ready: boolean;
  keep: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onBlur: () => void;
}

type NameEditAction = 'keep' | 'undo';

export type { NameEdit, NameEditAction, NameEditOptions };

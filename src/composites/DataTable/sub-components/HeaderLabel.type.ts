/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

interface HeaderLabelProps {
  label: string;
  draft: string | null;
  onDraft: (draft: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onCommit: () => void;
}

export type { HeaderLabelProps };

/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';

interface CommandPaletteInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  listId: string;
  activeId?: string;
  count: number;
}

export type { CommandPaletteInputProps };

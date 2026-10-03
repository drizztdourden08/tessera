/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface MenuFilterProps {
  inputRef: RefObject<HTMLInputElement | null>;
  menuRef: RefObject<HTMLElement | null>;
  menuId: string;
  value: string;
  placeholder?: string;
  autoFocus: boolean;
  empty: boolean;
  onChange: (value: string) => void;
  onExit: () => void;
}

export type { MenuFilterProps };

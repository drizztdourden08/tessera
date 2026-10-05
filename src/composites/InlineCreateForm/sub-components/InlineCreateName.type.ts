/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

interface InlineCreateNameProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  placeholder?: string;
  label?: string;
  errorId?: string;
}

export type { InlineCreateNameProps };

/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface ChoiceMenuProps {
  options: readonly string[];
  value: unknown;
  anchorRef: RefObject<HTMLElement | null>;
  onChange: (next: readonly string[]) => void;
  onClose: () => void;
}

export type { ChoiceMenuProps };

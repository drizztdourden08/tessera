/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ArrayEditorShellProps {
  isEmpty: boolean;
  disabled: boolean;
  onAdd: () => void;
  children: ReactNode;
}

export type { ArrayEditorShellProps };

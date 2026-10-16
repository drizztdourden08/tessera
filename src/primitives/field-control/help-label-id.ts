/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';

const missing = (value: ReactNode): boolean => value == null || value === '';

const helpLabelId = (help: ReactNode, label: ReactNode, id: string, ariaLabel?: string): string | undefined =>
  (missing(help) || missing(label) || ariaLabel !== undefined ? undefined : id);

export { helpLabelId };

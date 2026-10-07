/* @layer stories @kind types */
import type { ReactNode } from 'react';

interface NamedRow {
  id: string;
  label: string;
  description?: string;
  control: (labelId: string) => ReactNode;
}

interface NamedByRowProps {
  rows: readonly NamedRow[];
}

export type { NamedByRowProps };

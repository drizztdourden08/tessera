/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface TermListItem {
  term: string;
  detail: ReactNode;
}

interface TermListProps {
  items: readonly TermListItem[];
  className?: string;
}

export type { TermListItem, TermListProps };

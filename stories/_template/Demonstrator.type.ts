/* @layer stories @kind types */
import type { ReactNode } from 'react';

type DemonstratorAlign = 'start' | 'center' | 'stretch';

type DemonstratorValign = 'start' | 'center' | 'end';

interface DemonstratorAxis<K extends string> {
  key: K;
  label: string;
  fill?: boolean;
}

interface DemonstratorProps<R extends string, C extends string> {
  rows?: readonly DemonstratorAxis<R>[];
  columns?: readonly DemonstratorAxis<C>[];
  cell: (row: R, column: C) => ReactNode;
  corner?: string;
  align?: DemonstratorAlign;
  valign?: DemonstratorValign;
  fill?: boolean;
  className?: string;
}

interface DemonstratorBody {
  labelled: boolean;
  columns: readonly DemonstratorAxis<string>[];
  draw: (row: string, column: string) => ReactNode;
}

export type { DemonstratorAxis, DemonstratorBody, DemonstratorProps };

/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';

interface GridHeaderProps {
  stop: number;
  label: ReactNode;
  count: number;
  columns: number;
  collapsed: boolean;
  tabbable: boolean;
  onToggle: (collapsed: boolean) => void;
  onActivate: (index: number) => void;
  onNavigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
}

export type { GridHeaderProps };

/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';
import type { ActionItem } from '../../ActionBar';
import type { GridHeaderDrop } from '../behavior/useGridDropData.type';

interface GridHeaderProps {
  stop: number;
  label: ReactNode;
  count: number;
  columns: number;
  collapsed: boolean;
  tabbable: boolean;
  depth?: number;
  into?: boolean;
  actions?: readonly ActionItem[];
  drop?: GridHeaderDrop;
  onToggle: (collapsed: boolean) => void;
  onActivate: (index: number) => void;
  onNavigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
}

export type { GridHeaderProps };

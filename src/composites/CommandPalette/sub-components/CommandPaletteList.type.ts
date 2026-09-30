/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { CommandPaletteGroup, CommandPaletteItem } from '../CommandPalette.type';

interface CommandPaletteListProps<T extends CommandPaletteItem> {
  listId: string;
  listRef: RefObject<HTMLDivElement | null>;
  groups: readonly CommandPaletteGroup<T>[];
  active: number;
  onActive: (index: number) => void;
  onSelect: (item: T) => void;
  label: string;
  empty: ReactNode;
}

export type { CommandPaletteListProps };

/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode, RefObject } from 'react';

interface CommandPaletteToggle {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: ReactNode;
  breadcrumb?: readonly string[];
  disabled?: boolean;
  checked?: boolean;
  toggle?: CommandPaletteToggle;
}

interface CommandPaletteGroup<T extends CommandPaletteItem = CommandPaletteItem> {
  id: string;
  label?: ReactNode;
  items: readonly T[];
}

interface CommandPaletteProps<T extends CommandPaletteItem = CommandPaletteItem> {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (query: string) => void;
  groups: readonly CommandPaletteGroup<T>[];
  onSelect: (item: T) => void;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  placeholder?: string;
  emptyText?: ReactNode;
  label?: string;
  className?: string;
}

interface CommandPaletteModel<T extends CommandPaletteItem> {
  items: readonly T[];
  active: number;
  setActive: (index: number) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export type { CommandPaletteGroup, CommandPaletteItem, CommandPaletteModel, CommandPaletteProps, CommandPaletteToggle };

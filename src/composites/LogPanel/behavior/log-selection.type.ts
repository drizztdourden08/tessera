/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent, RefObject } from 'react';

interface LogClickKeys {
  shift: boolean;
  toggle: boolean;
}

interface LogClick {
  order: readonly string[];
  selected: ReadonlySet<string>;
  anchor: string | null;
  id: string;
  keys: LogClickKeys;
}

interface LogSelectionMove {
  ids: ReadonlySet<string>;
  cursor: string;
  anchor: string;
}

interface LogStep {
  order: readonly string[];
  mounted: readonly string[];
  cursor: string | null;
  anchor: string | null;
  by: 1 | -1;
  extend: boolean;
}

interface LogSelectionInput {
  order: readonly string[];
  mounted: readonly string[];
  selectedIds: ReadonlySet<string> | undefined;
  onSelectionChange: ((ids: ReadonlySet<string>) => void) | undefined;
}

interface LogSelection {
  listRef: RefObject<HTMLDivElement | null>;
  isSelected: (id: string) => boolean;
  tabStop: string | undefined;
  onRowClick: (id: string, event: MouseEvent<HTMLElement>) => void;
  onRowMouseDown: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { LogClick, LogSelection, LogSelectionInput, LogSelectionMove, LogStep };

/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

type SelectAllState = 'none' | 'some' | 'all';

type SelectionAction = 'all' | 'toggle' | 'range' | 'clear' | 'type';

interface SelectionCell {
  row: number;
  column: number;
}

interface SelectionClick {
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

interface SelectionKeyEvent {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
}

interface TypeAheadInput {
  count: number;
  from: number;
  text: string;
  labelAt: (index: number) => string;
}

interface SelectionModelInput {
  order: readonly string[];
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
  onPick?: (key: string) => void;
  seed?: string | null;
  cellOf?: (key: string) => SelectionCell | undefined;
  isHole?: (key: string) => boolean;
  labelOf?: (key: string) => string;
  onFocusKey?: (key: string) => void;
}

interface SelectionModel {
  allState: SelectAllState;
  isSelected: (key: string) => boolean;
  click: (key: string, event: SelectionClick) => void;
  toggle: (key: string) => void;
  extend: (key: string, keep: boolean) => void;
  step: (from: string, to: string, keep: boolean) => void;
  checkAll: () => void;
  selectAll: () => void;
  clear: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>, key: string) => void;
}

export type {
  SelectAllState, SelectionAction, SelectionCell, SelectionClick, SelectionKeyEvent, SelectionModel, SelectionModelInput, TypeAheadInput,
};

/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { ChoiceCellProps, ChoiceRole } from '../ChoiceGrid.type';
import type { ChoiceEntry, ChoiceGroup } from './choice-layout.type';

interface ChoiceGridInput<T extends string> {
  groups: readonly ChoiceGroup<T>[];
  value: T | null | undefined;
  columns: number | undefined;
  role: ChoiceRole;
  pickOnRelease: boolean;
  onChange: (value: T) => void;
}

interface ChoiceGridControl {
  rootRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  selected: (entry: ChoiceEntry) => boolean;
  cellProps: (entry: ChoiceEntry) => ChoiceCellProps;
}

export type { ChoiceGridControl, ChoiceGridInput };

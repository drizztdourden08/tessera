/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ChoiceCell, ChoiceCellState } from '../ChoiceGrid.type';
import type { ChoiceEntry, ChoiceGroup } from '../behavior/choice-layout.type';

interface ChoiceSectionViewProps<T extends string> {
  group: ChoiceGroup<T>;
  columns: number | undefined;
  state: (entry: ChoiceEntry<T>) => ChoiceCellState;
  renderCell?: (cell: ChoiceCell<T>, state: ChoiceCellState) => ReactNode;
}

export type { ChoiceSectionViewProps };

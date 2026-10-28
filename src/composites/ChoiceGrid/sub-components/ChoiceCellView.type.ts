/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ChoiceCell, ChoiceCellState } from '../ChoiceGrid.type';

interface ChoiceCellViewProps<T extends string> {
  cell: ChoiceCell<T>;
  state: ChoiceCellState;
  renderCell?: (cell: ChoiceCell<T>, state: ChoiceCellState) => ReactNode;
}

export type { ChoiceCellViewProps };

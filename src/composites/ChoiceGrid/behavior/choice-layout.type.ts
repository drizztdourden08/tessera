/* @layer renderer-components @kind types */
import type { ChoiceCell } from '../ChoiceGrid.type';

interface ChoiceEntry<T extends string = string> {
  cell: ChoiceCell<T>;
  index: number;
  position: number;
}

interface ChoiceGroup<T extends string = string> {
  id: string;
  label?: string;
  entries: readonly ChoiceEntry<T>[];
}

export type { ChoiceEntry, ChoiceGroup };

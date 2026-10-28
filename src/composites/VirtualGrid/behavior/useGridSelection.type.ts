/* @layer renderer-components @kind types */
import type { SelectionModel } from '../../selection';
import type { VirtualGridSelection } from '../VirtualGrid.type';
import type { GridLayout } from './grid-layout.type';

interface UseGridSelectionInput<T> {
  flat: readonly T[];
  keys: readonly string[];
  layout: GridLayout;
  selection?: VirtualGridSelection;
  getLabel?: (item: T, index: number) => string;
  holes?: (item: T, index: number) => boolean;
  focusItem: (index: number) => void;
}

interface GridSelection {
  model: SelectionModel;
  indexOfKey: ReadonlyMap<string, number>;
  holeKeys: ReadonlySet<string>;
}

export type { GridSelection, UseGridSelectionInput };

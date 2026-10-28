/* @layer renderer-components @kind types */
import type { ChoiceRole } from '../ChoiceGrid.type';
import type { ChoiceEntry } from './choice-layout.type';

interface ChoiceCellPropsInput {
  entry: ChoiceEntry;
  role: ChoiceRole;
  selected: boolean;
  stop: boolean;
  pickOnRelease: boolean;
  pick: (index: number) => void;
  focus: (index: number) => void;
}

export type { ChoiceCellPropsInput };

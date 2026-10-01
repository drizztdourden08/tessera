/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent, RefCallback } from 'react';
import type { ListboxModel } from '../../../primitives/listbox/listbox-state.type';
import type { ListboxView } from '../../../primitives/listbox/listbox-view.type';
import type { PatternChoice } from '../PatternInput.type';
import type { SegmentParams } from './typed-segment.type';

interface ChoiceKeyContext extends SegmentParams {
  model: ListboxModel<PatternChoice>;
  open: boolean;
  pick: (choice: string) => void;
  typed: (key: string, time: number) => string | null;
}

interface ChoiceSegmentState {
  options: readonly PatternChoice[];
  selected: PatternChoice | undefined;
  open: boolean;
  model: ListboxModel<PatternChoice>;
  view: ListboxView<PatternChoice>;
  attach: RefCallback<HTMLButtonElement>;
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  handleMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  handleClick: () => void;
}

export type { ChoiceKeyContext, ChoiceSegmentState };

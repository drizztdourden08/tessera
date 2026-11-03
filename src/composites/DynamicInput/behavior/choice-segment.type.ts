/* @layer renderer-components @kind types */
import type { ClipboardEvent, KeyboardEvent, MouseEvent, RefCallback, RefObject } from 'react';
import type { ListboxModel } from '../../../primitives/listbox/listbox-state.type';
import type { ListboxView } from '../../../primitives/listbox/listbox-view.type';
import type { PatternChoice } from '../DynamicInput.type';
import type { PatternField } from './pattern-field.type';
import type { SegmentParams } from './typed-segment.type';

interface ChoiceNavContext {
  field: PatternField;
  model: ListboxModel<PatternChoice>;
  open: boolean;
}

interface ChoiceKeyContext extends SegmentParams, ChoiceNavContext {
  pick: (choice: string) => void;
  typed: (key: string, time: number) => string | null;
}

interface ChoicePress {
  field: PatternField;
  index: number;
  open: boolean;
}

interface ChoiceSearch {
  query: string;
  pickFirst: boolean;
  pick: (choice: string) => void;
}

interface ChoiceModel {
  model: ListboxModel<PatternChoice>;
  open: boolean;
  view: ListboxView<PatternChoice>;
}

interface ChoiceSegmentState {
  selected: PatternChoice | undefined;
  open: boolean;
  model: ListboxModel<PatternChoice>;
  view: ListboxView<PatternChoice>;
  anchorRef: RefObject<HTMLElement | null>;
  attach: RefCallback<HTMLButtonElement>;
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  handlePaste: (event: ClipboardEvent<HTMLButtonElement>) => void;
  handleMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export type { ChoiceKeyContext, ChoiceModel, ChoiceNavContext, ChoicePress, ChoiceSearch, ChoiceSegmentState };

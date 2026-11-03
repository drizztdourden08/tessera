/* @layer renderer-components @kind types */
import type { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent, RefCallback, RefObject } from 'react';
import type { ListboxModel } from '../../../primitives/listbox/listbox-state.type';
import type { ListboxView } from '../../../primitives/listbox/listbox-view.type';
import type { PatternChoice, PatternSlotValue } from '../DynamicInput.type';
import type { ChoiceNavContext } from './choice-segment.type';
import type { CaretPlace } from './pattern-field.type';
import type { SegmentParams } from './typed-segment.type';

interface SearchEdit {
  text: string;
  typed: boolean;
}

interface SearchDraft {
  edit: SearchEdit | null;
  editRef: RefObject<SearchEdit | null>;
  keptRef: RefObject<PatternSlotValue | undefined>;
  writeEdit: (edit: SearchEdit | null, caret?: CaretPlace | null) => void;
  attach: RefCallback<HTMLInputElement>;
}

interface SearchKeyContext extends SegmentParams, ChoiceNavContext {
  typed: boolean;
  pick: (choice: string) => void;
  finish: () => void;
}

interface SearchChoiceState {
  text: string;
  open: boolean;
  model: ListboxModel<PatternChoice>;
  view: ListboxView<PatternChoice>;
  attach: RefCallback<HTMLInputElement>;
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handlePaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  handleMouseDown: (event: MouseEvent<HTMLInputElement>) => void;
}

export type { SearchChoiceState, SearchDraft, SearchEdit, SearchKeyContext };

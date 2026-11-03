/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { useTypeaheadText } from '../../../primitives/listbox/useTypeaheadText';
import { choiceOptions } from './choice-options';
import { handleChoiceKey } from './handle-choice-key';
import { pasteHandler } from './paste-handler';
import { pressChoice } from './press-choice';
import { useChoiceModel } from './useChoiceModel';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { ChoiceSegmentState } from './choice-segment.type';
import type { SegmentParams } from './typed-segment.type';

const noRelease = (): void => undefined;

const useChoiceSegment = (params: SegmentParams): ChoiceSegmentState => {
  const { field, slot, index } = params;
  const typed = useTypeaheadText();
  const anchorRef = useRef<HTMLElement | null>(null);
  const value = field.value[slot.name];
  const options = choiceOptions(slot, field.setup.lists, field.value);

  const pick = (choice: string) => {
    field.setSlot(slot.name, choice);
    if (!field.moveTo(index + 1, 'all')) field.setOpen(false);
  };
  const { model, open, view } = useChoiceModel(params, options, { query: '', pickFirst: true, pick });
  const attach = useCallback((node: HTMLButtonElement | null) => {
    anchorRef.current = node;
    field.register(index)(node);
  }, [field.register, index]);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) =>
    handleChoiceKey({ field, slot, index, model, open, pick, typed }, event);
  const handlePaste = pasteHandler<HTMLButtonElement>(field, { index, release: noRelease });
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => pressChoice({ field, index, open }, event);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) field.setOpen(!open);
  };

  return {
    selected: options.find((option) => option.value === value), open, model, view, anchorRef, attach,
    handleKeyDown, handlePaste, handleMouseDown, handleClick,
  };
};

export { useChoiceSegment };

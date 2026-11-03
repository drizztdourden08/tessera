/* @layer renderer-components @kind hook */
import { useDeferredValue } from 'react';
import { choiceDisplay } from './choice-display';
import { choiceOptions } from './choice-options';
import { pasteHandler } from './paste-handler';
import { searchChoiceKey } from './search-choice-key';
import { settleSearch } from './settle-search';
import { useChoiceModel } from './useChoiceModel';
import { useSearchDraft } from './useSearchDraft';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { SearchChoiceState } from './search-choice.type';
import type { SegmentParams } from './typed-segment.type';

const useSearchChoice = (params: SegmentParams): SearchChoiceState => {
  const { field, slot, index } = params;
  const free = slot.free === true;
  const value = field.value[slot.name];
  const options = choiceOptions(slot, field.setup.lists, field.value);
  const shown = choiceDisplay(slot, value, options);
  const draft = useSearchDraft(params, options);
  const { edit, editRef, keptRef, writeEdit } = draft;
  const query = useDeferredValue(edit?.typed === true ? edit.text : '');

  const settle = () => {
    const typed = editRef.current;
    const settled = typed?.typed === true ? settleSearch(slot, typed.text, options) : undefined;
    if (settled !== undefined) field.setSlot(slot.name, settled);
  };
  const finish = () => {
    settle();
    writeEdit(null, 'all');
    field.setOpen(false);
  };
  const pick = (choice: string) => {
    writeEdit(null);
    field.setSlot(slot.name, choice);
    if (!field.moveTo(index + 1, 'all')) finish();
  };
  const { model, open, view } = useChoiceModel(params, options, { query, pickFirst: !free, pick });

  const handleFocus = () => {
    const asked = field.caretRef.current;
    field.caretRef.current = null;
    writeEdit({ text: shown, typed: false }, asked ?? 'all');
  };
  const handleBlur = () => {
    settle();
    writeEdit(null);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    writeEdit({ text, typed: true });
    if (free) {
      keptRef.current = text === '' ? null : text;
      field.setSlot(slot.name, keptRef.current);
    }
    field.setOpen(true);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) =>
    searchChoiceKey({ field, slot, index, model, open, typed: edit?.typed === true, pick, finish }, event);
  const handleMouseDown = () => {
    if (field.focus.index === index && !open) field.setOpen(true);
  };

  return {
    text: edit?.text ?? shown, open, model, view, attach: draft.attach,
    handleFocus, handleBlur, handleChange, handleKeyDown, handleMouseDown,
    handlePaste: pasteHandler<HTMLInputElement>(field, { index, release: () => writeEdit(null) }),
  };
};

export { useSearchChoice };

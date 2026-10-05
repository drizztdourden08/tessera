/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { nameEditKey } from './name-edit-key';
import type { NameEdit, NameEditOptions } from './name-edit.type';

const useNameEdit = (options: NameEditOptions): NameEdit => {
  const { name, onKeep, onUndo, allowEmpty = false, canKeep = true } = options;
  const [draft, setDraftState] = useState(name);
  const endedByKey = useRef(false);
  const next = draft.trim();
  const ready = canKeep && (allowEmpty || next !== '');
  const setDraft = (value: string) => {
    endedByKey.current = false;
    setDraftState(value);
  };
  const keep = () => {
    if (ready) onKeep(next);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const action = nameEditKey(event.key, event.nativeEvent.isComposing);
    if (action === 'keep' && ready) {
      endedByKey.current = true;
      onKeep(next);
    } else if (action === 'undo' && onUndo) {
      event.stopPropagation();
      endedByKey.current = true;
      onUndo();
    }
  };
  const onBlur = () => {
    if (!endedByKey.current) keep();
  };
  return { draft, setDraft, ready, keep, onKeyDown, onBlur };
};

export { useNameEdit };

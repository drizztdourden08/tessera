/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { applyCaret } from './apply-caret';
import type { ChangeEvent } from 'react';
import type { CaretPlace } from './pattern-field.type';
import type { TypedDraft, TypedParams } from './typed-segment.type';

const useTypedDraft = (params: TypedParams): TypedDraft => {
  const { field, slot, index, kind } = params;
  const value = field.value[slot.name];
  const [draft, setDraft] = useState<string | null>(null);
  const draftRef = useRef<string | null>(null);
  const typedRef = useRef(false);
  const nodeRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<CaretPlace | null>(null);
  const seenRef = useRef(value);

  const writeDraft = useCallback((text: string | null, caret: CaretPlace | null = null) => {
    draftRef.current = text;
    caretRef.current = caret;
    setDraft(text);
  }, []);

  useLayoutEffect(() => {
    if (seenRef.current === value) return;
    seenRef.current = value;
    const typed = draftRef.current;
    if (typed !== null && kind.read(typed, slot) !== value) writeDraft(kind.edit(value, slot));
  }, [value]);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (node === null || caretRef.current === null) return;
    applyCaret(node, caretRef.current);
    caretRef.current = null;
  });

  const attach = useCallback((node: HTMLInputElement | null) => {
    nodeRef.current = node;
    field.register(index)(node);
  }, [field.register, index]);

  const handleFocus = () => {
    const asked = field.caretRef.current;
    field.caretRef.current = null;
    typedRef.current = false;
    writeDraft(kind.edit(value, slot), asked ?? (slot.type === 'text' ? null : 'all'));
  };

  const handleBlur = () => {
    const typed = draftRef.current;
    const settled = typed === null ? undefined : kind.settle(typed, slot);
    if (settled !== undefined) field.setSlot(slot.name, settled);
    writeDraft(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: raw, selectionStart } = event.currentTarget;
    const text = kind.clean(raw, slot);
    typedRef.current = true;
    writeDraft(text);
    const read = kind.read(text, slot);
    if (read !== undefined) field.setSlot(slot.name, read);
    field.setOpen(true);
    if (selectionStart === raw.length && kind.full(text, slot)) field.moveTo(index + 1, 'all');
  };

  return { draft, draftRef, typedRef, writeDraft, attach, handleFocus, handleBlur, handleChange };
};

export { useTypedDraft };

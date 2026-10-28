/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ModelEdit, ModelEditInput } from './useModelEdit.type';

const useModelEdit = <M,>(input: ModelEditInput<M>): ModelEdit<M> => {
  const { value, onChange, toModel, toHex } = input;
  const [model, setModel] = useState<M>(() => toModel(value));
  const emitted = useRef(value.toLowerCase());

  useEffect(() => {
    const incoming = value.toLowerCase();
    if (incoming === emitted.current) return;
    emitted.current = incoming;
    setModel(toModel(value));
  }, [value, toModel]);

  const edit = useCallback((patch: Partial<M>) => {
    const next = { ...model, ...patch };
    const hex = toHex(next);
    setModel(next);
    emitted.current = hex.toLowerCase();
    onChange(hex);
  }, [model, onChange, toHex]);

  return { model, edit };
};

export { useModelEdit };

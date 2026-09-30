/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { TYPEAHEAD_PAUSE_MS } from './listbox.constants';
import { typeaheadIndex } from './typeahead-index';
import type { ListboxModel } from './listbox-state.type';

const isPrintable = (key: string): boolean => key.length === 1 && key !== ' ';

const useTypeahead = <T>(model: ListboxModel<T>) => {
  const buffer = useRef({ text: '', at: 0 });

  return (key: string, time: number): number => {
    if (!isPrintable(key)) return -1;
    const fresh = time - buffer.current.at > TYPEAHEAD_PAUSE_MS;
    const text = fresh ? key : `${buffer.current.text}${key}`;
    buffer.current = { text, at: time };
    return typeaheadIndex(model.labels, model.active.enabled, model.active.index, text);
  };
};

export { useTypeahead };

/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { TYPEAHEAD_PAUSE_MS } from './listbox.constants';

const isPrintable = (key: string): boolean => key.length === 1 && key !== ' ';

const useTypeaheadText = () => {
  const buffer = useRef({ text: '', at: 0 });

  return (key: string, time: number): string | null => {
    if (!isPrintable(key)) return null;
    const fresh = time - buffer.current.at > TYPEAHEAD_PAUSE_MS;
    const text = fresh ? key : `${buffer.current.text}${key}`;
    buffer.current = { text, at: time };
    return text;
  };
};

export { useTypeaheadText };

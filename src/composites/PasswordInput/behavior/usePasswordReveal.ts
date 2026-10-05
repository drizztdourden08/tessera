/* @layer renderer-components @kind hook */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { caretOf } from './caret-of';
import type { CaretRange, Reveal, RevealParams } from './reveal.type';

const usePasswordReveal = (params: RevealParams): Reveal => {
  const { revealed, defaultRevealed, onRevealedChange, inputRef } = params;
  const [own, setOwn] = useState(defaultRevealed);
  const shown = revealed ?? own;
  const caret = useRef<CaretRange | null>(null);

  const set = (next: boolean) => {
    if (revealed === undefined) setOwn(next);
    onRevealedChange?.(next);
  };

  useLayoutEffect(() => {
    const input = inputRef.current;
    const range = caret.current;
    caret.current = null;
    if (input === null || range === null || input.ownerDocument.activeElement !== input) return;
    input.getBoundingClientRect();
    input.setSelectionRange(range.start, range.end, range.direction);
  }, [shown]);

  useEffect(() => {
    const form = inputRef.current?.form;
    if (!shown || form == null) return undefined;
    const hideOnSubmit = () => flushSync(() => set(false));
    form.addEventListener('submit', hideOnSubmit);
    return () => form.removeEventListener('submit', hideOnSubmit);
  }, [shown]);

  const toggle = () => {
    caret.current = caretOf(inputRef.current);
    set(!shown);
  };

  return { shown, toggle, hide: () => { if (shown) set(false); } };
};

export { usePasswordReveal };

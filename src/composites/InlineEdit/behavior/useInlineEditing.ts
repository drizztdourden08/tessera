/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { InlineEditing } from '../InlineEdit.type';

const useInlineEditing = (): InlineEditing => {
  const [editing, setEditing] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const focusBack = useRef(false);

  useEffect(() => {
    if (editing || !focusBack.current) return;
    focusBack.current = false;
    buttonRef.current?.focus();
  }, [editing]);

  const start = (): void => setEditing(true);
  const done = (back: boolean): void => {
    focusBack.current = back;
    setEditing(false);
  };
  return { editing, buttonRef, start, done };
};

export { useInlineEditing };

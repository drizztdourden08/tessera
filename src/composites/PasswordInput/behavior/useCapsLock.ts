/* @layer renderer-components @kind hook */
import { useState, type KeyboardEvent } from 'react';
import { capsLockOf } from './caps-lock-of';
import type { CapsLock } from './caps-lock.type';

const useCapsLock = (): CapsLock => {
  const [on, setOn] = useState(false);
  const track = (event: KeyboardEvent<HTMLInputElement>) => {
    const state = capsLockOf(event);
    if (state !== null) setOn(state);
  };
  return { on, track, clear: () => setOn(false) };
};

export { useCapsLock };

/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { ShortcutKey } from '../../../primitives/Shortcut/Shortcut.type';
import { keysOfEvent } from './key-of-event';

const useKeybindCapture = (onChange: (keys: readonly ShortcutKey[]) => void) => {
  const [listening, setListening] = useState(false);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (!listening) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.key === 'Escape') {
      setListening(false);
      return;
    }
    const keys = keysOfEvent(event);
    if (keys === null) return;
    onChange(keys);
    setListening(false);
  };

  return { listening, start: () => setListening(true), stop: () => setListening(false), onKeyDown };
};

export { useKeybindCapture };

/* @layer renderer-components @kind hook */
import { useEffect, useMemo, useState } from 'react';
import type { DockKeys } from './dock-hooks.type';
import { isTyping } from './is-typing';

const useDockKeys = (view?: Window): DockKeys => {
  const [peek, setPeek] = useState(false);
  const [swap, setSwap] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const target = view ?? window;
    const hold = (key: string, held: boolean): void => {
      if (key === 'Alt') setPeek(held);
      if (key === 'Shift') setSwap(held);
      if (key === 'Control') setOverlay(held);
    };
    const release = (): void => {
      setPeek(false);
      setSwap(false);
      setOverlay(false);
    };
    const onKeyDown = (e: KeyboardEvent): void => {
      if (!e.repeat && !isTyping(e.target)) hold(e.key, true);
    };
    const onKeyUp = (e: KeyboardEvent): void => hold(e.key, false);
    target.addEventListener('keydown', onKeyDown);
    target.addEventListener('keyup', onKeyUp);
    target.addEventListener('blur', release);
    return () => {
      target.removeEventListener('keydown', onKeyDown);
      target.removeEventListener('keyup', onKeyUp);
      target.removeEventListener('blur', release);
      release();
    };
  }, [view]);

  const modifiers = useMemo(() => ({ swap, overlay }), [swap, overlay]);
  return { peek, modifiers };
};

export { useDockKeys };

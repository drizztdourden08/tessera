/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { useHeldTimeout } from '../../../primitives/dom/useHeldTimeout';
import type { HoldOpen, HoldOpenParams } from './useHoldOpen.type';

const useHoldOpen = (params: HoldOpenParams): HoldOpen => {
  const { enabled, delay, onHold } = params;
  const [pressing, setPressing] = useState(false);
  const held = useRef(false);
  useHeldTimeout(!enabled || !pressing, delay, () => {
    held.current = true;
    setPressing(false);
    onHold();
  });
  const consumed = (): boolean => {
    const was = held.current;
    held.current = false;
    return was;
  };
  if (!enabled) return { handlers: {}, consumed };

  const cancel = (): void => setPressing(false);
  return {
    handlers: {
      onPointerDown: (event) => {
        if (event.button !== 0) return;
        held.current = false;
        setPressing(true);
      },
      onPointerUp: cancel,
      onPointerLeave: cancel,
      onPointerCancel: cancel,
    },
    consumed,
  };
};

export { useHoldOpen };

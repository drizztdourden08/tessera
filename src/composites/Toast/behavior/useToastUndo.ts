/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useUndo } from '../../../primitives/undo-stack/useUndo';
import type { ToastAction, ToastCloseReason, ToastItem } from '../Toast.type';

const useToastUndo = (item: ToastItem, live: boolean, close: (reason: ToastCloseReason) => void): ToastAction | undefined => {
  const { common } = useTesseraStrings();
  const { push } = useUndo();
  const { undo, message, action } = item;
  const latest = useRef(close);
  latest.current = close;

  useEffect(() => {
    if (undo === undefined || !live) return undefined;
    return push({
      label: message,
      undo: () => {
        undo();
        latest.current('action');
      },
    });
  }, [undo, message, live, push]);

  return undo === undefined ? action : { label: common.undo, onSelect: undo };
};

export { useToastUndo };

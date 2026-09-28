/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ARM_DELAY_MS } from './useSettingsDismiss.constants';

const useSettingsDismiss = (
  panelRef: RefObject<HTMLElement | null>,
  anchorRef: RefObject<HTMLElement | null>,
  onClose: () => void,
): void => {
  useEffect(() => {
    let armed = false;
    const armTimer = setTimeout(() => { armed = true; }, ARM_DELAY_MS);

    const handler = (e: MouseEvent) => {
      if (!armed) return;
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener('pointerdown', handler, true);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener('pointerdown', handler, true);
    };
  }, [onClose, anchorRef]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);
};

export { useSettingsDismiss };

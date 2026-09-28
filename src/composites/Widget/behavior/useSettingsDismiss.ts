/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
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
    const doc = ownerDocumentOf(anchorRef.current ?? panelRef.current);
    doc.addEventListener('pointerdown', handler, true);
    return () => {
      clearTimeout(armTimer);
      doc.removeEventListener('pointerdown', handler, true);
    };
  }, [onClose, anchorRef, panelRef]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const doc = ownerDocumentOf(anchorRef.current ?? panelRef.current);
    doc.addEventListener('keydown', handler);
    return () => doc.removeEventListener('keydown', handler);
  }, [onClose, anchorRef, panelRef]);
};

export { useSettingsDismiss };

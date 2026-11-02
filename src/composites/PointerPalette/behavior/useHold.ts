/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';

const useHold = (holding: boolean): boolean => {
  const [held, setHeld] = useState(holding);

  useEffect(() => {
    if (!held) return undefined;
    const doc = ownerDocumentOf(null);
    const end = (): void => setHeld(false);
    doc.addEventListener('pointerup', end);
    doc.addEventListener('pointercancel', end);
    return () => {
      doc.removeEventListener('pointerup', end);
      doc.removeEventListener('pointercancel', end);
    };
  }, [held]);

  return held;
};

export { useHold };

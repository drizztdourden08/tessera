/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import type { PalettePoint } from '../PointerPalette.type';
import { holdSession } from './hold-session';
import type { HoldSession } from './hold-session.type';

const useHold = (holding: boolean, at: PalettePoint, surface: RefObject<HTMLElement | null>): boolean => {
  const [held, setHeld] = useState(holding);
  const start = useRef(at);
  const session = useRef<HoldSession | null>(null);
  const was = useRef(holding);

  useEffect(() => {
    if (!held) return undefined;
    const hold = holdSession(ownerDocumentOf(null), start.current, surface, () => setHeld(false));
    session.current = hold;
    return () => {
      hold.stop();
      session.current = null;
    };
  }, [held, surface]);

  useEffect(() => {
    if (was.current && !holding) session.current?.release();
    was.current = holding;
  }, [holding]);

  return held;
};

export { useHold };

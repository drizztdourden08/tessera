/* @layer renderer-components @kind logic */
import type { RefObject } from 'react';
import { OPTION_SELECTOR } from '../PointerPalette.constants';
import type { PalettePoint } from '../PointerPalette.type';
import type { HoldSession } from './hold-session.type';

const holdSession = (doc: Document, from: PalettePoint, surface: RefObject<HTMLElement | null>, onEnd: () => void): HoldSession => {
  let last = from;
  let ended = false;
  const move = (event: PointerEvent): void => {
    last = { x: event.clientX, y: event.clientY };
  };
  const end = (): void => {
    ended = true;
    onEnd();
  };
  doc.addEventListener('pointermove', move);
  doc.addEventListener('pointerup', end);
  doc.addEventListener('pointercancel', end);

  return {
    release: () => {
      if (ended) return;
      const under = doc.elementFromPoint(last.x, last.y);
      const root = surface.current;
      const cell = root && under && root.contains(under) ? under.closest<HTMLElement>(OPTION_SELECTOR) : null;
      end();
      cell?.click();
    },
    stop: () => {
      doc.removeEventListener('pointermove', move);
      doc.removeEventListener('pointerup', end);
      doc.removeEventListener('pointercancel', end);
    },
  };
};

export { holdSession };

/* @layer renderer-components @kind logic */
import type { PalettePoint } from '../PointerPalette.type';
import type { HoldSession } from './hold-session.type';

const holdSession = (doc: Document, from: PalettePoint, onEnd: () => void): HoldSession => {
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
      doc.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: last.x, clientY: last.y }));
    },
    stop: () => {
      doc.removeEventListener('pointermove', move);
      doc.removeEventListener('pointerup', end);
      doc.removeEventListener('pointercancel', end);
    },
  };
};

export { holdSession };

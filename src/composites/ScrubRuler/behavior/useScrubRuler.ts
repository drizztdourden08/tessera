/* @layer renderer-components @kind hook */
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { cellAt, localX } from '../../cell-geometry';
import { scrubKeyStep } from './scrub-key-step';
import { useBandDraw } from './useBandDraw';
import { useScrubDrag } from './useScrubDrag';
import type { ScrubRulerSetup, ScrubRulerState } from './useScrubRuler.type';

const useScrubRuler = (setup: ScrubRulerSetup): ScrubRulerState => {
  const { cells, total, value, readOnly, onChange, onBandChange, onCellContextMenu } = setup;
  const scrub = useScrubDrag({ cells, total, value, onChange });
  const band = useBandDraw({ cells, total, onBandChange });

  const press = (event: PointerEvent<HTMLElement>): void => {
    if (readOnly) return;
    if (event.shiftKey && onBandChange) band.press(event);
    else scrub.press(event);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (readOnly) return;
    const next = scrubKeyStep({ key: event.key, alt: event.altKey, ctrl: event.ctrlKey, meta: event.metaKey }, value, total);
    if (next === null) return;
    event.preventDefault();
    if (next !== value) onChange?.(next);
  };

  const onContextMenu = (event: MouseEvent<HTMLElement>): void => {
    onCellContextMenu?.(cellAt(cells, localX(event.clientX, event.currentTarget), total), event);
  };

  return { scrubbing: scrub.scrubbing, draftBand: band.draft, press, onKeyDown, onContextMenu };
};

export { useScrubRuler };

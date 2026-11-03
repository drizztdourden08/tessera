/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { cellAt, localX } from '../../cell-geometry';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import type { ScrubDragSetup, ScrubDragState } from './useScrubDrag.type';

const useScrubDrag = (setup: ScrubDragSetup): ScrubDragState => {
  const { cells, total, value, onChange } = setup;
  const { live, begin } = useRectDrag<number>();
  const last = useRef(value);

  const press = (event: PointerEvent<HTMLElement>): void => {
    const track = event.currentTarget;
    const originX = localX(event.clientX, track);
    track.focus();
    const go = (index: number): number => {
      if (index !== last.current) onChange?.(index);
      last.current = index;
      return index;
    };
    last.current = value;
    go(cellAt(cells, originX, total));
    begin(event, (delta) => go(cellAt(cells, originX + delta.x, total)), () => undefined);
  };

  return { scrubbing: live !== null, press };
};

export { useScrubDrag };

/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { RefObject } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useReorderDrag } from '../../reorder/useReorderDrag';
import { SWATCH_SELECTOR } from '../SwatchGrid.constants';
import type { SwatchGridProps } from '../SwatchGrid.type';
import { swatchTitle } from './swatch-title';
import { useSwatchFocus } from './useSwatchFocus';

const useSwatchMoves = (listRef: RefObject<HTMLElement | null>, { colors, onMove }: SwatchGridProps) => {
  const { swatchGrid } = useTesseraStrings();
  const focus = useSwatchFocus(listRef);
  const dropped = useRef(false);
  const commit = (from: number, to: number): void => {
    const color = colors[from];
    if (color) focus.announce(swatchGrid.moved(swatchTitle(color, swatchGrid), to));
    onMove?.(from, to);
  };
  const drag = useReorderDrag({
    listRef,
    selector: SWATCH_SELECTOR,
    axis: 'grid',
    onDrop: (from, to) => {
      dropped.current = true;
      setTimeout(() => {
        dropped.current = false;
      }, 0);
      commit(from, to);
    },
  });
  return {
    drag,
    message: focus.message,
    move: (from: number, to: number): void => {
      const color = colors[from];
      if (color) focus.expect(color.id);
      commit(from, to);
    },
    afterDrop: (): boolean => {
      const was = dropped.current;
      dropped.current = false;
      return was;
    },
  };
};

export { useSwatchMoves };

/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import type { FocusEvent } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SWATCH_SELECTOR } from '../SwatchGrid.constants';
import type { SwatchColor, SwatchGridProps, SwatchModifiers } from '../SwatchGrid.type';
import { swatchKeys } from './swatch-keys';
import { swatchName } from './swatch-name';
import { swatchPick } from './swatch-pick';
import { tabbableSwatch } from './tabbable-swatch';
import { useSwatchMoves } from './useSwatchMoves';

const useSwatchGrid = (props: SwatchGridProps) => {
  const { colors, columns, selectedId, secondaryId, onMove, onSelect, onSecondarySelect, onRangeChange } = props;
  const { swatchGrid } = useTesseraStrings();
  const listRef = useRef<HTMLElement>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const moves = useSwatchMoves(listRef, props);
  const selectedIndex = colors.findIndex((color) => color.id === selectedId);
  const pick = swatchPick({ colors, selectedIndex, onSelect, onSecondarySelect, onRangeChange });
  return {
    listRef,
    drag: onMove ? moves.drag : undefined,
    message: moves.message,
    tabId: tabbableSwatch(colors.map((color) => color.id), focusedId, selectedId),
    onKeyDown: swatchKeys(listRef, {
      count: colors.length, columns, selectedIndex, move: onMove ? moves.move : undefined, onRangeChange,
    }),
    onFocus: (event: FocusEvent<HTMLElement>): void => {
      setFocusedId(event.target.closest<HTMLElement>(SWATCH_SELECTOR)?.dataset.swatchKey ?? null);
    },
    onPick: (index: number, held: SwatchModifiers): void => {
      if (!moves.afterDrop()) pick(index, held);
    },
    nameOf: (color: SwatchColor, index: number): string => swatchName(color, index, color.id === secondaryId, swatchGrid),
  };
};

export { useSwatchGrid };

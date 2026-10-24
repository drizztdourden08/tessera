/* @layer stories @kind hook */
import { useState } from 'react';
import type { SwatchColor, SwatchRange } from '../../../src/composites';
import { moveInList } from './move-in-list';

const useSwatchPalette = (initial: readonly SwatchColor[], startRange?: SwatchRange) => {
  const [colors, setColors] = useState(initial);
  const [selectedId, setSelectedId] = useState(initial[startRange?.from ?? 0]?.id);
  const [secondaryId, setSecondaryId] = useState(initial[1]?.id);
  const [range, setRange] = useState(startRange);
  return {
    colors,
    selectedId,
    secondaryId,
    range,
    select: (id: string) => {
      setSelectedId(id);
      setRange(undefined);
    },
    selectSecondary: setSecondaryId,
    changeRange: (from: number, to: number) => setRange({ from, to }),
    move: (from: number, to: number) => {
      setColors((list) => moveInList(list, from, to));
      setRange(undefined);
    },
  };
};

export { useSwatchPalette };

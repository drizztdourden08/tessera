/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { gridDropHandlers } from './grid-drop-handlers';
import type { GridDropData, UseGridDropDataInput } from './useGridDropData.type';

const useGridDropData = <T,>(input: UseGridDropDataInput<T>): GridDropData<T> => {
  const { sections, announce } = input;
  const { lists } = useTesseraStrings();
  const [hot, setHot] = useState<string | null>(null);
  return {
    hot,
    active: sections?.some((section) => section.onDropData !== undefined) ?? false,
    dropOf: (section) => gridDropHandlers({ section, setHot, announce, said: lists.itemsMovedInto }),
  };
};

export { useGridDropData };

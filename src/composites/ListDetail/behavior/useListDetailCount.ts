/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';

interface ListCount {
  shown: number;
  total: number;
}

const useListDetailCount = (title: string, size: number) => {
  const { lists } = useTesseraStrings();
  const [count, setCount] = useState<ListCount | null>(null);
  const { shown, total } = count ?? { shown: size, total: size };
  const onCount = (nextShown: number, nextTotal: number) => {
    setCount((last) => (last?.shown === nextShown && last.total === nextTotal ? last : { shown: nextShown, total: nextTotal }));
  };
  return { heading: lists.count(title, shown, total), onCount };
};

export { useListDetailCount };

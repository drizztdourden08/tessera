/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../dom/observe-resize';
import { fitMiddle } from './fit-middle';
import { measureFit } from './measure-fit';

const useMiddleCut = (textRef: RefObject<HTMLElement | null>, text: string): string => {
  const [shown, setShown] = useState(text);

  useLayoutEffect(() => {
    const node = textRef.current;
    if (!node) return undefined;
    const update = () => setShown(fitMiddle(text, measureFit(node)));
    update();
    return observeResize([node], update);
  }, [textRef, text]);

  return shown;
};

export { useMiddleCut };

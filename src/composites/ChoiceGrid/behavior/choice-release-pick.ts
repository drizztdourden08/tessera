/* @layer renderer-components @kind util */
import type { RefObject } from 'react';
import { choiceIndexOf } from './choice-index-of';

const choiceReleasePick = (rootRef: RefObject<HTMLElement | null>, pick: (index: number) => void) => (event: PointerEvent): void => {
  const under = document.elementFromPoint(event.clientX, event.clientY);
  const root = rootRef.current;
  if (!root || !under || !root.contains(under)) return;
  const index = choiceIndexOf(under);
  if (index !== null) pick(index);
};

export { choiceReleasePick };

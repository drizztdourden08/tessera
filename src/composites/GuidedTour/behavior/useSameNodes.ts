/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { sameNodes } from './same-nodes';

const useSameNodes = (nodes: readonly HTMLElement[]): readonly HTMLElement[] => {
  const [kept, setKept] = useState(nodes);
  if (sameNodes(kept, nodes)) return kept;
  setKept(nodes);
  return nodes;
};

export { useSameNodes };

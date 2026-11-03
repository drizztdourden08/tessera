/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { SegmentDrop, SegmentDropRules } from '../Breadcrumbs.type';
import { segmentDropHandlers } from './segment-drop-handlers';

const useSegmentDrop = (rules: SegmentDropRules): SegmentDrop => {
  const { onDropOn, canDrop, dropTarget, dropOverId } = rules;
  const [overId, setOverId] = useState<string | null>(null);
  return { overId: dropOverId ?? overId, bind: (id, index) => dropTarget?.(index, id) ?? segmentDropHandlers(id, { onDropOn, canDrop }, setOverId) };
};

export { useSegmentDrop };

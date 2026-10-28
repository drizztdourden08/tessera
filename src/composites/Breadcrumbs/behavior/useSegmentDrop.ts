/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { BreadcrumbsProps, SegmentDrop } from '../Breadcrumbs.type';
import { segmentDropHandlers } from './segment-drop-handlers';

const useSegmentDrop = (onDropOn: BreadcrumbsProps['onDropOn'], canDrop: BreadcrumbsProps['canDrop']): SegmentDrop => {
  const [overId, setOverId] = useState<string | null>(null);
  return { overId, bind: (id) => segmentDropHandlers(id, { onDropOn, canDrop }, setOverId) };
};

export { useSegmentDrop };

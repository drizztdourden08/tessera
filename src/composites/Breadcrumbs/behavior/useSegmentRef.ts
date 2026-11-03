/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { BreadcrumbsProps, SegmentRef } from '../Breadcrumbs.type';

const useSegmentRef = (id: string, onSegmentRef: BreadcrumbsProps['onSegmentRef']): SegmentRef => {
  const itemRef = useRef<HTMLElement | null>(null);
  const setRef = useCallback((element: HTMLElement | null): void => {
    itemRef.current = element;
    onSegmentRef?.(id, element);
  }, [id, onSegmentRef]);
  return { itemRef, setRef };
};

export { useSegmentRef };

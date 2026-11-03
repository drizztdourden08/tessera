/* @layer renderer-components @kind logic */
import type { RefObject } from 'react';
import type { VirtualMetricsReader } from './virtual.type';

const measureInScroller = (read: VirtualMetricsReader, scrollerRef: RefObject<HTMLElement | null>): VirtualMetricsReader =>
  (root, body, before) => read(scrollerRef.current ?? root, body, before);

export { measureInScroller };

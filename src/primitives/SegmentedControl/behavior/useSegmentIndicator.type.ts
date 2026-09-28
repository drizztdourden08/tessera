/* @layer renderer-components @kind types */
import type { CSSProperties, RefObject } from 'react';

interface SegmentIndicator {
  trackRef: RefObject<HTMLDivElement | null>;
  indicatorStyle: CSSProperties;
}

export type { SegmentIndicator };

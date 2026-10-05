/* @layer renderer-components @kind hook */
import { useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useActiveMarker } from '../../dom/useActiveMarker';
import { ACTIVE_SEGMENT, INDICATOR_INSET } from '../SegmentedControl.constants';
import type { SegmentIndicator } from './useSegmentIndicator.type';

const useSegmentIndicator = (value: string, options: readonly unknown[]): SegmentIndicator => {
  const trackRef = useRef<HTMLDivElement>(null);
  const changeKey = useMemo(() => ({ value, options }), [value, options]);
  const { box, shown } = useActiveMarker(trackRef, ACTIVE_SEGMENT, changeKey);
  const indicatorStyle = useMemo<CSSProperties>(() => ({
    ...(box ? { width: box.size, transform: `translateX(${box.left - INDICATOR_INSET}px)` } : {}),
    ...(box || shown ? { opacity: shown ? 1 : 0 } : {}),
  }), [box, shown]);
  return { trackRef, indicatorStyle };
};

export { useSegmentIndicator };

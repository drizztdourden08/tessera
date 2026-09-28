/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { SegmentIndicator } from './useSegmentIndicator.type';

const useSegmentIndicator = (value: string, options: readonly unknown[]): SegmentIndicator => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({});

  const updateIndicator = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const activeBtn = track.querySelector<HTMLButtonElement>('[aria-checked="true"]');
    if (!activeBtn) return;
    setIndicatorStyle({
      width: activeBtn.offsetWidth,
      transform: `translateX(${activeBtn.offsetLeft - 2}px)`,
    });
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [value, options, updateIndicator]);

  useEffect(() => {
    const observer = new ResizeObserver(updateIndicator);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [updateIndicator]);

  return { trackRef, indicatorStyle };
};

export { useSegmentIndicator };

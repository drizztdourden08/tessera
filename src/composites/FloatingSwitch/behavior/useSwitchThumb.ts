/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { SwitchThumb, ThumbBox } from './useSwitchThumb.type';
import { thumbBoxOf } from './thumb-box-of';

const useSwitchThumb = (activeId: string, itemsKey: string): SwitchThumb => {
  const trackRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState<ThumbBox | null>(null);
  const [gliding, setGliding] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const next = thumbBoxOf(track, track.querySelector<HTMLElement>('[aria-current="page"]'));
    setBox((previous) => (previous?.start === next?.start && previous?.size === next?.size ? previous : next));
  }, []);

  useLayoutEffect(measure, [activeId, itemsKey, measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    return observeResize([track, ...track.querySelectorAll('.floating-switch__item')], measure);
  }, [itemsKey, measure]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setGliding(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return {
    trackRef,
    thumbStyle: box ? { insetInlineStart: box.start, inlineSize: box.size } : {},
    shown: box !== null,
    gliding,
  };
};

export { useSwitchThumb };

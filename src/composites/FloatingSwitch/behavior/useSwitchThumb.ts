/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { useActiveMarker } from '../../../primitives/dom/useActiveMarker';
import { ACTIVE_ITEM } from '../FloatingSwitch.constants';
import type { SwitchThumb } from './useSwitchThumb.type';

const useSwitchThumb = (activeId: string, itemsKey: string): SwitchThumb => {
  const trackRef = useRef<HTMLElement>(null);
  const [gliding, setGliding] = useState(false);
  const { box, shown } = useActiveMarker(trackRef, ACTIVE_ITEM, `${activeId}\n${itemsKey}`);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setGliding(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return {
    trackRef,
    thumbStyle: box ? { insetInlineStart: box.start, inlineSize: box.size } : {},
    shown,
    gliding,
  };
};

export { useSwitchThumb };

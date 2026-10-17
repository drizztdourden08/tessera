/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { VolumeWheel } from '../VolumeControl.type';

const useVolumeWheel = (params: VolumeWheel): void => {
  const { anchorRef, panelRef, onNudge, active, open } = params;
  const latest = useRef(onNudge);
  latest.current = onNudge;

  useEffect(() => {
    if (!active) return undefined;
    const nodes = [anchorRef.current, open ? panelRef.current : null].filter((node): node is HTMLElement => node !== null);
    const wheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      event.preventDefault();
      latest.current(event.deltaY < 0 ? 1 : -1);
    };
    nodes.forEach((node) => node.addEventListener('wheel', wheel, { passive: false }));
    return () => nodes.forEach((node) => node.removeEventListener('wheel', wheel));
  }, [anchorRef, panelRef, active, open]);
};

export { useVolumeWheel };

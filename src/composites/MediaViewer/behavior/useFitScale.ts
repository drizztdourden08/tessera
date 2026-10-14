/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { NaturalSize } from '../MediaViewer.type';

const useFitScale = (stageRef: RefObject<HTMLElement | null>, natural: NaturalSize | null, open: boolean): number | null => {
  const [room, setRoom] = useState<NaturalSize | null>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!open || !stage) return undefined;
    const measure = () => setRoom({ width: stage.clientWidth, height: stage.clientHeight });
    measure();
    return observeResize([stage], measure);
  }, [stageRef, open]);
  if (!room || !natural || natural.width === 0 || natural.height === 0) return null;
  return Math.min(room.width / natural.width, room.height / natural.height);
};

export { useFitScale };

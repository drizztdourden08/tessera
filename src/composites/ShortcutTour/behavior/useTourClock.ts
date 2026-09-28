/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { TourFrame } from '../ShortcutTour.type';

const useTourClock = (frames: readonly TourFrame[], loop: boolean, running: boolean, travel: () => number) => {
  const signature = `${loop}:${JSON.stringify(frames)}`;
  const [tick, setTick] = useState({ signature, index: 0 });
  const index = tick.signature === signature ? tick.index : 0;
  const frame = frames[index] ?? null;

  useEffect(() => {
    const last = index >= frames.length - 1;
    if (!frame || !running || (last && !loop)) return undefined;
    const timer = setTimeout(() => setTick({ signature, index: last ? 0 : index + 1 }), frame.wait * travel());
    return () => clearTimeout(timer);
  }, [signature, index, running]);

  return frame;
};

export { useTourClock };

/* @layer renderer-components @kind logic */
import { EASE } from '../motion/motion.constants';
import type { MotionTrack } from '../motion/motion.type';
import type { ThreadRig } from './pelago.type';
import { SPARK } from './pelago-geometry.constants';
import { threadEnd } from './thread-end';
import { threadPoint } from './thread-point';

const round = (n: number): number => Number(n.toFixed(3));

const sparkTrack = (thread: ThreadRig, start: number, end: number): MotionTrack => {
  const from = threadEnd(thread.from);
  const to = threadEnd(thread.to);
  const travel = SPARK.steps.map((t) => {
    const [x, y] = threadPoint(from, to, thread.bulge, t);
    return { at: round(start + (end - start) * t), x: round(x - from[0]), y: round(y - from[1]), opacity: t === 1 ? 0 : 1, ease: EASE.linear };
  });
  return {
    part: `spark${thread.from.toUpperCase()}`,
    frames: [{ at: 0 }, { at: start, ease: EASE.linear }, ...travel, { at: round(end + SPARK.reset), opacity: 0 }, { at: round(end + SPARK.show) }, { at: 1 }],
  };
};

export { sparkTrack };

/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { EASE } from '../motion/motion.constants';
import type { MotionFrame } from '../motion/motion.type';

const round = (n: number): number => Number(n.toFixed(3));

const driftFrames = (start: number, span: number, [fx, fy]: ScenePoint, [tx, ty]: ScenePoint): readonly MotionFrame[] => {
  const along = (t: number): Pick<MotionFrame, 'x' | 'y'> => ({ x: round(fx + (tx - fx) * t), y: round(fy + (ty - fy) * t) });
  return [
    { at: 0, opacity: 0, x: fx, y: fy },
    { at: round(start), opacity: 0, x: fx, y: fy, ease: EASE.linear },
    { at: round(start + span * 0.2), opacity: 1, ...along(0.2), ease: EASE.linear },
    { at: round(start + span * 0.7), opacity: 1, ...along(0.7), ease: EASE.linear },
    { at: round(start + span), opacity: 0, x: tx, y: ty },
    { at: 1, opacity: 0, x: fx, y: fy },
  ];
};

export { driftFrames };

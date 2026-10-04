/* @layer renderer-components @kind logic */
import { EASE } from '../motion/motion.constants';
import type { MotionFrame } from '../motion/motion.type';

const round = (n: number): number => Number(n.toFixed(3));

const popFrames = (show: number, hide: number, from: Omit<MotionFrame, 'at'> = {}): readonly MotionFrame[] => [
  { at: 0, opacity: 0, scale: 0.3, ...from },
  { at: show, opacity: 0, scale: 0.3, ...from, ease: EASE.overshoot },
  { at: round(show + 0.08), opacity: 1 },
  { at: hide, opacity: 1, ease: EASE.in },
  { at: round(hide + 0.08), opacity: 0, scale: 0.5, y: -1 },
  { at: 1, opacity: 0, scale: 0.3, ...from },
];

export { popFrames };

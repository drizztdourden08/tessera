/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_MOVE: MascotAnimation = {
  name: 'Move',
  summary: 'Scoots forward in small hops: leans into each one, lands flat in a squash and swings its hands like a runner. The eyes look ahead.',
  duration: 1100,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.05, scaleY: 0.94, ease: EASE.out },
        { at: 0.2, y: -2.4, rotate: 4, scaleX: 0.97, scaleY: 1.04, ease: EASE.fall },
        { at: 0.42, y: -0.3, rotate: 1, ease: EASE.linear },
        { at: 0.5, scaleX: 1.05, scaleY: 0.94, ease: EASE.out },
        { at: 0.7, y: -2.4, rotate: 4, scaleX: 0.97, scaleY: 1.04, ease: EASE.fall },
        { at: 0.92, y: -0.3, rotate: 1, ease: EASE.linear },
        { at: 1, scaleX: 1.05, scaleY: 0.94 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.06 },
        { at: 0.2, scale: 0.84, opacity: 0.72 },
        { at: 0.42 },
        { at: 0.5, scaleX: 1.06 },
        { at: 0.7, scale: 0.84, opacity: 0.72 },
        { at: 0.92 },
        { at: 1, scaleX: 1.06 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, rotate: 18 },
        { at: 0.25, rotate: -14 },
        { at: 0.5, rotate: 18 },
        { at: 0.75, rotate: -14 },
        { at: 1, rotate: 18 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, rotate: 16 },
        { at: 0.25, rotate: -18 },
        { at: 0.5, rotate: 16 },
        { at: 0.75, rotate: -18 },
        { at: 1, rotate: 16 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: 2 },
        { at: 1, x: 2 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, x: 1 },
        { at: 1, x: 1 },
      ],
    },
  ],
};

export { FLINT_MOVE };

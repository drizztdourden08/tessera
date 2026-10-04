/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_IDLE_BOUNCE: MascotAnimation = {
  name: 'Idle bounce',
  summary: 'Bounces in place on its flat base, a high hop and then a lower one: it squashes on each landing and stretches as it rises, the hands flick up a beat behind, the smile opens at the top of each hop, and it blinks as the second hop lands.',
  duration: 2000,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.07, scaleY: 0.92, ease: EASE.out },
        { at: 0.2, y: -2.4, scaleX: 0.97, scaleY: 1.04, ease: EASE.fall },
        { at: 0.4, scaleX: 0.98, scaleY: 1.02, ease: EASE.linear },
        { at: 0.47, scaleX: 1.05, scaleY: 0.94, ease: EASE.out },
        { at: 0.69, y: -1.5, scaleX: 0.98, scaleY: 1.03, ease: EASE.fall },
        { at: 0.92, scaleX: 0.99, scaleY: 1.01, ease: EASE.linear },
        { at: 1, scaleX: 1.07, scaleY: 0.92 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.07, ease: EASE.out },
        { at: 0.2, scale: 0.84, opacity: 0.72, ease: EASE.fall },
        { at: 0.4, ease: EASE.linear },
        { at: 0.47, scaleX: 1.05, ease: EASE.out },
        { at: 0.69, scale: 0.9, opacity: 0.82, ease: EASE.fall },
        { at: 0.92, ease: EASE.linear },
        { at: 1, scaleX: 1.07 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, y: 0.6, rotate: -10 },
        { at: 0.24, y: -0.8, rotate: 16 },
        { at: 0.42, rotate: 2 },
        { at: 0.5, y: 0.5, rotate: -8 },
        { at: 0.72, y: -0.6, rotate: 12 },
        { at: 0.9, rotate: 1 },
        { at: 1, y: 0.6, rotate: -10 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, y: 0.6, rotate: 10 },
        { at: 0.25, y: -0.8, rotate: -15 },
        { at: 0.43, rotate: -2 },
        { at: 0.51, y: 0.5, rotate: 8 },
        { at: 0.73, y: -0.6, rotate: -11 },
        { at: 0.91, rotate: -1 },
        { at: 1, y: 0.6, rotate: 10 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, y: 0.4, scaleY: 0.8 },
        { at: 0.18, y: -0.4 },
        { at: 0.4 },
        { at: 0.47, y: 0.3, scaleY: 0.85 },
        { at: 0.66, y: -0.3 },
        { at: 0.88, ease: EASE.in },
        { at: 0.93, scaleY: 0.1, ease: EASE.out },
        { at: 1, y: 0.4, scaleY: 0.8 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 1.15, scaleY: 0.8 },
        { at: 0.2, y: -0.2, scaleY: 1.3 },
        { at: 0.4 },
        { at: 0.47, scaleX: 1.1, scaleY: 0.85 },
        { at: 0.69, y: -0.2, scaleY: 1.2 },
        { at: 0.92 },
        { at: 1, scaleX: 1.15, scaleY: 0.8 },
      ],
    },
  ],
};

export { FLINT_IDLE_BOUNCE };

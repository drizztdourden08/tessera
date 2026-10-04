/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_WORRIED: MascotAnimation = {
  name: 'Worried',
  summary: 'Nervous: sweat drops roll down both sides of its head, it trembles in quick bursts and its eyes dart about, pods held in tight.',
  duration: 1600,
  loop: true,
  still: ['sweatLeft', 'sweatRight'],
  tracks: [
    {
      part: 'sweatLeft',
      frames: [
        { at: 0 },
        { at: 0.42, y: 2.5 },
        { at: 0.52, y: 3.5, opacity: 0 },
        { at: 0.56, y: -1, opacity: 0 },
        { at: 0.66 },
        { at: 1 },
      ],
    },
    {
      part: 'sweatRight',
      frames: [
        { at: 0, y: 1.2 },
        { at: 0.2, y: 3, opacity: 0.6 },
        { at: 0.28, y: 3.5, opacity: 0 },
        { at: 0.32, y: -1, opacity: 0 },
        { at: 0.42 },
        { at: 1, y: 1.2 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0, ease: EASE.linear },
        { at: 0.04, x: -0.5, ease: EASE.linear },
        { at: 0.08, x: 0.5, ease: EASE.linear },
        { at: 0.12, x: -0.5, ease: EASE.linear },
        { at: 0.16 },
        { at: 0.54, ease: EASE.linear },
        { at: 0.58, x: 0.5, ease: EASE.linear },
        { at: 0.62, x: -0.5, ease: EASE.linear },
        { at: 0.66, x: 0.5, ease: EASE.linear },
        { at: 0.7 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, y: -1 },
        { at: 0.26, y: -1, ease: EASE.snap },
        { at: 0.3, x: -1, y: -1 },
        { at: 0.5, x: -1, y: -1, ease: EASE.snap },
        { at: 0.54, x: 1, y: -1 },
        { at: 0.76, x: 1, y: -1, ease: EASE.snap },
        { at: 0.8, y: -1 },
        { at: 1, y: -1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -16 },
        { at: 0.5, rotate: -20 },
        { at: 1, rotate: -16 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 16 },
        { at: 0.5, rotate: 20 },
        { at: 1, rotate: 16 },
      ],
    },
  ],
};

export { SENTRI_WORRIED };

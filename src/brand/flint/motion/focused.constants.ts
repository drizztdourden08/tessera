/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_FOCUSED: MascotAnimation = {
  name: 'Focused',
  summary: 'Concentrating hard: heavy lids and set brows, a flat determined mouth, hands balled up in front, it leans in low and reads, the eyes sweeping along a line and snapping back. A bead of sweat rolls down beside its head.',
  duration: 3200,
  loop: true,
  still: ['lids', 'browsFocused'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: 0.3, scaleX: 1.02, scaleY: 0.975 },
        { at: 0.5, y: 0.3, scaleX: 1.015, scaleY: 0.985 },
        { at: 1, y: 0.3, scaleX: 1.02, scaleY: 0.975 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.02 },
        { at: 0.5, scaleX: 1.01 },
        { at: 1, scaleX: 1.02 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 2.5, y: -1.5, rotate: -18 },
        { at: 0.5, x: 2.5, y: -1.8, rotate: -20 },
        { at: 1, x: 2.5, y: -1.5, rotate: -18 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: -2.5, y: -1.8, rotate: 20 },
        { at: 0.5, x: -2.5, y: -1.5, rotate: 18 },
        { at: 1, x: -2.5, y: -1.8, rotate: 20 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: -0.5 },
        { at: 0.42, x: 0.5, ease: EASE.snap },
        { at: 0.46, x: -0.5 },
        { at: 0.88, x: 0.5, ease: EASE.snap },
        { at: 0.92, x: -0.5 },
        { at: 1, x: -0.5 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 0.7, scaleY: 0.5 },
        { at: 1, scaleX: 0.7, scaleY: 0.5 },
      ],
    },
    {
      part: 'sweatRight',
      frames: [
        { at: 0 },
        { at: 0.55, y: -0.5, scale: 0.6, opacity: 0 },
        { at: 0.62, opacity: 1 },
        { at: 0.85, y: 1.2, opacity: 1 },
        { at: 0.95, y: 2, opacity: 0 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_FOCUSED };

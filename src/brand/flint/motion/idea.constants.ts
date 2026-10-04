/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_IDEA: MascotAnimation = {
  name: 'Idea',
  summary: 'Gets an idea: ponders with a hand under its chin and its eyes up to one side, then a yellow light bulb pops on over its head with flashing rays, the orange chip flares bright, and it hops with the other hand shot up high, eyes wide and mouth open.',
  duration: 2600,
  loop: true,
  still: ['bulb', 'bulbRays', 'chipGlow'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: -0.5, rotate: -3 },
        { at: 0.32, y: -0.7, rotate: -4 },
        { at: 0.36, scaleX: 1.08, scaleY: 0.9, ease: EASE.out },
        { at: 0.44, y: -3, scaleX: 0.95, scaleY: 1.07, ease: EASE.fall },
        { at: 0.54, scaleX: 1.06, scaleY: 0.94, ease: EASE.out },
        { at: 0.6 },
        { at: 0.86 },
        { at: 1, y: -0.5, rotate: -3 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: -0.3 },
        { at: 0.36, scaleX: 1.08, ease: EASE.out },
        { at: 0.44, scale: 0.82, opacity: 0.75, ease: EASE.fall },
        { at: 0.54, scaleX: 1.05 },
        { at: 0.6 },
        { at: 1, x: -0.3 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 9, y: 0.5, rotate: -25 },
        { at: 0.32, x: 9, y: 0.5, rotate: -25 },
        { at: 0.38, x: 0.5, y: -5, rotate: 28, ease: EASE.overshoot },
        { at: 0.5, x: 0.5, y: -5.5, rotate: 24 },
        { at: 0.8, x: 0.5, y: -5, rotate: 24 },
        { at: 0.92 },
        { at: 1, x: 9, y: 0.5, rotate: -25 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, rotate: 4 },
        { at: 0.36, rotate: 8 },
        { at: 0.42, x: -1, y: -9, rotate: -20, ease: EASE.overshoot },
        { at: 0.5, x: -1, y: -9.5, rotate: -26 },
        { at: 0.58, x: -1, y: -9, rotate: -20 },
        { at: 0.8, x: -1, y: -9, rotate: -22 },
        { at: 0.92 },
        { at: 1, rotate: 4 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: -1.5, y: -1 },
        { at: 0.32, x: -1.8, y: -1 },
        { at: 0.36, scaleY: 0.3, ease: EASE.snap },
        { at: 0.42, y: -0.8, scale: 1.3, ease: EASE.out },
        { at: 0.8, y: -0.8, scale: 1.25 },
        { at: 0.9 },
        { at: 1, x: -1.5, y: -1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, x: -0.5, scaleX: 0.6, scaleY: -0.6 },
        { at: 0.32, x: -0.5, scaleX: 0.6, scaleY: -0.6 },
        { at: 0.42, scaleX: 1.3, scaleY: 1.9 },
        { at: 0.8, scaleX: 1.3, scaleY: 1.7 },
        { at: 0.9 },
        { at: 1, x: -0.5, scaleX: 0.6, scaleY: -0.6 },
      ],
    },
    {
      part: 'bulb',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.36, y: 1.5, scale: 0.3, opacity: 0 },
        { at: 0.42, y: -0.5, scale: 1.25, opacity: 1, ease: EASE.overshoot },
        { at: 0.5, opacity: 1 },
        { at: 0.84, opacity: 1 },
        { at: 0.94, y: -1, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
    {
      part: 'bulbRays',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.4, scale: 0.6, opacity: 0 },
        { at: 0.46, scale: 1.15, opacity: 1, ease: EASE.out },
        { at: 0.54, opacity: 0.5 },
        { at: 0.62, scale: 1.1, opacity: 1 },
        { at: 0.7, opacity: 0.6 },
        { at: 0.78, scale: 1.08, opacity: 1 },
        { at: 0.86, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
    {
      part: 'chipGlow',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.38, opacity: 0 },
        { at: 0.44, scale: 1.35, opacity: 1, ease: EASE.out },
        { at: 0.56, opacity: 0.85 },
        { at: 0.84, opacity: 0.85 },
        { at: 0.94, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
  ],
};

export { FLINT_IDEA };

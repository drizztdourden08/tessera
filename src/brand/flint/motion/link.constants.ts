/* @layer renderer-components @kind data */
import type { ScenePoint } from '../../brand.type';
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { routeFrames } from '../../motion/route-frames';
import { FLINT_LINK_ROUTE } from '../flint-link-route.constants';

const { chip, leftHand, overHead, downRight } = FLINT_LINK_ROUTE;
const back = (route: readonly ScenePoint[]): ScenePoint[] => [...route].reverse();
const off = ([x, y]: ScenePoint): Pick<MotionFrame, 'x' | 'y'> => ({ x: Number((x - chip[0]).toFixed(3)), y: Number((y - chip[1]).toFixed(3)) });

const spark: readonly MotionFrame[] = [
  { at: 0 },
  { at: 0.05, ...off(leftHand), scale: 0.3, ease: EASE.out },
  { at: 0.12, ...off(leftHand), opacity: 1 },
  ...routeFrames(overHead, chip, [0.16, 0.38]),
  { at: 0.41, scale: 1.4, opacity: 1 },
  ...routeFrames(downRight, chip, [0.44, 0.52]),
  ...routeFrames(back(downRight), chip, [0.6, 0.66]),
  { at: 0.68, scale: 1.4, opacity: 1 },
  ...routeFrames(back(overHead), chip, [0.7, 0.82]),
  { at: 0.86, ...off(leftHand), scale: 0.3 },
  { at: 1 },
];

const FLINT_LINK: MascotAnimation = {
  name: 'Link',
  summary: 'Links its hands through its chip: the left hand lifts a spark that leaps over the head into the orange chip, which flares, then drops into the raised right hand. The right hand throws it back the same way, faster, and the chip flares brightest as the left hand catches it, the eyes following the spark all the way.',
  duration: 2800,
  loop: false,
  tracks: [
    { part: 'spark', frames: spark },
    {
      part: 'chipGlow',
      frames: [
        { at: 0 },
        { at: 0.06, opacity: 0.35 },
        { at: 0.36, opacity: 0.35, ease: EASE.out },
        { at: 0.4, scale: 1.25, opacity: 1 },
        { at: 0.5, opacity: 0.45 },
        { at: 0.64, opacity: 0.45, ease: EASE.out },
        { at: 0.68, scale: 1.25, opacity: 1 },
        { at: 0.78, opacity: 0.5 },
        { at: 0.82, opacity: 0.5, ease: EASE.out },
        { at: 0.86, scale: 1.4, opacity: 1 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.04, scaleX: 1.03, scaleY: 0.97 },
        { at: 0.12 },
        { at: 0.36, ease: EASE.out },
        { at: 0.4, y: -0.8, scaleX: 0.98, scaleY: 1.03 },
        { at: 0.48 },
        { at: 0.64, ease: EASE.out },
        { at: 0.68, y: -0.6, scaleY: 1.02 },
        { at: 0.74 },
        { at: 0.82, ease: EASE.out },
        { at: 0.86, y: -1.5, scaleX: 0.97, scaleY: 1.04 },
        { at: 0.93, scaleX: 1.02, scaleY: 0.98 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.04, scaleX: 1.03 },
        { at: 0.12 },
        { at: 0.36, ease: EASE.out },
        { at: 0.4, scaleX: 0.97 },
        { at: 0.48 },
        { at: 0.64, ease: EASE.out },
        { at: 0.68, scaleX: 0.98 },
        { at: 0.74 },
        { at: 0.82, ease: EASE.out },
        { at: 0.86, scale: 0.9, opacity: 0.8 },
        { at: 0.93, scaleX: 1.02 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.02, ease: EASE.overshoot },
        { at: 0.12, y: -3, rotate: 20 },
        { at: 0.16, y: -3, rotate: 20, ease: EASE.out },
        { at: 0.2, y: -4, rotate: 28 },
        { at: 0.32 },
        { at: 0.64, ease: EASE.overshoot },
        { at: 0.76, y: -3, rotate: 20 },
        { at: 0.82, y: -3, rotate: 20, ease: EASE.out },
        { at: 0.86, y: -2, rotate: 32 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.34, ease: EASE.overshoot },
        { at: 0.44, y: -3, rotate: -20 },
        { at: 0.6, y: -3, rotate: -20, ease: EASE.out },
        { at: 0.62, y: -4, rotate: -28 },
        { at: 0.72 },
        { at: 0.82, ease: EASE.out },
        { at: 0.86, y: -2, rotate: -32 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.06, x: -2, y: 0.5 },
        { at: 0.16, x: -2, y: 0.5 },
        { at: 0.22, x: -2, y: -1 },
        { at: 0.28, y: -1 },
        { at: 0.36, x: 1.5, y: -1 },
        { at: 0.4, x: 2, y: -0.5, scale: 1.15 },
        { at: 0.46, x: 2, y: 0.5 },
        { at: 0.6, x: 2, y: 0.5 },
        { at: 0.66, x: 2, y: -1 },
        { at: 0.72, y: -1 },
        { at: 0.8, x: -2, y: 0.5 },
        { at: 0.84, scaleY: 0.35 },
        { at: 0.94, scaleY: 0.35 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.06, x: -1 },
        { at: 0.28 },
        { at: 0.36, x: 1 },
        { at: 0.6, x: 1 },
        { at: 0.72 },
        { at: 0.8, x: -1 },
        { at: 0.84, scaleX: 1.3, scaleY: 1.6 },
        { at: 0.94, scaleX: 1.3, scaleY: 1.6 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_LINK };

/* @layer renderer-components @kind data */
import type { ScenePoint } from '../../brand.type';
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { routeFrames } from '../../motion/route-frames';

const REST: ScenePoint = [17, 11];
const UP: readonly ScenePoint[] = [[4, 16], [6, 15], [7, 13], [8, 12], [9, 10], [10, 9], [11, 7], [12, 6], [13, 4], [14, 3], [15, 2], [16, 1], [17, 1]];
const DOWN: readonly ScenePoint[] = UP.map(([x, y]): ScenePoint => [34 - x, y]).reverse();
const [POD_LEFT = REST] = UP;
const TIP = DOWN[0] ?? REST;
const POD_RIGHT = DOWN.at(-1) ?? REST;

const off = ([x, y]: ScenePoint): Pick<MotionFrame, 'x' | 'y'> => ({ x: x - REST[0], y: y - REST[1] });

const spark: readonly MotionFrame[] = [
  { at: 0 },
  { at: 0.1, ...off(POD_LEFT) },
  ...routeFrames(UP, REST, [0.14, 0.42], EASE.linear),
  { at: 0.45, ...off(TIP), scale: 2, opacity: 1 },
  ...routeFrames(DOWN, REST, [0.5, 0.66], EASE.linear),
  { at: 0.69, ...off(POD_RIGHT) },
  { at: 1 },
];

const SENTRI_LINK: MascotAnimation = {
  name: 'Link',
  summary: 'Links its pods: the left pod pulses and sends out a spark of light that glides up the left edge to the tip, flashes there, and runs down the right edge into the right pod, which pulses as it lands. Then both pods lift and Sentri hops, the eyes following the spark all the way.',
  duration: 2800,
  loop: false,
  tracks: [
    { part: 'spark', frames: spark },
    {
      part: 'rig',
      frames: [
        { at: 0, ease: EASE.out },
        { at: 0.06, scaleX: 1.04, scaleY: 0.95 },
        { at: 0.14 },
        { at: 0.42, ease: EASE.out },
        { at: 0.46, y: -1, scaleY: 1.02 },
        { at: 0.54 },
        { at: 0.68, ease: EASE.out },
        { at: 0.72, scaleX: 1.06, scaleY: 0.92, ease: EASE.rise },
        { at: 0.8, y: -3, scaleX: 0.97, scaleY: 1.04, ease: EASE.fall },
        { at: 0.88, scaleX: 1.04, scaleY: 0.96, ease: EASE.out },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, ease: EASE.out },
        { at: 0.06, scaleX: 1.04 },
        { at: 0.14 },
        { at: 0.42, ease: EASE.out },
        { at: 0.46, scale: 0.95 },
        { at: 0.54 },
        { at: 0.68, ease: EASE.out },
        { at: 0.72, scaleX: 1.06, ease: EASE.rise },
        { at: 0.8, scale: 0.8, opacity: 0.7, ease: EASE.fall },
        { at: 0.88, scaleX: 1.04, ease: EASE.out },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, ease: EASE.out },
        { at: 0.06, rotate: 12 },
        { at: 0.08, rotate: 12, ease: EASE.overshoot },
        { at: 0.12, rotate: 6, scale: 1.3 },
        { at: 0.18 },
        { at: 0.7, ease: EASE.out },
        { at: 0.78, rotate: 35, scale: 1.15 },
        { at: 0.85, rotate: 25 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.64, ease: EASE.overshoot },
        { at: 0.68, rotate: -6, scale: 1.3 },
        { at: 0.72, ease: EASE.out },
        { at: 0.78, rotate: -35, scale: 1.15 },
        { at: 0.85, rotate: -25 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.04, ease: EASE.snap },
        { at: 0.08, x: -2, y: 1 },
        { at: 0.22, x: -2, y: 1, ease: EASE.snap },
        { at: 0.26, x: -1, y: -1 },
        { at: 0.36, x: -1, y: -1, ease: EASE.snap },
        { at: 0.4, y: -1 },
        { at: 0.52, y: -1, ease: EASE.snap },
        { at: 0.56, x: 1 },
        { at: 0.62, x: 1, ease: EASE.snap },
        { at: 0.66, x: 2, y: 1 },
        { at: 0.7, x: 2, y: 1, ease: EASE.snap },
        { at: 0.74, scaleY: 0.4 },
        { at: 0.9, scaleY: 0.4 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_LINK };

/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const START = 0.12;
const END = 0.5;
const STEPS = 32;

const round = (n: number): number => Number(n.toFixed(3));

const turn = (pick: (cos: number, sin: number) => Omit<MotionFrame, 'at'>): MotionFrame[] =>
  Array.from({ length: STEPS + 1 }, (_, i) => {
    const angle = (i * 4 * Math.PI) / STEPS;
    return { at: round(START + ((END - START) * i) / STEPS), ease: EASE.linear, ...pick(round(Math.cos(angle)), round(Math.sin(angle))) };
  });

const backness = (cos: number): number => round(Math.min(1, Math.max(0, 0.5 - cos * 2.5)));

const SENTRI_SPIN: MascotAnimation = {
  name: 'Spin',
  summary: 'Gets excited: crouches, lifts and spins round twice inside a ring of swooshes, its back turning to the front on each half turn, then bounces once and bursts into cyan and gold sparkles.',
  duration: 2200,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.06, scaleX: 1.08, scaleY: 0.92, ease: EASE.out },
        ...turn((cos, sin) => ({ y: -3, rotate: round(sin * 5), scaleX: cos })),
        { at: 0.56, y: -4, scaleX: 0.95, scaleY: 1.06, ease: EASE.fall },
        { at: 0.64, scaleX: 1.1, scaleY: 0.9, ease: EASE.out },
        { at: 0.74, scaleX: 0.98, scaleY: 1.02 },
        { at: 0.84 },
        { at: 1 },
      ],
    },
    { part: 'back', frames: [{ at: 0 }, ...turn((cos) => ({ opacity: backness(cos) })), { at: 1 }] },
    { part: 'eyes', frames: [{ at: 0 }, ...turn((cos) => ({ opacity: round(1 - backness(cos)) })), { at: 1 }] },
    { part: 'swirlFront', frames: [{ at: 0 }, { at: START, opacity: 0 }, ...turn((cos) => ({ x: round(cos), opacity: 0.9 })).slice(2, -2), { at: 0.54, opacity: 0 }, { at: 1 }] },
    { part: 'swirlBack', frames: [{ at: 0 }, { at: START, opacity: 0 }, ...turn((cos) => ({ x: round(-cos), opacity: 0.8 })).slice(2, -2), { at: 0.54, opacity: 0 }, { at: 1 }] },
    {
      part: 'podLeft',
      frames: [{ at: 0 }, { at: 0.06, rotate: -10 }, { at: 0.14, rotate: 32 }, { at: 0.5, rotate: 28 }, { at: 0.58, rotate: 45 }, { at: 0.66, rotate: 18 }, { at: 0.8, rotate: -4 }, { at: 0.9 }, { at: 1 }],
    },
    {
      part: 'podRight',
      frames: [{ at: 0 }, { at: 0.06, rotate: 10 }, { at: 0.14, rotate: -32 }, { at: 0.5, rotate: -28 }, { at: 0.58, rotate: -45 }, { at: 0.66, rotate: -18 }, { at: 0.8, rotate: 4 }, { at: 0.9 }, { at: 1 }],
    },
    {
      part: 'sparkCyan',
      frames: [{ at: 0 }, { at: 0.56, scale: 0.6, opacity: 0, ease: EASE.out }, { at: 0.62, opacity: 1 }, { at: 0.72, scale: 1.05, opacity: 1 }, { at: 0.8, scale: 1.1, opacity: 0 }, { at: 1 }],
    },
    {
      part: 'sparkGold',
      frames: [{ at: 0 }, { at: 0.66, scale: 0.6, opacity: 0, ease: EASE.out }, { at: 0.72, opacity: 1 }, { at: 0.86, scale: 1.05, opacity: 1 }, { at: 0.96, scale: 1.1, opacity: 0 }, { at: 1 }],
    },
  ],
};

export { SENTRI_SPIN };

/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const TURNS = [0.06, 0.12, 0.18, 0.24, 0.3, 0.36, 0.42, 0.48] as const;

const turn = (pick: (i: number) => Omit<MotionFrame, 'at'> | undefined): MotionFrame[] =>
  TURNS.flatMap((at, i) => [{ ...pick(i % 4), at }]);

const SENTRI_SPIN: MascotAnimation = {
  name: 'Spin',
  summary: 'Gets excited: spins round twice inside a ring of swooshes, showing its back on each half turn, then bounces once and bursts into cyan and gold sparkles.',
  duration: 2200,
  loop: false,
  tracks: [
    stepTrack('rig', [{ at: 0 }, ...turn((i) => [{ scaleX: 0.6, rotate: -6 }, { scaleX: -1 }, { scaleX: -0.6, rotate: 6 }, {}][i]), { at: 0.56, y: -3 }, { at: 0.64 }, { at: 1 }]),
    stepTrack('eyes', [{ at: 0 }, ...turn((i) => (i % 2 === 0 ? { opacity: 0 } : {})), { at: 1 }]),
    stepTrack('back', [{ at: 0 }, ...turn((i) => (i % 2 === 0 ? { opacity: 1 } : {})), { at: 1 }]),
    stepTrack('swirlBack', [{ at: 0 }, ...turn((i) => (i % 2 === 0 ? { opacity: 1 } : {})), { at: 0.54 }, { at: 1 }]),
    stepTrack('swirlFront', [{ at: 0 }, ...turn((i) => (i % 2 === 1 ? { opacity: 1 } : {})), { at: 0.54 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0 }, { at: 0.06, rotate: 30 }, { at: 0.48, rotate: 30 }, { at: 0.56, rotate: 45 }, { at: 0.64, rotate: 20 }, { at: 0.9 }, { at: 1 }]),
    stepTrack('podRight', [{ at: 0 }, { at: 0.06, rotate: -30 }, { at: 0.48, rotate: -30 }, { at: 0.56, rotate: -45 }, { at: 0.64, rotate: -20 }, { at: 0.9 }, { at: 1 }]),
    stepTrack('sparkCyan', [{ at: 0 }, { at: 0.56, opacity: 1 }, { at: 0.68 }, { at: 0.8, opacity: 1 }, { at: 0.9 }, { at: 1 }]),
    stepTrack('sparkGold', [{ at: 0 }, { at: 0.68, opacity: 1 }, { at: 0.8 }, { at: 0.9, opacity: 1 }, { at: 0.97 }, { at: 1 }]),
  ],
};

export { SENTRI_SPIN };

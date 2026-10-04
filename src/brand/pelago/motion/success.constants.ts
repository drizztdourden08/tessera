/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import { ringBeats } from '../ring-beats';

const burst = (inward: number): readonly MotionFrame[] => [
  { at: 0 },
  { at: 0.04, opacity: 0, scale: 0.3, x: inward, y: 6 },
  { at: 0.26, opacity: 0, scale: 0.3, x: inward, y: 6, ease: EASE.out },
  { at: 0.36, scale: 1.15, y: -1.6 },
  { at: 0.62, y: 0.4 },
  { at: 1 },
];

const PELAGO_SUCCESS: MascotAnimation = {
  name: 'Success',
  summary: 'Done and delighted: the eyes close into happy arches, the island leaps as its islets whirl once fast around it, confetti bursts out on both sides and drifts down, and the crystal glow flares.',
  duration: 2200,
  loop: false,
  still: ['lidsSmile', 'confettiLeft', 'confettiRight'],
  tracks: [
    { part: 'rig', frames: [{ at: 0 }, { at: 0.08, y: 1.2, ease: EASE.snap }, { at: 0.28, y: -6, ease: EASE.out }, { at: 0.46, y: -5.4, ease: EASE.in }, { at: 0.62, y: 0.6 }, { at: 0.7, y: -0.8 }, { at: 0.8 }, { at: 1 }] },
    { part: 'island', frames: [{ at: 0 }, { at: 0.08, scaleX: 1.06, scaleY: 0.94, ease: EASE.snap }, { at: 0.26, scaleX: 0.97, scaleY: 1.04 }, { at: 0.46 }, { at: 0.62, scaleX: 1.05, scaleY: 0.95 }, { at: 0.76 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.08, scaleX: 1.08 }, { at: 0.3, scale: 0.65, opacity: 0.55 }, { at: 0.46, scale: 0.7, opacity: 0.6 }, { at: 0.62, scaleX: 1.08 }, { at: 0.78 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.28, scale: 1.45 }, { at: 0.7, scale: 1.25 }, { at: 0.9 }, { at: 1 }] },
    ...isletTracks([{ at: 0 }, ...ringBeats(1, 0.12, 0.56), { at: 1 }]),
    { part: 'confettiLeft', frames: burst(5) },
    { part: 'confettiRight', frames: burst(-5) },
  ],
};

export { PELAGO_SUCCESS };

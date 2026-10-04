/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame, MotionTrack } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import { pebbleTracks } from '../pebble-tracks';
import { ringBeats } from '../ring-beats';

const TWINKLES = ['twinkleA', 'twinkleB', 'twinkleC'] as const;

const twinkle = (show: number): readonly MotionFrame[] => [
  { at: 0 },
  { at: 0.05, opacity: 0, scale: 0.3 },
  { at: show, opacity: 0, scale: 0.3, ease: EASE.overshoot },
  { at: show + 0.06, scale: 1.35 },
  { at: show + 0.12, scale: 0.9 },
  { at: show + 0.18, scale: 1.1 },
  { at: 1 },
];

const twinkles: readonly MotionTrack[] = TWINKLES.map((part, i) => ({ part, frames: twinkle(0.6 + i * 0.06) }));

const PELAGO_SPIN: MascotAnimation = {
  name: 'Spin',
  summary: 'Excited: the island rises and turns right round, its face going edge on and back, while the islets race twice around it on their threads; it lands with a squash, the glow flares and sparkles pop.',
  duration: 1600,
  loop: false,
  still: TWINKLES,
  tracks: [
    {
      part: 'rig',
      frames: [{ at: 0 }, { at: 0.08, y: 1, ease: EASE.snap }, { at: 0.2, y: -3.4 }, { at: 0.5, y: -3.4, ease: EASE.in }, { at: 0.62, y: 0.6, ease: EASE.out }, { at: 0.72, y: -0.6 }, { at: 0.84 }, { at: 1 }],
    },
    {
      part: 'island',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.05, scaleY: 0.95, ease: EASE.in },
        { at: 0.18, ease: EASE.linear },
        { at: 0.26, scaleX: 0.05, ease: EASE.linear },
        { at: 0.34, scaleX: -1, ease: EASE.linear },
        { at: 0.42, scaleX: 0.05, ease: EASE.linear },
        { at: 0.5, ease: EASE.out },
        { at: 0.62, scaleX: 1.06, scaleY: 0.94 },
        { at: 0.74 },
        { at: 1 },
      ],
    },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.2, scale: 0.78, opacity: 0.65 }, { at: 0.5, scale: 0.78, opacity: 0.65 }, { at: 0.62, scaleX: 1.08 }, { at: 0.76 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.2, scale: 1.2 }, { at: 0.62, scale: 1.45, ease: EASE.out }, { at: 0.84, scale: 1.15 }, { at: 1 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.08, scaleY: 0.4 }, { at: 0.18 }, { at: 0.62, scaleY: 0.35 }, { at: 0.84, scaleY: 0.35 }, { at: 1 }] },
    ...isletTracks([{ at: 0 }, ...ringBeats(2, 0.1, 0.62), { at: 1 }]),
    ...pebbleTracks((i) => [{ at: 0 }, { at: 0.12 + i * 0.04, ease: EASE.linear }, { at: 0.6, rotate: i % 2 ? -360 : 360 }, { at: 0.6 }, { at: 1 }]),
    ...twinkles,
  ],
};

export { PELAGO_SPIN };

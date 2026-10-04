/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';
import { pebbleTracks } from '../pebble-tracks';

const UP = { a: { x: -1.4, y: -3.4, rotate: -12 }, b: { x: 1.4, y: -3.4, rotate: 12 }, c: { x: 0.8, y: -1.2 }, d: { x: -0.8, y: -1.2 } } as const;
const HIGH = { a: { x: -1.8, y: -4.6, rotate: -18 }, b: { x: 1.8, y: -4.6, rotate: 18 }, c: { x: 1, y: -1.6 }, d: { x: -1, y: -1.6 } } as const;

const beat = (at: number, moves: IsletBeat['moves'], ease?: string): IsletBeat => ({ at, moves, ...(ease ? { ease } : {}) });

const PELAGO_ALERT_EXCLAIM: MascotAnimation = {
  name: 'Exclaim',
  summary: 'Raises the alarm: an exclamation mark springs up over the spire and jumps twice, the island stands tall with its islets thrown up like hands, the eyes stay wide and the crystal glow flashes with each jump.',
  duration: 1800,
  loop: true,
  still: ['exclaim'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, y: -1.6 }, { at: 0.08, y: -2.4, ease: EASE.out }, { at: 0.2, y: -1.6 }, { at: 0.52, y: -1.6 }, { at: 0.6, y: -2.4, ease: EASE.out }, { at: 0.72, y: -1.6 }, { at: 1, y: -1.6 }] },
    { part: 'island', frames: [{ at: 0, scaleX: 0.97, scaleY: 1.04 }, { at: 1, scaleX: 0.97, scaleY: 1.04 }] },
    { part: 'shadow', frames: [{ at: 0, scale: 0.88, opacity: 0.8 }, { at: 0.08, scale: 0.82 }, { at: 0.2, scale: 0.88, opacity: 0.8 }, { at: 0.6, scale: 0.82 }, { at: 0.72, scale: 0.88, opacity: 0.8 }, { at: 1, scale: 0.88, opacity: 0.8 }] },
    { part: 'glow', frames: [{ at: 0, scale: 1.1 }, { at: 0.08, scale: 1.5 }, { at: 0.22, scale: 1.1 }, { at: 0.52, scale: 1.1 }, { at: 0.6, scale: 1.5 }, { at: 0.74, scale: 1.1 }, { at: 1, scale: 1.1 }] },
    { part: 'eyes', frames: [{ at: 0, scale: 1.3 }, { at: 0.86, scale: 1.3, ease: EASE.in }, { at: 0.89, scaleX: 1.3, scaleY: 0.1, ease: EASE.out }, { at: 0.92, scale: 1.3 }, { at: 1, scale: 1.3 }] },
    {
      part: 'exclaim',
      frames: [
        { at: 0 },
        { at: 0.04, y: 0.6, scaleY: 0.8, ease: EASE.out },
        { at: 0.1, y: -1.4, scaleY: 1.15, rotate: -6 },
        { at: 0.2, rotate: 4 },
        { at: 0.28 },
        { at: 0.56, y: 0.6, scaleY: 0.8, ease: EASE.out },
        { at: 0.62, y: -1.4, scaleY: 1.15, rotate: 6 },
        { at: 0.72, rotate: -4 },
        { at: 0.8 },
        { at: 1 },
      ],
    },
    ...isletTracks([beat(0, UP), beat(0.08, HIGH, EASE.out), beat(0.22, UP), beat(0.52, UP), beat(0.6, HIGH, EASE.out), beat(0.74, UP), beat(1, UP)]),
    ...pebbleTracks((i) => [{ at: 0 }, { at: 0.1, y: -0.8 + i * 0.2 }, { at: 0.24 }, { at: 0.62, y: -0.8 + i * 0.2 }, { at: 0.76 }, { at: 1 }], 60),
  ],
};

export { PELAGO_ALERT_EXCLAIM };

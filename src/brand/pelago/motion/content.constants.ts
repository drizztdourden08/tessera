/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { isletEach } from '../islet-each';
import { isletTracks } from '../islet-tracks';

const SWAY = 0.9;

const PELAGO_CONTENT: MascotAnimation = {
  name: 'Content',
  summary: 'Pleased: the eyes close into soft smiling arches, the island sways slowly side to side as if humming, the islets swing gently a beat behind, and the crystal glows warm.',
  duration: 4800,
  loop: true,
  still: ['lidsSmile'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, rotate: -2.5 }, { at: 0.25, y: -0.8 }, { at: 0.5, rotate: 2.5 }, { at: 0.75, y: -0.8 }, { at: 1, rotate: -2.5 }] },
    { part: 'shadow', frames: [{ at: 0, x: -0.6 }, { at: 0.25, scale: 0.94 }, { at: 0.5, x: 0.6 }, { at: 0.75, scale: 0.94 }, { at: 1, x: -0.6 }] },
    { part: 'glow', frames: [{ at: 0, scale: 1.06 }, { at: 0.5, scale: 1.14 }, { at: 1, scale: 1.06 }] },
    ...isletTracks([
      { at: 0, moves: isletEach(() => ({ x: SWAY })) },
      { at: 0.25, moves: isletEach(() => ({ y: 0.5 })) },
      { at: 0.5, moves: isletEach(() => ({ x: -SWAY })) },
      { at: 0.75, moves: isletEach(() => ({ y: 0.5 })) },
      { at: 1, moves: isletEach(() => ({ x: SWAY })) },
    ], 300),
  ],
};

export { PELAGO_CONTENT };

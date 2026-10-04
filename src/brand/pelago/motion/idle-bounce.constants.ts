/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletEach } from '../islet-each';
import { isletTracks } from '../islet-tracks';
import { pebbleTracks } from '../pebble-tracks';

const LAND = 0.8;

const PELAGO_IDLE_BOUNCE: MascotAnimation = {
  name: 'Bounce',
  summary: 'A springy float: the island bounces lightly on the air and squashes a little each time it lands, the islets swing a beat behind on their threads, and the crystal glow brightens on every landing.',
  duration: 1100,
  loop: true,
  tracks: [
    { part: 'rig', frames: [{ at: 0, ease: EASE.out }, { at: 0.42, y: -2.8, ease: EASE.in }, { at: LAND, ease: EASE.snap }, { at: 0.88, y: 0.5 }, { at: 1 }] },
    { part: 'island', frames: [{ at: 0 }, { at: 0.3, scaleX: 0.98, scaleY: 1.03 }, { at: LAND, ease: EASE.snap }, { at: 0.88, scaleX: 1.06, scaleY: 0.93 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.42, scale: 0.84, opacity: 0.7 }, { at: LAND }, { at: 0.88, scaleX: 1.06 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0, scale: 1.08 }, { at: 0.42, scale: 0.96, opacity: 0.7 }, { at: LAND, ease: EASE.snap }, { at: 0.88, scale: 1.18 }, { at: 1, scale: 1.08 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.42, y: -0.3 }, { at: LAND }, { at: 0.88, scaleY: 0.7 }, { at: 1 }] },
    ...isletTracks([
      { at: 0 },
      { at: 0.42, moves: isletEach(() => ({ y: 1.1 })) },
      { at: LAND, moves: isletEach((_id, i) => ({ y: -0.7 - 0.1 * i })) },
      { at: 1 },
    ], 90),
    ...pebbleTracks((i) => [{ at: 0 }, { at: 0.42, y: 0.8 + 0.2 * i }, { at: 0.86, y: -0.4 }, { at: 1 }], 120),
  ],
};

export { PELAGO_IDLE_BOUNCE };

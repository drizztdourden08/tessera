/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletEach } from '../islet-each';
import { isletTracks } from '../islet-tracks';

const PELAGO_DEFAULT: MascotAnimation = {
  name: 'Default',
  summary: 'The plain face: Pelago hovers calmly in place, its islets resting on their threads and rising with it, the crystal glow steady, and the eyes looking straight out with a single slow blink.',
  duration: 4000,
  loop: true,
  tracks: [
    { part: 'rig', frames: [{ at: 0 }, { at: 0.5, y: -0.7 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.5, scale: 0.95, opacity: 0.85 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0, opacity: 0.85 }, { at: 0.5, scale: 1.04 }, { at: 1, opacity: 0.85 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.66, ease: EASE.in }, { at: 0.69, y: 0.2, scaleY: 0.1, ease: EASE.out }, { at: 0.73 }, { at: 1 }] },
    ...isletTracks([{ at: 0 }, { at: 0.5, moves: isletEach(() => ({ y: -0.5 })) }, { at: 1 }], 200),
  ],
};

export { PELAGO_DEFAULT };

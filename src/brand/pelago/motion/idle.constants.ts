/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletOutward } from '../islet-outward';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat, IsletId, IsletMove } from '../pelago.type';
import { PELAGO_ISLETS } from '../pelago-islets.constants';

const ALONG = 1.3;
const FLOAT = 0.5;

const orbitMove = (id: IsletId, step: number): IsletMove => {
  const phase = ((step + PELAGO_ISLETS.indexOf(id)) * Math.PI) / 2;
  const [ox, oy] = isletOutward(id);
  const along = Math.sin(phase) * ALONG;
  const float = Math.cos(phase) * FLOAT;
  return { x: Number((-oy * along).toFixed(3)), y: Number((ox * along - float).toFixed(3)) };
};

const ORBIT: readonly IsletBeat[] = [0, 1, 2, 3, 4].map((step) => ({
  at: step / 4,
  moves: Object.fromEntries(PELAGO_ISLETS.map((id) => [id, orbitMove(id, step)])),
}));

const PELAGO_IDLE: MascotAnimation = {
  name: 'Idle',
  summary: 'Floats and breathes: the island bobs, the islets drift slowly to and fro along the ring with their threads, the crystal glow swells and fades, and the eyes blink now and then.',
  duration: 7200,
  loop: true,
  tracks: [
    { part: 'rig', frames: [{ at: 0 }, { at: 0.25, y: -1.2 }, { at: 0.5 }, { at: 0.75, y: -1.2 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.25, scale: 0.9, opacity: 0.75 }, { at: 0.5 }, { at: 0.75, scale: 0.9, opacity: 0.75 }, { at: 1 }] },
    {
      part: 'glow',
      frames: [
        { at: 0, scale: 0.96, opacity: 0.65 },
        { at: 0.25, scale: 1.05 },
        { at: 0.5, scale: 0.96, opacity: 0.65 },
        { at: 0.75, scale: 1.05 },
        { at: 1, scale: 0.96, opacity: 0.65 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.44, ease: EASE.in },
        { at: 0.46, scaleY: 0.1, ease: EASE.out },
        { at: 0.48 },
        { at: 0.6, ease: EASE.snap },
        { at: 0.64, x: 0.8, y: 0.2 },
        { at: 0.8, x: 0.8, y: 0.2, ease: EASE.snap },
        { at: 0.84 },
        { at: 0.92, ease: EASE.in },
        { at: 0.94, scaleY: 0.1, ease: EASE.out },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    ...isletTracks(ORBIT),
  ],
};

export { PELAGO_IDLE };

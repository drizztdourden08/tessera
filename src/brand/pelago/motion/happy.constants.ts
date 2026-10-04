/* @layer renderer-components @kind data */
import type { ScenePoint } from '../../brand.type';
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';
import { PELAGO_ISLETS } from '../pelago-islets.constants';
import { PELAGO_RIG } from '../pelago-rig.constants';

const LOOP: readonly ScenePoint[] = [[10, 13.4], [29, 5], [48, 15.4], [54, 25.5], [47.4, 35.6], [29, 44], [10.6, 35], [4, 24]];
const START = 0.1;
const SPAN = 0.6;

const loopBeat = (step: number): IsletBeat => ({
  at: Number((START + (step * SPAN) / LOOP.length).toFixed(3)),
  ease: step === 0 ? EASE.in : EASE.linear,
  moves: Object.fromEntries(PELAGO_ISLETS.map((id, i) => {
    const [x, y] = LOOP[(2 * i + step) % LOOP.length] ?? PELAGO_RIG.islets[id].node;
    const [nx, ny] = PELAGO_RIG.islets[id].node;
    return [id, { x: Number((x - nx).toFixed(3)), y: Number((y - ny).toFixed(3)) }];
  })),
});

const STEPS = Array.from({ length: LOOP.length }, (_, step) => loopBeat(step));

const PELAGO_HAPPY: MascotAnimation = {
  name: 'Happy',
  summary: 'Delighted: the island bounces, its glow swells bright, the eyes squint into a smile, and the islets loop once around it, threads and all.',
  duration: 1800,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.08, y: 1.2, ease: EASE.snap },
        { at: 0.28, y: -5, ease: EASE.out },
        { at: 0.5, y: -4.4, ease: EASE.in },
        { at: 0.66, y: 0.6 },
        { at: 0.76, y: -1 },
        { at: 0.88 },
        { at: 1 },
      ],
    },
    { part: 'island', frames: [{ at: 0 }, { at: 0.08, scaleX: 1.06, scaleY: 0.94 }, { at: 0.26, scaleX: 0.97, scaleY: 1.04 }, { at: 0.5 }, { at: 0.66, scaleX: 1.05, scaleY: 0.95 }, { at: 0.8 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.28, scale: 0.7, opacity: 0.6 }, { at: 0.5, scale: 0.74, opacity: 0.65 }, { at: 0.66 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.16, scale: 1.25 }, { at: 0.7, scale: 1.3 }, { at: 0.9 }, { at: 1 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.08, scaleY: 0.35 }, { at: 0.8, scaleY: 0.35 }, { at: 0.9 }, { at: 1 }] },
    ...isletTracks([{ at: 0 }, ...STEPS, { ...loopBeat(LOOP.length), ease: EASE.out }, { at: 1 }]),
  ],
};

export { PELAGO_HAPPY };

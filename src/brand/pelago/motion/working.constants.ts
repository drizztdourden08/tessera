/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';

const READ = { x: -1.2, y: 0.9 } as const;
const HANDS = { d: { x: 2.4, y: -6.2 }, c: { x: -22.6, y: -1.8, rotate: -10 } } as const;

const tap = (at: number, left: boolean): IsletBeat => ({
  at,
  ease: EASE.out,
  moves: { ...HANDS, ...(left ? { d: { x: 2.4, y: -4.8 } } : { c: { x: -22.6, y: -0.5, rotate: -4 } }) },
});

const taps: readonly IsletBeat[] = Array.from({ length: 8 }, (_, i) => tap(0.0625 + i * 0.125, i % 2 === 0));

const PELAGO_WORKING: MascotAnimation = {
  name: 'Working',
  summary: 'Busy at a laptop: Pelago leans over the open laptop in front of it, its eyes read along the screen and blink, the two lower islets tap away at the keys in turn, and the screen light flickers on the crystal.',
  duration: 2000,
  loop: true,
  still: ['laptop'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, x: -0.6, y: 0.8, rotate: -3 }, { at: 0.5, x: -0.6, y: 0.4, rotate: -3 }, { at: 1, x: -0.6, y: 0.8, rotate: -3 }] },
    { part: 'shadow', frames: [{ at: 0, x: -0.5 }, { at: 1, x: -0.5 }] },
    { part: 'glow', frames: [{ at: 0, scale: 1.05 }, { at: 0.3, scale: 1.12, opacity: 0.85 }, { at: 0.45, scale: 1.05 }, { at: 0.75, scale: 1.12, opacity: 0.85 }, { at: 1, scale: 1.05 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0, ...READ },
        { at: 0.4, x: 0.2, y: 0.9, ease: EASE.snap },
        { at: 0.46, ...READ },
        { at: 0.86, x: 0.2, y: 0.9, ease: EASE.in },
        { at: 0.89, x: 0.2, y: 0.9, scaleY: 0.1, ease: EASE.out },
        { at: 0.93, ...READ },
        { at: 1, ...READ },
      ],
    },
    ...isletTracks([{ at: 0, moves: HANDS }, ...taps, { at: 1, moves: HANDS }]),
  ],
};

export { PELAGO_WORKING };

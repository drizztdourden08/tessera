/* @layer renderer-components @kind data */
import type { MascotClip } from '../motion/mascot-clip.type';
import type { MascotMotion } from '../motion/motion.type';
import { FLINT_ALERT } from './motion/alert.constants';
import { FLINT_BLINK } from './motion/blink.constants';
import { FLINT_HAPPY } from './motion/happy.constants';
import { FLINT_IDLE } from './motion/idle.constants';
import { FLINT_JUMP } from './motion/jump.constants';
import { FLINT_LINK } from './motion/link.constants';
import { FLINT_MOVE } from './motion/move.constants';
import { FLINT_POINT } from './motion/point.constants';
import { FLINT_SCAN } from './motion/scan.constants';
import { FLINT_WAVE } from './motion/wave.constants';
import { FLINT_EFFECTS } from './flint-effects.constants';
import { FLINT_SHADOW } from './flint-shadow.constants';

const FLINT_MOTION: MascotMotion<MascotClip> = {
  stage: { top: 12, right: 4, bottom: 3, left: 4 },
  pivot: [20.25, 27.75],
  parts: [
    { id: 'handLeft', node: 'Left hand', pivot: [6.85, 21.75] },
    { id: 'handRight', node: 'Right hand', pivot: [33.65, 21.75] },
    { id: 'eyes', node: 'Eyes', pivot: [20.25, 12.15] },
    { id: 'mouth', node: 'Mouth', pivot: [20.25, 17.7] },
  ],
  shadow: { piece: FLINT_SHADOW, at: [4.25, 26.25] },
  effects: [
    { id: 'chipGlow', piece: FLINT_EFFECTS.chipGlow, at: [23.5, 0] },
    { id: 'spark', piece: FLINT_EFFECTS.spark, at: [26.1, 2] },
  ],
  rest: 'idle',
  animations: {
    idle: FLINT_IDLE,
    move: FLINT_MOVE,
    jump: FLINT_JUMP,
    wave: FLINT_WAVE,
    scan: FLINT_SCAN,
    happy: FLINT_HAPPY,
    alert: FLINT_ALERT,
    point: FLINT_POINT,
    blink: FLINT_BLINK,
    link: FLINT_LINK,
  },
};

export { FLINT_MOTION };

/* @layer renderer-components @kind data */
import type { MascotMotion } from '../motion/motion.type';
import { FLINT_ALERT } from './motion/alert.constants';
import { FLINT_BLINK } from './motion/blink.constants';
import { FLINT_HAPPY } from './motion/happy.constants';
import { FLINT_IDLE } from './motion/idle.constants';
import { FLINT_JUMP } from './motion/jump.constants';
import { FLINT_MOVE } from './motion/move.constants';
import { FLINT_POINT } from './motion/point.constants';
import { FLINT_SCAN } from './motion/scan.constants';
import { FLINT_WAVE } from './motion/wave.constants';
import type { FlintAnimation } from './flint-motion.type';
import { FLINT_SHADOW } from './flint-shadow.constants';

const FLINT_MOTION: MascotMotion<FlintAnimation> = {
  stage: { top: 12, right: 4, bottom: 3, left: 4 },
  pivot: [20.25, 27.75],
  parts: [
    { id: 'handLeft', node: 'Left hand', pivot: [6.85, 21.75] },
    { id: 'handRight', node: 'Right hand', pivot: [33.65, 21.75] },
    { id: 'eyes', node: 'Eyes', pivot: [20.25, 12.15] },
    { id: 'mouth', node: 'Mouth', pivot: [20.25, 17.7] },
  ],
  shadow: { piece: FLINT_SHADOW, at: [4.25, 26.25] },
  rest: 'idle',
  animations: {
    idle: FLINT_IDLE,
    blink: FLINT_BLINK,
    scan: FLINT_SCAN,
    wave: FLINT_WAVE,
    point: FLINT_POINT,
    move: FLINT_MOVE,
    jump: FLINT_JUMP,
    happy: FLINT_HAPPY,
    alert: FLINT_ALERT,
  },
};

export { FLINT_MOTION };

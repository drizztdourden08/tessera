/* @layer renderer-components @kind data */
import type { MascotMotion } from '../motion/motion.type';
import { PELAGO_ALERT } from './motion/alert.constants';
import { PELAGO_DRIFT } from './motion/drift.constants';
import { PELAGO_HAPPY } from './motion/happy.constants';
import { PELAGO_IDLE } from './motion/idle.constants';
import { PELAGO_JUMP } from './motion/jump.constants';
import { PELAGO_MOVE } from './motion/move.constants';
import { PELAGO_SCAN } from './motion/scan.constants';
import { PELAGO_WAVE } from './motion/wave.constants';
import type { PelagoAnimation } from './pelago-motion.type';
import { PELAGO_SHADOW } from './pelago-shadow.constants';

const PELAGO_MOTION: MascotMotion<PelagoAnimation> = {
  stage: { top: 10, right: 3, bottom: 7, left: 3 },
  pivot: [26, 39],
  parts: [
    { id: 'body', node: 'Body', pivot: [26, 39] },
    { id: 'sphereTop', node: 'Top sphere', pivot: [27, 19] },
    { id: 'sphereTop', node: 'Top glint', pivot: [27, 19] },
    { id: 'sphereLeft', node: 'Left sphere', pivot: [17.5, 28] },
    { id: 'sphereLeft', node: 'Left glint', pivot: [17.5, 28] },
    { id: 'sphereRight', node: 'Right sphere', pivot: [33.5, 30] },
    { id: 'sphereRight', node: 'Right glint', pivot: [33.5, 30] },
    { id: 'handLeft', node: 'Left hand', pivot: [14, 28] },
    { id: 'handRight', node: 'Right hand', pivot: [38, 28] },
    { id: 'eyes', node: 'Eyes', pivot: [26, 5.5] },
  ],
  shadow: { piece: PELAGO_SHADOW, at: [11, 41] },
  rest: 'idle',
  animations: {
    idle: PELAGO_IDLE,
    move: PELAGO_MOVE,
    jump: PELAGO_JUMP,
    wave: PELAGO_WAVE,
    scan: PELAGO_SCAN,
    happy: PELAGO_HAPPY,
    alert: PELAGO_ALERT,
  },
  ambient: PELAGO_DRIFT,
};

export { PELAGO_MOTION };

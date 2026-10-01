/* @layer renderer-components @kind data */
import type { MascotMotion } from '../motion/motion.type';
import { SENTRI_ALERT } from './motion/alert.constants';
import { SENTRI_HAPPY } from './motion/happy.constants';
import { SENTRI_IDLE } from './motion/idle.constants';
import { SENTRI_JUMP } from './motion/jump.constants';
import { SENTRI_MOVE } from './motion/move.constants';
import { SENTRI_SCAN } from './motion/scan.constants';
import { SENTRI_WAVE } from './motion/wave.constants';
import type { SentriAnimation } from './sentri-motion.type';
import { SENTRI_SHADOW } from './sentri-shadow.constants';

const SENTRI_MOTION: MascotMotion<SentriAnimation> = {
  stage: { top: 12, right: 4, bottom: 3, left: 4 },
  pivot: [17.5, 23],
  parts: [
    { id: 'podLeft', node: 'Left pod', pivot: [5, 15.5] },
    { id: 'podRight', node: 'Right pod', pivot: [29, 15.5] },
    { id: 'eyes', node: 'Eyes', pivot: [17, 14.5] },
  ],
  shadow: { piece: SENTRI_SHADOW, at: [5, 23] },
  rest: 'idle',
  animations: {
    idle: SENTRI_IDLE,
    move: SENTRI_MOVE,
    jump: SENTRI_JUMP,
    wave: SENTRI_WAVE,
    scan: SENTRI_SCAN,
    happy: SENTRI_HAPPY,
    alert: SENTRI_ALERT,
  },
};

export { SENTRI_MOTION };

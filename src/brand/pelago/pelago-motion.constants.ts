/* @layer renderer-components @kind data */
import type { MascotClip } from '../motion/mascot-clip.type';
import type { MascotMotion } from '../motion/motion.type';
import { PELAGO_ALERT } from './motion/alert.constants';
import { PELAGO_BLINK } from './motion/blink.constants';
import { PELAGO_DRIFT } from './motion/drift.constants';
import { PELAGO_HAPPY } from './motion/happy.constants';
import { PELAGO_IDLE } from './motion/idle.constants';
import { PELAGO_JUMP } from './motion/jump.constants';
import { PELAGO_LINK } from './motion/link.constants';
import { PELAGO_MOVE } from './motion/move.constants';
import { PELAGO_POINT } from './motion/point.constants';
import { PELAGO_SCAN } from './motion/scan.constants';
import { PELAGO_WAVE } from './motion/wave.constants';
import { PELAGO_PARTS } from './pelago-parts.constants';
import { PELAGO_SHADOW } from './pelago-shadow.constants';

const PELAGO_MOTION: MascotMotion<MascotClip> = {
  stage: { top: 11, right: 7, bottom: 2, left: 7 },
  pivot: [29, 30],
  parts: PELAGO_PARTS,
  shadow: { piece: PELAGO_SHADOW, at: [14, 45] },
  rest: 'idle',
  animations: {
    idle: PELAGO_IDLE,
    move: PELAGO_MOVE,
    jump: PELAGO_JUMP,
    wave: PELAGO_WAVE,
    scan: PELAGO_SCAN,
    happy: PELAGO_HAPPY,
    alert: PELAGO_ALERT,
    point: PELAGO_POINT,
    blink: PELAGO_BLINK,
    link: PELAGO_LINK,
  },
  ambient: PELAGO_DRIFT,
};

export { PELAGO_MOTION };

/* @layer renderer-components @kind data */
import type { MascotClip } from '../motion/mascot-clip.type';
import type { MascotMotion } from '../motion/motion.type';
import { PELAGO_ALERT } from './motion/alert.constants';
import { PELAGO_ALERT_EXCLAIM } from './motion/alert-exclaim.constants';
import { PELAGO_BLINK } from './motion/blink.constants';
import { PELAGO_CONFUSED } from './motion/confused.constants';
import { PELAGO_CONTENT } from './motion/content.constants';
import { PELAGO_CURIOUS } from './motion/curious.constants';
import { PELAGO_DEFAULT } from './motion/default.constants';
import { PELAGO_DRIFT } from './motion/drift.constants';
import { PELAGO_FOCUSED } from './motion/focused.constants';
import { PELAGO_HAPPY } from './motion/happy.constants';
import { PELAGO_HAPPY_GRIN } from './motion/happy-grin.constants';
import { PELAGO_IDEA } from './motion/idea.constants';
import { PELAGO_IDLE } from './motion/idle.constants';
import { PELAGO_IDLE_BOUNCE } from './motion/idle-bounce.constants';
import { PELAGO_JUMP } from './motion/jump.constants';
import { PELAGO_JUMP_HOP } from './motion/jump-hop.constants';
import { PELAGO_LINK } from './motion/link.constants';
import { PELAGO_LOVE } from './motion/love.constants';
import { PELAGO_LOW_POWER } from './motion/low-power.constants';
import { PELAGO_MOVE } from './motion/move.constants';
import { PELAGO_MOVE_WOBBLE } from './motion/move-wobble.constants';
import { PELAGO_POINT } from './motion/point.constants';
import { PELAGO_RESTING } from './motion/resting.constants';
import { PELAGO_SCAN } from './motion/scan.constants';
import { PELAGO_SLEEP } from './motion/sleep.constants';
import { PELAGO_SPIN } from './motion/spin.constants';
import { PELAGO_SUCCESS } from './motion/success.constants';
import { PELAGO_WAVE } from './motion/wave.constants';
import { PELAGO_WORKING } from './motion/working.constants';
import { PELAGO_WORRIED } from './motion/worried.constants';
import { PELAGO_EFFECTS } from './pelago-effects.constants';
import { PELAGO_PARTS } from './pelago-parts.constants';
import { PELAGO_SHADOW } from './pelago-shadow.constants';

const PELAGO_MOTION: MascotMotion<MascotClip> = {
  stage: { top: 11, right: 7, bottom: 2, left: 7 },
  pivot: [29, 30],
  parts: PELAGO_PARTS,
  shadow: { piece: PELAGO_SHADOW, at: [14, 45] },
  effects: PELAGO_EFFECTS,
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
    'idle-bounce': PELAGO_IDLE_BOUNCE,
    'move-wobble': PELAGO_MOVE_WOBBLE,
    'jump-hop': PELAGO_JUMP_HOP,
    spin: PELAGO_SPIN,
    'happy-grin': PELAGO_HAPPY_GRIN,
    'alert-exclaim': PELAGO_ALERT_EXCLAIM,
    default: PELAGO_DEFAULT,
    content: PELAGO_CONTENT,
    curious: PELAGO_CURIOUS,
    focused: PELAGO_FOCUSED,
    sleep: PELAGO_SLEEP,
    love: PELAGO_LOVE,
    working: PELAGO_WORKING,
    idea: PELAGO_IDEA,
    success: PELAGO_SUCCESS,
    confused: PELAGO_CONFUSED,
    worried: PELAGO_WORRIED,
    'low-power': PELAGO_LOW_POWER,
    resting: PELAGO_RESTING,
  },
  ambient: PELAGO_DRIFT,
};

export { PELAGO_MOTION };

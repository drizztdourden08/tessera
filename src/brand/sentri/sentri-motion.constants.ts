/* @layer renderer-components @kind data */
import type { MascotClip } from '../motion/mascot-clip.type';
import type { MascotMotion } from '../motion/motion.type';
import { SENTRI_ALERT_EXCLAIM } from './motion/alert-exclaim.constants';
import { SENTRI_ALERT } from './motion/alert.constants';
import { SENTRI_BLINK } from './motion/blink.constants';
import { SENTRI_CONFUSED } from './motion/confused.constants';
import { SENTRI_CONTENT } from './motion/content.constants';
import { SENTRI_CURIOUS } from './motion/curious.constants';
import { SENTRI_DEFAULT } from './motion/default.constants';
import { SENTRI_FOCUSED } from './motion/focused.constants';
import { SENTRI_HAPPY_GRIN } from './motion/happy-grin.constants';
import { SENTRI_HAPPY } from './motion/happy.constants';
import { SENTRI_IDEA } from './motion/idea.constants';
import { SENTRI_IDLE_BOUNCE } from './motion/idle-bounce.constants';
import { SENTRI_IDLE } from './motion/idle.constants';
import { SENTRI_JUMP_HOP } from './motion/jump-hop.constants';
import { SENTRI_JUMP } from './motion/jump.constants';
import { SENTRI_LINK } from './motion/link.constants';
import { SENTRI_LOVE } from './motion/love.constants';
import { SENTRI_LOW_POWER } from './motion/low-power.constants';
import { SENTRI_MOVE_WOBBLE } from './motion/move-wobble.constants';
import { SENTRI_MOVE } from './motion/move.constants';
import { SENTRI_POINT } from './motion/point.constants';
import { SENTRI_RESTING } from './motion/resting.constants';
import { SENTRI_SCAN } from './motion/scan.constants';
import { SENTRI_SLEEP } from './motion/sleep.constants';
import { SENTRI_SPIN } from './motion/spin.constants';
import { SENTRI_SUCCESS } from './motion/success.constants';
import { SENTRI_WAVE } from './motion/wave.constants';
import { SENTRI_WORKING } from './motion/working.constants';
import { SENTRI_WORRIED } from './motion/worried.constants';
import { SENTRI_SHADOW } from './sentri-shadow.constants';
import { SENTRI_EFFECTS } from './sentri-effects.constants';

const SENTRI_MOTION: MascotMotion<MascotClip> = {
  stage: { top: 12, right: 4, bottom: 3, left: 4 },
  pivot: [17.5, 23],
  parts: [
    { id: 'podLeft', node: 'Left pod', pivot: [5, 15.5] },
    { id: 'podRight', node: 'Right pod', pivot: [29, 15.5] },
    { id: 'eyes', node: 'Eyes', pivot: [17, 14.5] },
  ],
  shadow: { piece: SENTRI_SHADOW, at: [5, 23] },
  effects: SENTRI_EFFECTS,
  rest: 'idle',
  animations: {
    idle: SENTRI_IDLE,
    move: SENTRI_MOVE,
    jump: SENTRI_JUMP,
    wave: SENTRI_WAVE,
    scan: SENTRI_SCAN,
    happy: SENTRI_HAPPY,
    alert: SENTRI_ALERT,
    point: SENTRI_POINT,
    blink: SENTRI_BLINK,
    link: SENTRI_LINK,
    'idle-bounce': SENTRI_IDLE_BOUNCE,
    'move-wobble': SENTRI_MOVE_WOBBLE,
    'jump-hop': SENTRI_JUMP_HOP,
    spin: SENTRI_SPIN,
    'happy-grin': SENTRI_HAPPY_GRIN,
    'alert-exclaim': SENTRI_ALERT_EXCLAIM,
    default: SENTRI_DEFAULT,
    content: SENTRI_CONTENT,
    curious: SENTRI_CURIOUS,
    focused: SENTRI_FOCUSED,
    sleep: SENTRI_SLEEP,
    love: SENTRI_LOVE,
    working: SENTRI_WORKING,
    idea: SENTRI_IDEA,
    success: SENTRI_SUCCESS,
    confused: SENTRI_CONFUSED,
    worried: SENTRI_WORRIED,
    'low-power': SENTRI_LOW_POWER,
    resting: SENTRI_RESTING,
  },
};

export { SENTRI_MOTION };

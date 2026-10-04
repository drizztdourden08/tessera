/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import type { MascotClip } from '../motion/mascot-clip.type';
import type { MascotMotion } from '../motion/motion.type';
import { FLINT_ALERT_EXCLAIM } from './motion/alert-exclaim.constants';
import { FLINT_ALERT } from './motion/alert.constants';
import { FLINT_BLINK } from './motion/blink.constants';
import { FLINT_CONFUSED } from './motion/confused.constants';
import { FLINT_CONTENT } from './motion/content.constants';
import { FLINT_CURIOUS } from './motion/curious.constants';
import { FLINT_DEFAULT } from './motion/default.constants';
import { FLINT_FOCUSED } from './motion/focused.constants';
import { FLINT_HAPPY_GRIN } from './motion/happy-grin.constants';
import { FLINT_HAPPY } from './motion/happy.constants';
import { FLINT_IDEA } from './motion/idea.constants';
import { FLINT_IDLE_BOUNCE } from './motion/idle-bounce.constants';
import { FLINT_IDLE } from './motion/idle.constants';
import { FLINT_JUMP_HOP } from './motion/jump-hop.constants';
import { FLINT_JUMP } from './motion/jump.constants';
import { FLINT_LINK } from './motion/link.constants';
import { FLINT_LOVE } from './motion/love.constants';
import { FLINT_LOW_POWER } from './motion/low-power.constants';
import { FLINT_MOVE_WOBBLE } from './motion/move-wobble.constants';
import { FLINT_MOVE } from './motion/move.constants';
import { FLINT_POINT } from './motion/point.constants';
import { FLINT_RESTING } from './motion/resting.constants';
import { FLINT_SCAN } from './motion/scan.constants';
import { FLINT_SLEEP } from './motion/sleep.constants';
import { FLINT_SPIN } from './motion/spin.constants';
import { FLINT_SUCCESS } from './motion/success.constants';
import { FLINT_WAVE } from './motion/wave.constants';
import { FLINT_WORKING } from './motion/working.constants';
import { FLINT_WORRIED } from './motion/worried.constants';
import { FLINT_EFFECTS } from './flint-effects.constants';
import { FLINT_FACE_EFFECTS } from './flint-face-effects.constants';
import { FLINT_PROPS } from './flint-props.constants';
import { FLINT_SHADOW } from './flint-shadow.constants';
import { FLINT_SYMBOLS } from './flint-symbols.constants';

const FACE: ScenePoint = [14.75, 9.65];
const BROWS: ScenePoint = [14.75, 7.4];

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
    { id: 'chipDim', piece: FLINT_EFFECTS.chipDim, at: [25.3, 1.65] },
    { id: 'eyesHappy', piece: FLINT_FACE_EFFECTS.eyesHappy, at: FACE },
    { id: 'eyesShut', piece: FLINT_FACE_EFFECTS.eyesShut, at: FACE },
    { id: 'eyesFlat', piece: FLINT_FACE_EFFECTS.eyesFlat, at: FACE },
    { id: 'lids', piece: FLINT_FACE_EFFECTS.lids, at: FACE },
    { id: 'browsFocused', piece: FLINT_FACE_EFFECTS.browsFocused, at: BROWS },
    { id: 'browsWorried', piece: FLINT_FACE_EFFECTS.browsWorried, at: BROWS },
    { id: 'blush', piece: FLINT_FACE_EFFECTS.blush, at: [12.6, 14.3] },
    { id: 'sweatLeft', piece: FLINT_FACE_EFFECTS.sweat, at: [6, 1.8] },
    { id: 'sweatRight', piece: FLINT_FACE_EFFECTS.sweat, at: [31.6, 1.8] },
    { id: 'laptop', piece: FLINT_PROPS.laptop, at: [9.5, 17.8], fixed: true },
    { id: 'question', piece: FLINT_SYMBOLS.question, at: [17.35, -10.1], fixed: true },
    { id: 'exclaim', piece: FLINT_SYMBOLS.exclaim, at: [18.55, -10.35], fixed: true },
    { id: 'heart', piece: FLINT_SYMBOLS.heart, at: [16.05, -9.4], fixed: true },
    { id: 'zSmall', piece: FLINT_SYMBOLS.zSmall, at: [29.8, -2.4], fixed: true },
    { id: 'zMid', piece: FLINT_SYMBOLS.zMid, at: [32.6, -6.4], fixed: true },
    { id: 'zBig', piece: FLINT_SYMBOLS.zBig, at: [36.2, -10.2], fixed: true },
    { id: 'bulbRays', piece: FLINT_SYMBOLS.bulbRays, at: [14.75, -12.8], fixed: true },
    { id: 'bulb', piece: FLINT_SYMBOLS.bulb, at: [16.75, -10.6], fixed: true },
    { id: 'battery', piece: FLINT_SYMBOLS.battery, at: [14.75, -8.6], fixed: true },
    { id: 'confetti', piece: FLINT_PROPS.confetti, at: [-1.25, -12], fixed: true },
    { id: 'swoosh', piece: FLINT_PROPS.swoosh, at: [-1.75, -12.25], fixed: true },
    { id: 'twinkles', piece: FLINT_PROPS.twinkles, at: [-0.5, -11], fixed: true },
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
    'idle-bounce': FLINT_IDLE_BOUNCE,
    'move-wobble': FLINT_MOVE_WOBBLE,
    'jump-hop': FLINT_JUMP_HOP,
    spin: FLINT_SPIN,
    'happy-grin': FLINT_HAPPY_GRIN,
    'alert-exclaim': FLINT_ALERT_EXCLAIM,
    default: FLINT_DEFAULT,
    content: FLINT_CONTENT,
    curious: FLINT_CURIOUS,
    focused: FLINT_FOCUSED,
    sleep: FLINT_SLEEP,
    love: FLINT_LOVE,
    working: FLINT_WORKING,
    idea: FLINT_IDEA,
    success: FLINT_SUCCESS,
    confused: FLINT_CONFUSED,
    worried: FLINT_WORRIED,
    'low-power': FLINT_LOW_POWER,
    resting: FLINT_RESTING,
  },
};

export { FLINT_MOTION };

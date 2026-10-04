/* @layer renderer-components @kind data */
import type { MotionEffect } from '../motion/motion.type';
import { SENTRI_FACES } from './sentri-faces.constants';
import { SENTRI_FLOURISHES } from './sentri-flourishes.constants';
import { SENTRI_LIGHTS } from './sentri-lights.constants';
import { SENTRI_SPARK } from './sentri-spark.constants';
import { SENTRI_SYMBOLS } from './sentri-symbols.constants';

const { grin, soft, narrow, closed, tired, back } = SENTRI_FACES;
const { question, exclaim, heart, zSmall, zMid, zBig, sweat, focus } = SENTRI_SYMBOLS;
const { bulbOff, bulb, rays, battery, batteryCell, laptop } = SENTRI_LIGHTS;
const { swirlFront, swirlBack, sparkCyan, sparkGold, confettiNear, confettiFar, dust, lift, landing, whoosh } = SENTRI_FLOURISHES;

const SENTRI_EFFECTS: readonly MotionEffect[] = [
  { id: 'spark', piece: SENTRI_SPARK, at: [15, 9] },
  { id: 'grin', piece: grin, at: [11, 12] },
  { id: 'soft', piece: soft, at: [11, 12] },
  { id: 'narrow', piece: narrow, at: [11, 12] },
  { id: 'closed', piece: closed, at: [11, 12] },
  { id: 'tired', piece: tired, at: [11, 12] },
  { id: 'back', piece: back, at: [10, 11] },
  { id: 'sweatLeft', piece: sweat, at: [7, 1] },
  { id: 'sweatRight', piece: sweat, at: [23, 1] },
  { id: 'focus', piece: focus, at: [22, -2] },
  { id: 'swirlBack', piece: swirlBack, at: [-3, 10], fixed: true },
  { id: 'laptop', piece: laptop, at: [-4, 9], fixed: true },
  { id: 'swirlFront', piece: swirlFront, at: [-3, 10], fixed: true },
  { id: 'question', piece: question, at: [16, -11], fixed: true },
  { id: 'exclaim', piece: exclaim, at: [15, -11], fixed: true },
  { id: 'heart', piece: heart, at: [13, -10], fixed: true },
  { id: 'zSmall', piece: zSmall, at: [20, -5], fixed: true },
  { id: 'zMid', piece: zMid, at: [25, -9], fixed: true },
  { id: 'zBig', piece: zBig, at: [31, -12], fixed: true },
  { id: 'bulbOff', piece: bulbOff, at: [13, -12], fixed: true },
  { id: 'bulb', piece: bulb, at: [13, -12], fixed: true },
  { id: 'rays', piece: rays, at: [8, -12], fixed: true },
  { id: 'battery', piece: battery, at: [10, -10], fixed: true },
  { id: 'batteryCell', piece: batteryCell, at: [12, -8], fixed: true },
  { id: 'sparkCyan', piece: sparkCyan, at: [-2, -11], fixed: true },
  { id: 'sparkGold', piece: sparkGold, at: [-2, -11], fixed: true },
  { id: 'confettiNear', piece: confettiNear, at: [-1, -8], fixed: true },
  { id: 'confettiFar', piece: confettiFar, at: [-1, -10], fixed: true },
  { id: 'dust', piece: dust, at: [-3, 16], fixed: true },
  { id: 'lift', piece: lift, at: [14, 18], fixed: true },
  { id: 'landing', piece: landing, at: [-3, 20], fixed: true },
  { id: 'whoosh', piece: whoosh, at: [-4, 10], fixed: true },
];

export { SENTRI_EFFECTS };

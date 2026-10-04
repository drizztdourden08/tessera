/* @layer renderer-components @kind data */
import type { MotionEffect } from '../motion/motion.type';
import { CONFETTI_LEFT, CONFETTI_RIGHT, SWEAT, TWINKLE } from './pelago-bits.constants';
import { BLUSH, GRIN, LIDS_FOCUS, LIDS_SHUT, LIDS_SMILE, LIDS_TIRED, LIDS_WORRIED } from './pelago-faces.constants';
import { LAPTOP } from './pelago-laptop.constants';
import { BATTERY, BULB, RAYS } from './pelago-props.constants';
import { EXCLAIM, HEART, QUESTION, ZEE } from './pelago-signs.constants';
import { symbolPiece } from './symbol-piece';

const FACE = [24, 23] as const;

const PELAGO_EFFECTS: readonly MotionEffect[] = [
  { id: 'lidsSmile', piece: symbolPiece(LIDS_SMILE), at: FACE },
  { id: 'lidsShut', piece: symbolPiece(LIDS_SHUT), at: FACE },
  { id: 'lidsFocus', piece: symbolPiece(LIDS_FOCUS), at: FACE },
  { id: 'lidsWorried', piece: symbolPiece(LIDS_WORRIED), at: FACE },
  { id: 'lidsTired', piece: symbolPiece(LIDS_TIRED), at: FACE },
  { id: 'grin', piece: symbolPiece(GRIN), at: [26.4, 28.6] },
  { id: 'blush', piece: symbolPiece(BLUSH), at: [23.6, 29.4] },
  { id: 'sweatLeft', piece: symbolPiece(SWEAT, 1.6), at: [14.6, 5.4] },
  { id: 'sweatRight', piece: symbolPiece(SWEAT, 1.35), at: [42.6, 3.6] },
  { id: 'question', piece: symbolPiece(QUESTION), at: [30.1, -10.6], fixed: true },
  { id: 'questionSmall', piece: symbolPiece(QUESTION, 0.65), at: [20.6, -5.6], fixed: true },
  { id: 'exclaim', piece: symbolPiece(EXCLAIM), at: [32.6, -10.6], fixed: true },
  { id: 'heart', piece: symbolPiece(HEART), at: [29.6, -8.6], fixed: true },
  { id: 'zeeSmall', piece: symbolPiece(ZEE, 0.6), at: [38.4, -0.6], fixed: true },
  { id: 'zeeMid', piece: symbolPiece(ZEE, 0.85), at: [42, -5], fixed: true },
  { id: 'zeeBig', piece: symbolPiece(ZEE, 1.15), at: [46.4, -10.2], fixed: true },
  { id: 'bulb', piece: symbolPiece(BULB, 1.2), at: [30.4, -9.2], fixed: true },
  { id: 'rays', piece: symbolPiece(RAYS, 1.2), at: [26.8, -12.8], fixed: true },
  { id: 'battery', piece: symbolPiece(BATTERY), at: [28.6, -7.6], fixed: true },
  { id: 'confettiLeft', piece: symbolPiece(CONFETTI_LEFT, 1.35), at: [-2, -10.4], fixed: true },
  { id: 'confettiRight', piece: symbolPiece(CONFETTI_RIGHT, 1.35), at: [41.2, -10.4], fixed: true },
  { id: 'twinkleA', piece: symbolPiece(TWINKLE), at: [12.6, -1], fixed: true },
  { id: 'twinkleB', piece: symbolPiece(TWINKLE, 0.8), at: [47.6, -3], fixed: true },
  { id: 'twinkleC', piece: symbolPiece(TWINKLE, 0.7), at: [50.4, 41], fixed: true },
  { id: 'laptop', piece: symbolPiece(LAPTOP, 1.2), at: [3, 30.8], fixed: true },
];

export { PELAGO_EFFECTS };

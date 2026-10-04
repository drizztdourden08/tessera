/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';
import { handPiece } from './hand-piece';
import { ovalPath } from './oval-path';
import type { PelagoPieceName } from './pelago.type';
import { spherePiece } from './sphere-piece';

const PELAGO_PIECES: Readonly<Record<PelagoPieceName, BrandPiece>> = {
  sphereTop: spherePiece('Top sphere', 8.5, ['#5a35dc', '#7c4dff', '#9d77ff']),
  sphereLeft: spherePiece('Left sphere', 8.5, ['#6a45e8', '#9d77ff', '#c1a8ff']),
  sphereRight: spherePiece('Right sphere', 9.5, ['#4527b8', '#6a3ff2', '#8f6bff']),
  glint: {
    name: 'Glint',
    w: 6,
    h: 4,
    paths: [
      { ink: '#ffffff', opacity: 0.8, d: ovalPath([2.6, 1.8], 2.2, 1.2) },
      { ink: '#ffffff', opacity: 0.6, d: ovalPath([5.1, 3.1], 0.55) },
    ],
  },
  eye: {
    name: 'Eye',
    w: 8,
    h: 8,
    paths: [
      { ink: '#3b2a7a', d: ovalPath([4, 4], 3.9) },
      { ink: '#d4c6ff', d: ovalPath([4, 4], 3.3) },
      { ink: '#ffffff', d: ovalPath([3.75, 3.65], 2.85) },
      { ink: '#6a3ff2', d: ovalPath([4.3, 4.45], 1.9) },
      { ink: '#1d1440', d: ovalPath([4.35, 4.55], 1.05) },
      { ink: '#ffffff', d: ovalPath([3.75, 3.85], 0.5) },
    ],
  },
  handLeft: handPiece('Left hand', false),
  handRight: handPiece('Right hand', true),
};

export { PELAGO_PIECES };

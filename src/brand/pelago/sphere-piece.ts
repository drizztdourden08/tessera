/* @layer renderer-components @kind logic */
import type { BrandPiece } from '../brand.type';
import { ovalPath } from './oval-path';
import type { SphereTones } from './pelago.type';

const spherePiece = (name: string, r: number, [base, middle, light]: SphereTones): BrandPiece => ({
  name,
  w: r * 2,
  h: r * 2,
  paths: [
    { ink: base, d: ovalPath([r, r], r) },
    { ink: middle, d: ovalPath([r * 0.85, r * 0.8], r * 0.66) },
    { ink: light, d: ovalPath([r * 0.7, r * 0.62], r * 0.3) },
  ],
});

export { spherePiece };

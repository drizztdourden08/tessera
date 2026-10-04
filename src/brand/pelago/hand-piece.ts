/* @layer renderer-components @kind logic */
import type { BrandPiece } from '../brand.type';
import { circlesPath } from './circles-path';
import { PELAGO_HAND } from './pelago-hand.constants';
import type { Oval } from './pelago.type';

const handPiece = (name: string, mirror: boolean): BrandPiece => {
  const { size, outline, outlineInk, fillInk, shineInk, ovals, shine } = PELAGO_HAND;
  const flip = (list: readonly Oval[]): Oval[] => list.map(([x, y, rx, ry]) => [mirror ? size - x : x, y, rx, ry]);
  return {
    name,
    w: size,
    h: size,
    paths: [
      { ink: outlineInk, d: circlesPath(flip(ovals), outline) },
      { ink: fillInk, d: circlesPath(flip(ovals)) },
      { ink: shineInk, d: circlesPath(flip(shine)) },
    ],
  };
};

export { handPiece };

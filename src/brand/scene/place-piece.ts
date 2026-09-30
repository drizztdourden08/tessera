/* @layer renderer-components @kind logic */
import type { BrandPiece, ScenePieceNode } from '../brand.type';
import type { PieceSpot } from './scene.type';

const placePiece = (piece: BrandPiece, spot: PieceSpot): ScenePieceNode => {
  const scale = spot.scale ?? 1;
  const width = piece.w * scale;
  const height = piece.h * scale;
  const [originX, originY] = spot.origin ?? [width / 2, height / 2];
  return {
    kind: 'piece',
    label: spot.label ?? piece.name,
    piece,
    left: spot.at[0],
    top: spot.at[1],
    width,
    height,
    angle: spot.angle ?? 0,
    originX,
    originY,
  };
};

export { placePiece };

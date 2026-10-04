/* @layer renderer-components @kind logic */
import type { ScenePieceNode, ScenePoint } from '../brand.type';
import { placePiece } from '../scene/place-piece';
import type { PlacedPiece } from './pelago.type';

const placeAt = ({ piece, at }: PlacedPiece, shift: ScenePoint = [0, 0], label?: string): ScenePieceNode =>
  placePiece(piece, { at: [at[0] + shift[0], at[1] + shift[1]], ...(label === undefined ? {} : { label }) });

export { placeAt };

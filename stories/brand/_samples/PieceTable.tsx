/* @layer stories @kind component */
import { BrandScene, placePiece } from '../../../src/brand';
import type { BrandPiece } from '../../../src/brand';
import { Text } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { BREAKDOWN_SCALE } from './mascot-brands.constants';

interface PieceTableProps {
  pieces: readonly BrandPiece[];
}

const COLUMNS = [{ key: 'art', label: 'Piece' }, { key: 'grid', label: 'Pixels' }] as const;

const alone = (piece: BrandPiece) => ({
  width: piece.w,
  height: piece.h,
  nodes: [placePiece(piece, { at: [0, 0] })],
});

const PieceTable = (props: PieceTableProps) => {
  const { pieces } = props;
  const byName = new Map(pieces.map((piece) => [piece.name, piece]));
  return (
    <Demonstrator
      rows={pieces.map((piece) => ({ key: piece.name, label: piece.name }))}
      columns={COLUMNS}
      cell={(name, column) => {
        const piece = byName.get(name);
        if (!piece) return null;
        return column === 'art'
          ? <BrandScene scene={alone(piece)} scale={BREAKDOWN_SCALE.piece} title={piece.name} />
          : <Text className="story-label">{`${piece.w} by ${piece.h}`}</Text>;
      }}
    />
  );
};

export { PieceTable };

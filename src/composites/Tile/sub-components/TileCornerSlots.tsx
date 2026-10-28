/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { TILE_CORNER_CLASS, TILE_CORNERS } from '../Tile.constants';
import type { TileCornerSlotsProps } from '../Tile.type';

const TileCornerSlots = ({ corners }: TileCornerSlotsProps) => (
  <>
    {TILE_CORNERS.map((corner) => {
      const content = corners[corner];
      if (content === undefined || content === null || content === false) return null;
      return <Box key={corner} className={`tile__corner tile__corner--${TILE_CORNER_CLASS[corner]}`}>{content}</Box>;
    })}
  </>
);

export { TileCornerSlots };

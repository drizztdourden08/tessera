/* @layer stories @kind component */
import { Box } from '../../../../src/primitives';
import { INVALID_PLAYERS, MANY_PLAYERS, PLAYERS } from './players.constants';
import type { Player } from './players.type';
import { PlayersGrid } from './PlayersGrid';
import type { FramedGridProps, RowSet } from './row-grid-story.type';

const SETS: Readonly<Record<RowSet, readonly Player[]>> = { three: PLAYERS, six: MANY_PLAYERS, invalid: INVALID_PLAYERS, none: [] };

const FramedGrid = ({ width, rows = 'three', density, numbered }: FramedGridProps) => (
  <Box className={`players-story__frame players-story__frame--${width}`}>
    <PlayersGrid key={`${rows}-${String(density)}`} initial={SETS[rows]} density={density} numbered={numbered} />
  </Box>
);

export { FramedGrid };

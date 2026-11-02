/* @layer stories @kind component */
import { DataTable } from '../../../src/composites';
import { MEMORY_VIEW_STORAGE } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';
import { PLAYERS, PLAYER_SCHEMA } from './data-players';
import type { PlayerRow } from './data-players';

const playerId = (player: PlayerRow): string => player.id;

const DataTablePlainHeaders = () => (
  <Box className="data-table-story">
    <Text className="story-label">
      headerRules is false: no vertical rule sits between the header cells. Point at the edge of a header to see the rule and resize the column.
    </Text>
    <DataTable
      rows={PLAYERS}
      schema={PLAYER_SCHEMA}
      getRowId={playerId}
      viewStorage={MEMORY_VIEW_STORAGE}
      headerRules={false}
    />
  </Box>
);

export { DataTablePlainHeaders };

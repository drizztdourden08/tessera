/* @layer stories @kind component */
import { DataTable } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];

const playerId = (player: PlayerRow): string => player.id;

const renderCell = (player: PlayerRow, path: string) => {
  if (path !== 'name') return undefined;
  return (
    <Box className="data-table-thumb-cell">
      <Box className="data-table-thumb">{player.name.slice(0, 1)}</Box>
      <Text>{player.name}</Text>
    </Box>
  );
};

const DataTableThumbnail = () => (
  <Box className="data-table-story">
    <Text className="story-label">
      The name column draws a thumbnail beside the name; every other column keeps its schema rendering, and rowHeight makes room.
    </Text>
    <DataTable
      rows={PLAYERS}
      schema={PLAYER_SCHEMA}
      getRowId={playerId}
      renderCell={renderCell}
      rowHeight="size-56"
      virtualizeFrom={10}
      countLabel={PLAYER_COUNT}
    />
  </Box>
);

export { DataTableThumbnail };

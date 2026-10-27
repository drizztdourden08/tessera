/* @layer stories @kind component */
import { DataTable } from '../../../src/composites';
import { MEMORY_VIEW_STORAGE } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';
import { PLAYERS, PLAYER_SCHEMA } from './data-players';
import type { PlayerRow } from './data-players';

const playerId = (player: PlayerRow): string => player.id;

const DataTableNoFooter = () => (
  <Box className="data-table-story">
    <Text className="story-label">
      footer is false: the count, the sort and group line and the options menu at the bottom are left out.
    </Text>
    <DataTable
      rows={PLAYERS}
      schema={PLAYER_SCHEMA}
      getRowId={playerId}
      viewStorage={MEMORY_VIEW_STORAGE}
      footer={false}
    />
  </Box>
);

export { DataTableNoFooter };

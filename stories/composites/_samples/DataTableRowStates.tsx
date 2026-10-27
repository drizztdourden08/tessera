/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import type { RowState } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];

const STATES: Readonly<Record<PlayerRow['status'], RowState>> = {
  playing: 'active',
  goal: 'pending',
  offline: 'error',
  idle: 'muted',
};

const playerId = (player: PlayerRow): string => player.id;
const SLOW_PING = 90;

const stateOf = (player: PlayerRow): RowState => {
  if (player.status === 'playing' && player.connection.ping >= SLOW_PING) return 'warning';
  if (player.status === 'playing' && player.deathLink) return 'edge';
  return STATES[player.status];
};

const DataTableRowStates = () => {
  const [selectedId, setSelectedId] = useState<string | null>('slot-3');

  return (
    <Box className="data-table-story">
      <Text className="story-label">
        Playing is active, goal is pending, offline is error, idle is muted and a playing row with a slow ping is warning and a playing row with death link on is edge, only the left bar with no tint. The selected row keeps its selection background and shows its state as an edge.
      </Text>
      <DataTable
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        rowState={stateOf}
        selectedId={selectedId}
        onSelect={setSelectedId}
        countLabel={PLAYER_COUNT}
      />
    </Box>
  );
};

export { DataTableRowStates };

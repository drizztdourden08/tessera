/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import type { RowTone } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];

const TONES: Readonly<Record<PlayerRow['status'], RowTone | undefined>> = {
  playing: undefined,
  goal: 'success',
  offline: 'danger',
  idle: 'neutral',
};

const SLOW_PING = 90;

const playerId = (player: PlayerRow): string => player.id;

const toneOf = (player: PlayerRow): RowTone | undefined => {
  if (player.status === 'playing' && player.connection.ping >= SLOW_PING) return 'warning';
  return TONES[player.status];
};

const DataTableRowTones = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Box className="data-table-story">
      <Text className="story-label">
        rowTone colours the left edge of a row. A playing row with a slow ping gets the warning tone, an amber bar for a row that needs a look. Goal is success, offline is danger and idle is neutral.
      </Text>
      <DataTable
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        rowTone={toneOf}
        selectedId={selectedId}
        onSelect={setSelectedId}
        countLabel={PLAYER_COUNT}
      />
    </Box>
  );
};

export { DataTableRowTones };

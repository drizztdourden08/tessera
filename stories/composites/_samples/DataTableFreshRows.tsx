/* @layer stories @kind component */
import { useState } from 'react';
import type { RowState } from '../../../src/composites';
import type { PlayerRow } from './data-players';
import { Box, Text } from '../../../src/primitives';
import { DataTable } from '../../../src/composites';
import { PLAYERS, PLAYER_SCHEMA } from './data-players';

const FRESH: ReadonlySet<string> = new Set(['slot-1', 'slot-2', 'slot-3']);

const playerId = (player: PlayerRow): string => player.id;

const stateOf = (player: PlayerRow): RowState | undefined => (FRESH.has(player.id) ? 'fresh' : undefined);

const DataTableFreshRows = () => {
  const [selectedId, setSelectedId] = useState<string | null>('slot-2');

  return (
    <Box className="data-table-story">
      <Text className="story-label">
        The first three rows just arrived, so they take the fresh tint. The selected row keeps the selection background. The headers are set in capitals with headerCase upper.
      </Text>
      <DataTable
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        rowState={stateOf}
        headerCase="upper"
        selectedId={selectedId}
        onSelect={setSelectedId}
        countLabel={['player', 'players']}
      />
    </Box>
  );
};

export { DataTableFreshRows };

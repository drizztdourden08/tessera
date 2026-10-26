/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';
import { DataTableDetailName } from './DataTableDetailName';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];
const GROUP_BY: readonly string[] = ['game'];

const playerId = (player: PlayerRow): string => player.id;

const DataTableDetailForm = () => {
  const [players, setPlayers] = useState<readonly PlayerRow[]>(PLAYERS);
  const [openId, setOpenId] = useState<string | null>('slot-3');
  const close = () => setOpenId(null);
  const rename = (id: string, name: string) => {
    setPlayers((before) => before.map((player) => (player.id === id ? { ...player, name } : player)));
    close();
  };

  return (
    <Box className="data-table-story">
      <Text className="story-label">
        Click a row to edit its name under it. The detail works inside groups; Enter saves and Esc closes.
      </Text>
      <DataTable
        rows={players}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        fallbackGroupBy={GROUP_BY}
        selectedId={openId}
        onSelect={setOpenId}
        detailRowId={openId}
        onDetailClose={close}
        renderDetail={(player) => <DataTableDetailName player={player} onSave={rename} onCancel={close} />}
        countLabel={PLAYER_COUNT}
      />
    </Box>
  );
};

export { DataTableDetailForm };

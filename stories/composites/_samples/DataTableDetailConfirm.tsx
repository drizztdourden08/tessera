/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import { Box, Button, ButtonRow, Text } from '../../../src/primitives';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const DataTableDetailConfirm = () => {
  const [players, setPlayers] = useState<readonly PlayerRow[]>(PLAYERS);
  const [openId, setOpenId] = useState<string | null>(null);
  const close = () => setOpenId(null);
  const remove = (id: string) => {
    setPlayers((before) => before.filter((player) => player.id !== id));
    close();
  };

  return (
    <Box className="data-table-story">
      <Text className="story-label">
        Click a row to ask to remove it. The question opens under the row; Yes removes the player, No and Esc close it.
      </Text>
      <DataTable
        rows={players}
        schema={PLAYER_SCHEMA}
        getRowId={(player) => player.id}
        selectedId={openId}
        onSelect={setOpenId}
        detailRowId={openId}
        onDetailClose={close}
        renderDetail={(player) => (
          <ButtonRow>
            <Text>{`Remove ${player.name} from the session?`}</Text>
            <Button size="sm" variant="danger" onClick={() => remove(player.id)}>Yes</Button>
            <Button size="sm" onClick={close}>No</Button>
          </ButtonRow>
        )}
        countLabel={['player', 'players']}
      />
    </Box>
  );
};

export { DataTableDetailConfirm };

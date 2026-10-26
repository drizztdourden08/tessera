/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable, ListDetailLayout } from '../../../src/composites';
import { MEMORY_VIEW_STORAGE } from '../../../src/data';
import { Box } from '../../../src/primitives';
import { PLAYERS, PLAYER_SCHEMA } from './data-players';
import type { PlayerRow } from './data-players';
import { SessionDetail } from './SessionDetail';
import { SESSIONS } from './sessions';

const COPIES = 12;
const ROWS: readonly PlayerRow[] = Array.from({ length: COPIES }, (_, copy) => PLAYERS.map((player) => ({ ...player, id: `${player.id}-${copy}` }))).flat();
const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];

const rowId = (player: PlayerRow): string => player.id;

const ListTableDemo = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <Box className="list-detail-story list-detail-story--tall">
      <ListDetailLayout
        listContainers={[{
          title: 'Players',
          content: (
            <DataTable
              rows={ROWS}
              schema={PLAYER_SCHEMA}
              getRowId={rowId}
              viewStorage={MEMORY_VIEW_STORAGE}
              selectedId={selectedId}
              onSelect={setSelectedId}
              countLabel={PLAYER_COUNT}
            />
          ),
        }]}
        detail={<SessionDetail session={SESSIONS[0]} />}
        listScroll={false}
        listRatio={0.6}
        listLabel="players"
        listShowTitle={false}
        detailLabel="session details"
      />
    </Box>
  );
};

export { ListTableDemo };

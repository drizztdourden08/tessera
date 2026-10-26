/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import { DataTable } from '../../../src/composites';
import { Text } from '../../../src/primitives';
import { PLAYER_SCHEMA } from './data-players';
import type { PlayerRow } from './data-players';
import { PLAYERS } from './data-players';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];
const GROUP_BY: readonly string[] = ['game'];

const playerId = (player: PlayerRow): string => player.id;

const DataTableGroupActions = () => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const groupActions = useCallback((game: string, rows: readonly PlayerRow[]) => [{
    id: 'select-all',
    label: `Select all in ${game}`,
    icon: 'list-checks' as const,
    onSelect: () => setPicked((before) => new Set([...before, ...rows.map(playerId)])),
  }], []);

  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">
        {`${picked.size} selected. The icon at the end of a game header picks every player of that game, even in a collapsed group.`}
      </Text>
      <DataTable
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        fallbackGroupBy={GROUP_BY}
        selectable
        selectedIds={picked}
        onSelectionChange={setPicked}
        groupActions={groupActions}
        countLabel={PLAYER_COUNT}
      />
    </LinkSandbox>
  );
};

export { DataTableGroupActions };

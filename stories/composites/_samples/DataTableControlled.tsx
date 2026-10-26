/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable, groupUid } from '../../../src/composites';
import type { SortEntry } from '../../../src/data';
import { Box, Button, ButtonRow, Text } from '../../../src/primitives';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];
const GROUP_BY: readonly string[] = ['game'];
const BY_NAME: readonly SortEntry[] = [{ path: 'name', dir: 'asc' }];
const BY_CHECKS: readonly SortEntry[] = [{ path: 'checked', dir: 'desc' }];
const ALL_GROUPS: ReadonlySet<string> = new Set(PLAYERS.map((player) => groupUid('', 'game', player.game)));

const playerId = (player: PlayerRow): string => player.id;

const DataTableControlled = () => {
  const [sort, setSort] = useState<readonly SortEntry[]>(BY_NAME);
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(ALL_GROUPS);
  const sortWord = sort[0] ? `${sort[0].path} ${sort[0].dir}` : 'none';

  return (
    <Box className="data-table-story">
      <Text className="story-label">
        {`Sort: ${sortWord}. Open groups: ${expanded.size} of ${ALL_GROUPS.size}. The buttons and the table headers drive the same state.`}
      </Text>
      <ButtonRow>
        <Button size="sm" onClick={() => setSort(BY_NAME)}>Sort by name</Button>
        <Button size="sm" onClick={() => setSort(BY_CHECKS)}>Most checks first</Button>
        <Button size="sm" onClick={() => setSort([])}>Clear sort</Button>
        <Button size="sm" onClick={() => setExpanded(ALL_GROUPS)}>Expand all</Button>
        <Button size="sm" onClick={() => setExpanded(new Set())}>Collapse all</Button>
      </ButtonRow>
      <DataTable
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        fallbackGroupBy={GROUP_BY}
        sort={sort}
        onSortChange={setSort}
        expanded={expanded}
        onExpandedChange={setExpanded}
        countLabel={PLAYER_COUNT}
      />
    </Box>
  );
};

export { DataTableControlled };

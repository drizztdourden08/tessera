/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { FilterBar, ListItemList, ListItemRow } from '../../../src/composites';
import { compile, compileTextSearch, createClause } from '../../../src/data';
import type { FilterClause } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';
import { PLAYERS, PLAYER_SCHEMA } from './data-players';

type FilterDemoProps = {
  withClauses: boolean;
  placeholder: string;
  startWith?: readonly FilterClause[];
};

const STARTING_CLAUSES: readonly FilterClause[] = [
  createClause('status', 'anyOf', ['playing', 'idle']),
  createClause('checked', 'gte', 100),
];

const FilterDemo = ({ withClauses, placeholder, startWith = STARTING_CLAUSES }: FilterDemoProps) => {
  const [search, setSearch] = useState('');
  const [clauses, setClauses] = useState<readonly FilterClause[]>(startWith);

  const shown = useMemo(() => {
    const matchesClauses = compile(withClauses ? clauses : [], PLAYER_SCHEMA);
    const matchesText = compileTextSearch(search);
    return PLAYERS.filter((player) => (!matchesText || matchesText(player)) && matchesClauses(player));
  }, [withClauses, clauses, search]);

  return (
    <Box className="story-column filter-bar-story">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={placeholder}
        searchLabel="Search players"
        schema={withClauses ? PLAYER_SCHEMA : undefined}
        clauses={withClauses ? clauses : undefined}
        onChange={withClauses ? setClauses : undefined}
      />
      <Text className="story-label">{`${shown.length} of ${PLAYERS.length} players`}</Text>
      <ListItemList label="Players">
        {shown.slice(0, 6).map((player) => (
          <ListItemRow
            key={player.id}
            name={player.name}
            meta={player.game}
            columns={[
              { primary: player.status },
              { primary: `${player.checked} / ${player.total}`, secondary: 'checks', align: 'end' },
            ]}
          />
        ))}
      </ListItemList>
    </Box>
  );
};

export { FilterDemo };
export type { FilterDemoProps };

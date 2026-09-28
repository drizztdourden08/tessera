/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { FilterBar } from '../../../src/composites';
import type { FilterFacet } from '../../../src/composites';
import { compile, compileTextSearch, createClause } from '../../../src/data';
import type { FilterClause } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';
import { GAMES, PLAYERS, PLAYER_SCHEMA, STATUSES } from './data-players';

type FilterDemoProps = {
  withClauses: boolean;
  withFacets: boolean;
  placeholder: string;
};

const toggleIn = (set: ReadonlySet<string>, id: string): ReadonlySet<string> => {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
};

const STATUS_OPTIONS = STATUSES.map((status) => ({ id: status, label: status }));
const GAME_OPTIONS = GAMES.map((game) => ({ id: game, label: game }));
const STARTING_CLAUSES: readonly FilterClause[] = [createClause('checked', 'gte', 100)];

const FilterDemo = ({ withClauses, withFacets, placeholder }: FilterDemoProps) => {
  const [search, setSearch] = useState('');
  const [clauses, setClauses] = useState<readonly FilterClause[]>(STARTING_CLAUSES);
  const [hiddenStatus, setHiddenStatus] = useState<ReadonlySet<string>>(new Set(['offline']));
  const [hiddenGames, setHiddenGames] = useState<ReadonlySet<string>>(new Set());

  const facets = useMemo<readonly FilterFacet[]>(() => [
    {
      id: 'status', label: 'Show status', options: STATUS_OPTIONS, hidden: hiddenStatus,
      onToggle: (id) => setHiddenStatus((prev) => toggleIn(prev, id)),
    },
    {
      id: 'game', label: 'Show games', options: GAME_OPTIONS, hidden: hiddenGames,
      onToggle: (id) => setHiddenGames((prev) => toggleIn(prev, id)),
    },
  ], [hiddenStatus, hiddenGames]);

  const shown = useMemo(() => {
    const matchesClauses = compile(withClauses ? clauses : [], PLAYER_SCHEMA);
    const matchesText = compileTextSearch(search);
    return PLAYERS.filter((player) => {
      if (withFacets && (hiddenStatus.has(player.status) || hiddenGames.has(player.game))) return false;
      if (matchesText && !matchesText(player)) return false;
      return matchesClauses(player);
    });
  }, [withClauses, withFacets, clauses, search, hiddenStatus, hiddenGames]);

  return (
    <Box className="story-column">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={placeholder}
        searchLabel="Search players"
        schema={withClauses ? PLAYER_SCHEMA : undefined}
        clauses={withClauses ? clauses : undefined}
        onChange={withClauses ? setClauses : undefined}
        facets={withFacets ? facets : undefined}
      />
      <Text className="story-label">{`${shown.length} of ${PLAYERS.length} players`}</Text>
      {shown.map((player) => (
        <Text key={player.id}>{`${player.name}, ${player.game}, ${player.status}, ${player.checked}/${player.total} checks`}</Text>
      ))}
    </Box>
  );
};

export { FilterDemo };
export type { FilterDemoProps };

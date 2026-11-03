/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import { PatternRulesCard } from './PatternRulesCard';
import { SEARCH_LISTS } from './pattern-names';
import type { PatternRulesCase } from './PatternRulesDemo.type';

const CASES: readonly PatternRulesCase[] = [
  {
    key: 'hint', label: 'Hint command', hint: 'Type to filter 3,000 players and 2,500 items. A name that is not listed is kept as typed.',
    pattern: '/hint {player:choice @players free "Player"} {item:choice @items free "Item"}', initial: { player: null, item: null }, lists: SEARCH_LISTS,
  },
  {
    key: 'kick', label: 'Kick command', hint: 'Type to filter the players. Only a listed player is kept, and Enter takes the first match.',
    pattern: '/kick {player:choice @players search "Player"}', initial: { player: null }, lists: SEARCH_LISTS,
  },
];

const PatternSearchDemo = () => (
  <Box className="pattern-story__rules">
    {CASES.map((search) => <PatternRulesCard key={search.key} rule={search} />)}
  </Box>
);

export { PatternSearchDemo };

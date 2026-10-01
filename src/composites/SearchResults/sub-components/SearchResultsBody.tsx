/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { NO_GROUPS, NO_HITS, NO_JUMPS } from '../SearchResults.constants';
import { SearchResultsGroupBlock } from './SearchResultsGroupBlock';
import { SearchResultsHits } from './SearchResultsHits';
import { SearchResultsSummary } from './SearchResultsSummary';
import type { SearchResultsBodyProps } from './SearchResultsBody.type';

const SearchResultsBody = (props: SearchResultsBodyProps) => {
  const {
    needle, count, summary, hits = NO_HITS, onOpenHit, jumps = NO_JUMPS, onJump, groups = NO_GROUPS, onOpenGroup,
    framed = false, className = '',
  } = props;
  const { navigation } = useTesseraStrings();
  const classes = ['search-results', framed ? 'search-results--framed' : '', className].filter(Boolean).join(' ');

  return (
    <ScrollArea className={classes}>
      <Box className="search-results__head">
        <SearchResultsSummary summary={summary ?? navigation.resultsFor(count, needle)} jumps={jumps} onJump={onJump} />
        <SearchResultsHits hits={hits} onOpen={onOpenHit} />
      </Box>
      {groups.map((group) => (
        <SearchResultsGroupBlock key={group.id} group={group} onOpenGroup={onOpenGroup} onOpenHit={onOpenHit} />
      ))}
    </ScrollArea>
  );
};

export { SearchResultsBody };

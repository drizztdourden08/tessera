/* @layer renderer-components @kind component */
import { EmptyState } from '../../../primitives/EmptyState';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { NO_GROUPS, NO_HITS, NO_JUMPS } from '../SearchResults.constants';
import { SearchResultsGroupBlock } from './SearchResultsGroupBlock';
import { SearchResultsHead } from './SearchResultsHead';
import { SearchResultsHits } from './SearchResultsHits';
import type { SearchResultsBodyProps } from './SearchResultsBody.type';

const SearchResultsBody = (props: SearchResultsBodyProps) => {
  const {
    needle, count, summary, hits = NO_HITS, onOpenHit, jumps = NO_JUMPS, onJump, groups = NO_GROUPS, onOpenGroup,
    groupHeading = 'split', openLabel, emptyMessage,
  } = props;
  const { navigation } = useTesseraStrings();
  const fallback = count > 0 ? navigation.resultsFor(count, needle) : navigation.noResultsFor(needle);

  return (
    <>
      <SearchResultsHead summary={summary ?? fallback} jumps={jumps} onJump={onJump} />
      <ScrollArea className="search-results__body">
        {count === 0 && <EmptyState className="search-results__empty" message={emptyMessage ?? navigation.searchTip} />}
        <SearchResultsHits hits={hits} onOpen={onOpenHit} />
        {groups.map((group) => (
          <SearchResultsGroupBlock
            key={group.id}
            group={group}
            heading={groupHeading}
            openLabel={openLabel ?? navigation.openPage}
            onOpenGroup={onOpenGroup}
            onOpenHit={onOpenHit}
          />
        ))}
      </ScrollArea>
    </>
  );
};

export { SearchResultsBody };

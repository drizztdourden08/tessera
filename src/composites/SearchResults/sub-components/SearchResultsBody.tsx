/* @layer renderer-components @kind component */
import { EmptyState } from '../../../primitives/EmptyState';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SearchResultGroup } from '../../SearchResultGroup';
import { NO_GROUPS, NO_HITS, NO_JUMPS } from '../SearchResults.constants';
import { SearchResultsHead } from './SearchResultsHead';
import { SearchResultsHits } from './SearchResultsHits';
import type { SearchResultsBodyProps } from './SearchResultsBody.type';

const SearchResultsBody = (props: SearchResultsBodyProps) => {
  const {
    needle, count, summary, hits = NO_HITS, onOpenHit, jumps = NO_JUMPS, onJump, groups = NO_GROUPS, onOpenGroup, openLabel, emptyMessage,
  } = props;
  const { navigation } = useTesseraStrings();
  const fallback = count > 0 ? navigation.resultsFor(count, needle) : navigation.noResultsFor(needle);

  return (
    <>
      <SearchResultsHead summary={summary ?? fallback} jumps={jumps} onJump={onJump} />
      <ScrollArea className="search-results__body">
        {count === 0 && <EmptyState className="search-results__empty" message={emptyMessage ?? navigation.searchTip} />}
        <SearchResultsHits hits={hits} query={needle} onOpen={onOpenHit} />
        {groups.map((group) => (
          <SearchResultGroup
            key={group.id}
            id={group.id}
            label={group.label}
            icon={group.icon}
            count={group.count}
            openLabel={openLabel}
            onOpen={onOpenGroup && (() => onOpenGroup(group.id))}
          >
            <SearchResultsHits hits={group.hits ?? NO_HITS} query={needle} onOpen={onOpenHit} />
            {group.children}
          </SearchResultGroup>
        ))}
      </ScrollArea>
    </>
  );
};

export { SearchResultsBody };

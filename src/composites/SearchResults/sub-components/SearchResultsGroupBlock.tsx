/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Span } from '../../../primitives/text-elements';
import { NO_HITS } from '../SearchResults.constants';
import { SearchResultsHits } from './SearchResultsHits';
import type { SearchResultsGroupBlockProps } from './SearchResultsGroupBlock.type';

const SearchResultsGroupBlock = (props: SearchResultsGroupBlockProps) => {
  const { group, onOpenGroup, onOpenHit } = props;
  return (
    <Box className="search-results__group" data-group={group.id}>
      <Button className="search-results__heading" variant="ghost" icon={group.icon} onClick={() => onOpenGroup?.(group.id)}>
        {group.label}
        {group.count !== undefined && <Span tone="dim" className="search-results__count-pill">{group.count}</Span>}
      </Button>
      <SearchResultsHits hits={group.hits ?? NO_HITS} onOpen={onOpenHit} />
      {group.children}
    </Box>
  );
};

export { SearchResultsGroupBlock };

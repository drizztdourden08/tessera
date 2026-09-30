/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { NO_HITS } from '../SearchResults.constants';
import { SearchResultsHits } from './SearchResultsHits';
import type { SearchResultsGroupBlockProps } from './SearchResultsGroupBlock.type';

const SearchResultsGroupBlock = (props: SearchResultsGroupBlockProps) => {
  const { group, onOpenGroup, onOpenHit } = props;
  return (
    <Box className="search-results__group" data-group={group.id}>
      <Button className="search-results__heading" variant="ghost" icon={group.icon} onClick={() => onOpenGroup?.(group.id)}>
        {group.label}
        {group.count !== undefined && <Badge variant="inline" color="primary" value={group.count} />}
      </Button>
      <SearchResultsHits hits={group.hits ?? NO_HITS} onOpen={onOpenHit} />
      {group.children}
    </Box>
  );
};

export { SearchResultsGroupBlock };

/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Span } from '../../../primitives/text-elements';
import type { SearchResultsHitsProps } from './SearchResultsHits.type';

const SearchResultsHits = (props: SearchResultsHitsProps) => {
  const { hits, onOpen } = props;
  if (hits.length === 0) return null;
  return (
    <Box className="search-results__hits">
      {hits.map((hit) => (
        <Button key={hit.id} className="search-results__hit" variant="ghost" onClick={() => onOpen?.(hit)}>
          {hit.label}
          {hit.detail && <Span tone="muted" className="search-results__detail">{hit.detail}</Span>}
        </Button>
      ))}
    </Box>
  );
};

export { SearchResultsHits };

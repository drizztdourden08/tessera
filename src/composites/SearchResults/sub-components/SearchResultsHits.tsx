/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SearchResultHit } from '../../SearchResultHit';
import type { SearchResultsHitsProps } from './SearchResultsHits.type';

const SearchResultsHits = (props: SearchResultsHitsProps) => {
  const { hits, query, onOpen } = props;
  if (hits.length === 0) return null;
  return (
    <Box className="search-results__hits">
      {hits.map((hit) => (
        <SearchResultHit
          key={hit.id}
          label={hit.label}
          description={hit.description}
          path={hit.path}
          icon={hit.icon}
          query={query}
          onOpen={onOpen && (() => onOpen(hit))}
        />
      ))}
    </Box>
  );
};

export { SearchResultsHits };

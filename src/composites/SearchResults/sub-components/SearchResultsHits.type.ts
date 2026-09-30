/* @layer renderer-components @kind types */
import type { SearchResultsHit } from '../SearchResults.type';

interface SearchResultsHitsProps {
  hits: readonly SearchResultsHit[];
  onOpen?: (hit: SearchResultsHit) => void;
}

export type { SearchResultsHitsProps };

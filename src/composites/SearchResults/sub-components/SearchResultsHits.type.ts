/* @layer renderer-components @kind types */
import type { SearchResultsHit } from '../SearchResults.type';

interface SearchResultsHitsProps {
  hits: readonly SearchResultsHit[];
  query: string;
  onOpen?: (hit: SearchResultsHit) => void;
}

export type { SearchResultsHitsProps };

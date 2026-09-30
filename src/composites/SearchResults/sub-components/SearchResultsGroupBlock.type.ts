/* @layer renderer-components @kind types */
import type { SearchResultsGroup, SearchResultsHit } from '../SearchResults.type';

interface SearchResultsGroupBlockProps {
  group: SearchResultsGroup;
  onOpenGroup?: (id: string) => void;
  onOpenHit?: (hit: SearchResultsHit) => void;
}

export type { SearchResultsGroupBlockProps };

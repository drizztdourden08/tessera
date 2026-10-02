/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SearchResultsGroup, SearchResultsGroupHeading, SearchResultsHit } from '../SearchResults.type';

interface SearchResultsGroupBlockProps {
  group: SearchResultsGroup;
  heading: SearchResultsGroupHeading;
  openLabel: ReactNode;
  onOpenGroup?: (id: string) => void;
  onOpenHit?: (hit: SearchResultsHit) => void;
}

export type { SearchResultsGroupBlockProps };

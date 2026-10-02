/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SearchResultsGroup } from '../SearchResults.type';

interface SearchResultsGroupHeadProps {
  group: SearchResultsGroup;
  openLabel: ReactNode;
  onOpenGroup?: (id: string) => void;
}

export type { SearchResultsGroupHeadProps };

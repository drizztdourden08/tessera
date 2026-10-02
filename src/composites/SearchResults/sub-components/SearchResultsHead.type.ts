/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SearchResultsJump } from '../SearchResults.type';

interface SearchResultsHeadProps {
  summary: ReactNode;
  jumps: readonly SearchResultsJump[];
  onJump?: (id: string) => void;
}

export type { SearchResultsHeadProps };

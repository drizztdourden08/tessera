/* @layer renderer-components @kind types */
import type { SearchResultsProps } from '../SearchResults.type';

interface SearchResultsBodyProps extends SearchResultsProps {
  needle: string;
}

export type { SearchResultsBodyProps };

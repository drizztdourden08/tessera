/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { FilterBarProps } from '../FilterBar.type';

type UseTokenSearchInput = Pick<FilterBarProps, 'search' | 'onSearchChange' | 'schema' | 'clauses' | 'onChange' | 'parseToken'>;

interface UseTokenSearchResult {
  onSearchChange: (query: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export type { UseTokenSearchInput, UseTokenSearchResult };

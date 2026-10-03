/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SearchResultHitProps } from '../SearchResultHit';

interface SearchResultsHit extends Pick<SearchResultHitProps, 'label' | 'description' | 'path' | 'icon'> {
  id: string;
}

interface SearchResultsJump {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface SearchResultsGroup {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
  hits?: readonly SearchResultsHit[];
  children?: ReactNode;
}

interface SearchResultsProps {
  query: string;
  count: number;
  summary?: ReactNode;
  hits?: readonly SearchResultsHit[];
  onOpenHit?: (hit: SearchResultsHit) => void;
  jumps?: readonly SearchResultsJump[];
  onJump?: (id: string) => void;
  groups?: readonly SearchResultsGroup[];
  onOpenGroup?: (id: string) => void;
  openLabel?: ReactNode;
  idleIcon?: ReactNode;
  idleMessage?: ReactNode;
  emptyMessage?: ReactNode;
  className?: string;
}

export type { SearchResultsGroup, SearchResultsHit, SearchResultsJump, SearchResultsProps };

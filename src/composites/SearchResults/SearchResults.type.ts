/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SearchResultsHit {
  id: string;
  label: string;
  detail?: string;
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

type SearchResultsGroupHeading = 'split' | 'button';

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
  groupHeading?: SearchResultsGroupHeading;
  openLabel?: ReactNode;
  framed?: boolean;
  idleIcon?: ReactNode;
  idleMessage?: ReactNode;
  emptyMessage?: ReactNode;
  className?: string;
}

export type { SearchResultsGroup, SearchResultsGroupHeading, SearchResultsHit, SearchResultsJump, SearchResultsProps };

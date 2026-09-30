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
  framed?: boolean;
  idleMessage?: ReactNode;
  emptyMessage?: ReactNode;
  className?: string;
}

interface EmptyMessageInput {
  needle: string;
  count: number;
  jumpCount: number;
  idleMessage: ReactNode;
  emptyMessage?: ReactNode;
}

export type { EmptyMessageInput, SearchResultsGroup, SearchResultsHit, SearchResultsJump, SearchResultsProps };

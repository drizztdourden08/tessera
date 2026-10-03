/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SearchResultHitProps {
  label: string;
  description?: string;
  path?: readonly string[];
  icon?: ReactNode;
  query?: string;
  onOpen?: () => void;
  className?: string;
}

interface MatchPart {
  text: string;
  match: boolean;
}

export type { MatchPart, SearchResultHitProps };

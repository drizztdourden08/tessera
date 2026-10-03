/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface SearchResultGroupProps {
  label: string;
  id?: string;
  icon?: ReactNode;
  count?: number;
  onOpen?: () => void;
  openLabel?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export type { SearchResultGroupProps };

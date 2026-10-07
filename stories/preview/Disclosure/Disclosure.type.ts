/* @layer stories @kind types */
import type { ReactNode } from 'react';

type DisclosureSize = 'sm' | 'md';

interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: DisclosureSize;
  className?: string;
}

export type { DisclosureProps, DisclosureSize };

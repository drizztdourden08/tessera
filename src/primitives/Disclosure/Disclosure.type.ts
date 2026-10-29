/* @layer renderer-components @kind types */
import type { MouseEvent, ReactNode, SyntheticEvent } from 'react';

type DisclosureSize = 'sm' | 'md';

interface DisclosureProps {
  summary: ReactNode;
  end?: ReactNode;
  wrapEnd?: boolean;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: DisclosureSize;
  className?: string;
  bodyClassName?: string;
}

interface DisclosureHandlers {
  onToggle?: (event: SyntheticEvent<HTMLElement>) => void;
  onSummaryClick?: (event: MouseEvent<HTMLElement>) => void;
}

export type { DisclosureHandlers, DisclosureProps, DisclosureSize };

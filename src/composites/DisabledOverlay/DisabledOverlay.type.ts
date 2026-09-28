/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface DisabledOverlayProps {
  active: boolean;
  message?: string;
  contained?: boolean;
  actionLabel?: string;
  onOpenSettings?: () => void;
  children: ReactNode;
  className?: string;
}

export type { DisabledOverlayProps };

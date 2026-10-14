/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type DisabledOverlayTone = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';

interface DisabledOverlayProps {
  active: boolean;
  message?: string;
  tone?: DisabledOverlayTone;
  contained?: boolean;
  actionLabel?: string;
  onOpenSettings?: () => void;
  children: ReactNode;
  className?: string;
}

export type { DisabledOverlayProps, DisabledOverlayTone };

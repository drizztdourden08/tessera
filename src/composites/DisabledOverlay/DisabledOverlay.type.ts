/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type DisabledOverlayTone = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';

type DisabledOverlayPlacement = 'center' | 'top';

interface DisabledOverlayProps {
  active: boolean;
  message?: string;
  tone?: DisabledOverlayTone;
  placement?: DisabledOverlayPlacement;
  contained?: boolean;
  actionLabel?: string;
  onOpenSettings?: () => void;
  children: ReactNode;
  className?: string;
}

export type { DisabledOverlayPlacement, DisabledOverlayProps, DisabledOverlayTone };

/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface WindowHeaderProps {
  title?: ReactNode;
  titleId?: string;
  subtitle?: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
  backLabel?: string;
  extra?: ReactNode;
  className?: string;
}

export type { WindowHeaderProps };

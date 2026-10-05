/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../primitives/action-data';

interface WindowHeaderProps {
  title?: ReactNode;
  titleId?: string;
  subtitle?: ReactNode;
  onClose?: () => void;
  back?: BackAction;
  extra?: ReactNode;
  className?: string;
}

export type { WindowHeaderProps };

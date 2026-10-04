/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ContentHeaderProps } from '../ContentHeader';
import type { ScreenLayerSize } from '../ScreenLayer';

type ScreenWindowHeader = Pick<ContentHeaderProps, 'icon' | 'back' | 'backdrop' | 'strip' | 'actions' | 'compact' | 'level' | 'live'>;

interface ScreenWindowProps {
  title: ReactNode;
  onClose: () => void;
  onBack?: () => void;
  backLabel?: string;
  children: ReactNode;
  header?: ScreenWindowHeader;
  subtitle?: ReactNode;
  extra?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  size?: ScreenLayerSize;
  square?: boolean;
  className?: string;
}

export type { ScreenWindowHeader, ScreenWindowProps };

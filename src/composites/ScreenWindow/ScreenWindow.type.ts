/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../primitives/action-data';
import type { ContentHeaderProps } from '../ContentHeader';
import type { ScreenLayerSize } from '../ScreenLayer';

type ScreenWindowHeader = Pick<ContentHeaderProps, 'icon' | 'backdrop' | 'strip' | 'actions' | 'compact' | 'level' | 'live'>;

interface ScreenWindowProps {
  title: ReactNode;
  onClose: () => void;
  back?: BackAction;
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

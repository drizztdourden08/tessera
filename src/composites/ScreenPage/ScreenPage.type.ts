/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { ContentHeaderBack } from '../ContentHeader';

type ScreenKind = 'WorkspaceScreen' | 'StageScreen' | 'UtilityScreen' | 'InfoScreen';

interface ScreenPageProps {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
  back?: ContentHeaderBack;
  backdrop?: ReactNode;
  strip?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  live?: boolean;
  scroll?: boolean;
  compact?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
  bodyClassName?: string;
  className?: string;
}

export type { ScreenKind, ScreenPageProps };

/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

interface SplashAction {
  label: string;
  onSelect: () => void;
  primary?: boolean;
  disabled?: boolean;
}

type SplashProgress = number | 'indeterminate';

type SplashBar = 'edge' | 'inline';

interface SplashProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  mark?: ReactNode;
  status?: ReactNode;
  detail?: ReactNode;
  error?: unknown;
  failed?: boolean;
  progress?: SplashProgress;
  bar?: SplashBar;
  progressLabel?: string;
  actions?: readonly SplashAction[];
  version?: string;
}

export type { SplashAction, SplashBar, SplashProgress, SplashProps };

/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ScreenPageHeadProps {
  icon: ReactNode;
  title: ReactNode;
  titleId: string;
  backdrop: ReactNode;
  strip?: ReactNode;
  actions?: ReactNode;
  live: boolean;
}

export type { ScreenPageHeadProps };

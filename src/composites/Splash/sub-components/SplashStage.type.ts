/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SplashProps } from '../Splash.type';

interface SplashStageProps extends Pick<SplashProps, 'title' | 'mark' | 'status' | 'detail' | 'actions'> {
  failed: boolean;
  meter: ReactNode;
}

export type { SplashStageProps };

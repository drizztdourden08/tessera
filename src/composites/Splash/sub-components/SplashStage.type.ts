/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ImagePixelated } from '../../../primitives/Image/Image.type';
import type { SplashProps } from '../Splash.type';

interface SplashStageProps extends Pick<SplashProps, 'title' | 'wordmark' | 'mark' | 'status' | 'detail' | 'error' | 'actions'> {
  wordmarkPixelated: ImagePixelated;
  failed: boolean;
  meter: ReactNode;
}

export type { SplashStageProps };

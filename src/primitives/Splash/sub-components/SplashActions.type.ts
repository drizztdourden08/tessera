/* @layer renderer-components @kind types */
import type { SplashAction } from '../Splash.type';

interface SplashActionsProps {
  actions: readonly SplashAction[];
  failed: boolean;
}

export type { SplashActionsProps };

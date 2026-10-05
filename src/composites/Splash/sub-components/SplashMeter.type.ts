/* @layer renderer-components @kind types */
import type { SplashBar, SplashProgress } from '../Splash.type';

interface SplashMeterProps {
  progress: SplashProgress;
  bar: SplashBar;
  failed: boolean;
  label: string;
}

export type { SplashMeterProps };

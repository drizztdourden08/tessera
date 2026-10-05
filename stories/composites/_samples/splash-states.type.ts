/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { SplashProgress } from '../../../src/composites';

type SplashState = 'starting' | 'failed' | 'update' | 'reconnecting';

interface SplashSampleAction {
  label: string;
  primary?: boolean;
}

interface SplashSample {
  status: string;
  detail?: string;
  failed?: boolean;
  progress: SplashProgress;
  actions: readonly SplashSampleAction[];
}

interface SplashPairProps {
  state: SplashState;
}

interface LiveSplashProps {
  label: string;
  palette?: string;
  children: ReactNode;
}

export type { LiveSplashProps, SplashPairProps, SplashSample, SplashState };

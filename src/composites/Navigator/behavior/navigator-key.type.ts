/* @layer renderer-components @kind types */
import type { NavigatorProps, NavigatorSteps, NavigatorSurface, NavigatorViewport } from '../Navigator.type';

interface NavigatorKeyInput extends Pick<NavigatorProps, 'onKey' | 'onViewportChange' | 'unclamped'> {
  shown: NavigatorViewport;
  surface: NavigatorSurface;
  steps: NavigatorSteps;
}

export type { NavigatorKeyInput };

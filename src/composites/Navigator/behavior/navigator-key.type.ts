/* @layer renderer-components @kind types */
import type { NavigatorProps, NavigatorSurface, NavigatorViewport } from '../Navigator.type';

interface NavigatorKeyInput extends Pick<NavigatorProps, 'onKey' | 'onViewportChange'> {
  shown: NavigatorViewport;
  surface: NavigatorSurface;
  unit: number;
}

export type { NavigatorKeyInput };

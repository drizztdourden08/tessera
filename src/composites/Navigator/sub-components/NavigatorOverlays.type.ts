/* @layer renderer-components @kind types */
import type { NavigatorOverlay, NavigatorSurface } from '../Navigator.type';

interface NavigatorOverlaysProps {
  overlays: readonly NavigatorOverlay[];
  surface: NavigatorSurface;
  onPress?: (id: string) => void;
}

export type { NavigatorOverlaysProps };

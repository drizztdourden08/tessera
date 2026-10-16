/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type BackdropFit = 'cover' | 'contain' | 'tile';

interface BackdropImage {
  kind: 'image';
  src: string;
  fit?: BackdropFit;
  position?: string;
  tileSize?: string;
  color?: string;
  pixelated?: boolean;
}

interface BackdropColor {
  kind: 'color';
  color: string;
}

interface BackdropNode {
  kind: 'node';
  node: ReactNode;
}

type Backdrop = BackdropImage | BackdropColor | BackdropNode;

interface BackdropLayerProps {
  backdrop: Backdrop;
  className?: string;
}

export type { Backdrop, BackdropColor, BackdropFit, BackdropImage, BackdropLayerProps, BackdropNode };

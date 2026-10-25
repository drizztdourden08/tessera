/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { CONTROLLER_SILHOUETTE_VARIANTS } from './ControllerSilhouette.constants';

type ControllerSilhouetteVariant = (typeof CONTROLLER_SILHOUETTE_VARIANTS)[number];

interface ControllerSilhouetteProps {
  variant: ControllerSilhouetteVariant;
  label?: string;
  className?: string;
  children?: ReactNode;
}

type Point = readonly [x: number, y: number];

type Cubic = readonly [c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number];

interface Outline {
  readonly start: Point;
  readonly curves: readonly Cubic[];
}

export type {
  ControllerSilhouetteProps, ControllerSilhouetteVariant, Cubic, Outline, Point,
};

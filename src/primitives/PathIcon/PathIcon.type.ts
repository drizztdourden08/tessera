/* @layer renderer-components @kind types */
import type { SVGAttributes } from 'react';

interface PathIconCircle {
  cx: number;
  cy: number;
  r: number;
}

interface PathIconProps extends SVGAttributes<SVGSVGElement> {
  paths?: string[];
  circles?: PathIconCircle[];
  size?: number;
  viewBox?: string;
}

export type { PathIconCircle, PathIconProps };

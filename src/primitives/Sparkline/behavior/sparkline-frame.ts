/* @layer renderer-components @kind logic */
import type { SVGProps } from 'react';

const sparklineFrame = (name: string | undefined, width?: number, height?: number): SVGProps<SVGSVGElement> => ({
  style: width !== undefined || height !== undefined ? { width, height } : undefined,
  role: name ? 'img' : undefined,
  'aria-label': name,
  'aria-hidden': name ? undefined : true,
});

export { sparklineFrame };

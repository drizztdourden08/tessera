/* @layer renderer-components @kind logic */
import type { RampSize } from '../RampStrip.type';

const rampClasses = (size: RampSize, wrap: boolean, className: string | undefined): string =>
  ['ramp-strip', `ramp-strip--${size}`, wrap ? 'ramp-strip--wrap' : undefined, className].filter(Boolean).join(' ');

export { rampClasses };

/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { meterClass } from '../behavior/meter-class';
import type { SplashMeterProps } from './SplashMeter.type';

const SplashMeter = (props: SplashMeterProps) => {
  const { progress, bar, failed, label } = props;
  const determinate = progress !== 'indeterminate';
  const value = determinate ? Math.min(Math.max(progress, 0), 1) : 0;
  return (
    <Box
      className={meterClass(bar, determinate, failed)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={determinate ? Math.round(value * 100) : undefined}
      style={determinate ? ({ '--value': value } as CSSProperties) : undefined}
    />
  );
};

export { SplashMeter };

/* @layer renderer-components @kind logic */
import type { HTMLAttributes } from 'react';
import type { GaugeAriaInput } from './gauge-aria.type';

const gaugeAria = (input: GaugeAriaInput): HTMLAttributes<HTMLDivElement> => {
  const { name, min, max, fraction, reading, unit } = input;
  return {
    role: 'meter',
    'aria-label': name,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': min + fraction * (max - min),
    'aria-valuetext': unit ? `${reading} ${unit}` : reading,
  };
};

export { gaugeAria };

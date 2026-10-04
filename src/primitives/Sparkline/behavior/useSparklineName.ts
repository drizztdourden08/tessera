/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { formatSample } from './format-sample';
import { sparklineLabel } from './sparkline-label';

const useSparklineName = (label: string | undefined, values: readonly number[], format = formatSample): string | undefined => {
  const { charts } = useTesseraStrings();
  return useMemo(() => (label ? sparklineLabel(label, values, format, charts) : undefined), [label, values, format, charts]);
};

export { useSparklineName };

/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { DensityContext } from './density-context';
import type { Density } from './field-control.type';

const useDensity = (): Density => useContext(DensityContext);

export { useDensity };

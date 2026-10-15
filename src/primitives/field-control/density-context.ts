/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { Density } from './field-control.type';

const DensityContext = createContext<Density>('comfortable');

export { DensityContext };

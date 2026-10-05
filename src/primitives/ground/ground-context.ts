/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { Ground } from './ground.type';

const GroundContext = createContext<Ground>('light');

export { GroundContext };

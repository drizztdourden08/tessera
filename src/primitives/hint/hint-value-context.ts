/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { Hint } from './hint.type';

const HintValueContext = createContext<Hint | null>(null);

export { HintValueContext };

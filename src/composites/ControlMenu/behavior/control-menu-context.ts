/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { ControlMenuContextValue } from '../ControlMenu.type';

const ControlMenuContext = createContext<ControlMenuContextValue>({ query: '', look: '' });

export { ControlMenuContext };

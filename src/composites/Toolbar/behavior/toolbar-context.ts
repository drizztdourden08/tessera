/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { ToolbarContextValue } from './toolbar-context.type';

const ToolbarContext = createContext<ToolbarContextValue>({ orientation: 'horizontal', menuSide: 'right', layout: 'bar', size: 'sm', labels: true, stop: undefined, measure: false });

export { ToolbarContext };

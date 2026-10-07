/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { ListItemShape } from '../ListItemRow.type';

const ListItemContext = createContext<ListItemShape | null>(null);

export { ListItemContext };

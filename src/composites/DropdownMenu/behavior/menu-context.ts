/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { MenuContextValue } from './menu-context.type';

const MenuContext = createContext<MenuContextValue>({ close: () => undefined, closeOnSelect: true, look: '' });

export { MenuContext };

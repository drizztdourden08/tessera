/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { MenuColumns } from './menu-columns.type';

const MenuColumnsContext = createContext<MenuColumns>({ icons: false, marks: false });

export { MenuColumnsContext };

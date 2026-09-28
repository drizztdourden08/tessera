/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import { MEMORY_VIEW_STORAGE } from './view-storage.constants';
import type { ViewStorage } from './view-storage.type';

const ViewStorageContext = createContext<ViewStorage>(MEMORY_VIEW_STORAGE);

export { ViewStorageContext };

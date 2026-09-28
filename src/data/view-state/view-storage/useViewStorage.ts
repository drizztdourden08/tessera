/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { ViewStorageContext } from './ViewStorageContext';
import type { ViewStorage } from './view-storage.type';

const useViewStorage = (): ViewStorage => useContext(ViewStorageContext);

export { useViewStorage };

/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { ViewStorageContext } from './view-storage-context';
import type { ViewStorage } from './view-storage.type';

const useViewStorage = (): ViewStorage => useContext(ViewStorageContext);

export { useViewStorage };

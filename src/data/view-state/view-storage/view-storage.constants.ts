/* @layer renderer-components @kind data */
import type { ViewKey, ViewSnapshot } from '../snapshot';
import type { ViewStorage } from './view-storage.type';

const memory = new Map<ViewKey, ViewSnapshot>();

const MEMORY_VIEW_STORAGE: ViewStorage = {
  load: (key) => Promise.resolve(memory.get(key)),
  save: (key, snapshot) => { memory.set(key, snapshot); },
};

export { MEMORY_VIEW_STORAGE };

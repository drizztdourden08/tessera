/* @layer renderer-components @kind types */
import type { ViewKey, ViewSnapshot } from '../snapshot';

interface ViewStorage {
  load: (key: ViewKey) => Promise<ViewSnapshot | undefined>;
  save: (key: ViewKey, snapshot: ViewSnapshot) => void;
}

export type { ViewStorage };

/* @layer renderer-components @kind logic */
import { SNAPSHOT_VERSION } from './snapshot.constants';
import type { ViewSnapshot } from './snapshot.type';

const emptySnapshot = (): ViewSnapshot => ({
  v: SNAPSHOT_VERSION,
  columns: [],
  sort: [],
  groupBy: [],
  filters: [],
});

export { emptySnapshot };

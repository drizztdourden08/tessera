/* @layer renderer-components @kind logic */
import type { EdgeNames, EdgePane } from './pane-edge.type';

const edgeLabelOf = (start: EdgePane | undefined, end: EdgePane | undefined, names: EdgeNames): string => {
  if (start && end) return names.both(start.label, end.label);
  return names.one((start ?? end)?.label ?? '');
};

export { edgeLabelOf };

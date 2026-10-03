/* @layer renderer-components @kind logic */
import { DEFAULT_MAX_RATIO, DEFAULT_MIN_RATIO, DEFAULT_RATIO, DEFAULT_SNAP } from '../SplitPane.constants';
import type { SplitPaneProps } from '../SplitPane.type';
import type { SplitPaneOptions } from './useSplitPane.type';

const splitOptionsOf = (props: SplitPaneProps): SplitPaneOptions => ({
  orientation: props.orientation ?? 'horizontal',
  defaultRatio: props.defaultRatio ?? DEFAULT_RATIO,
  defaultCollapsed: props.defaultCollapsed ?? 'none',
  minRatio: props.minRatio ?? DEFAULT_MIN_RATIO,
  maxRatio: props.maxRatio ?? DEFAULT_MAX_RATIO,
  snapAt: props.snapAt ?? DEFAULT_SNAP,
});

export { splitOptionsOf };

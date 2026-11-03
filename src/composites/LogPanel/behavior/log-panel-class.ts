/* @layer renderer-components @kind logic */
import type { LogPanelProps } from '../LogPanel.type';
import { isSideFilter } from './is-side-filter';

const logPanelClass = (props: LogPanelProps): string => [
  'log-panel',
  props.height === 'fill' && 'log-panel--fill',
  typeof props.height === 'number' && 'log-panel--fixed',
  props.size === 'sm' && 'log-panel--sm',
  isSideFilter(props.filterPlacement) && 'log-panel--side',
  props.className,
].filter(Boolean).join(' ');

export { logPanelClass };
